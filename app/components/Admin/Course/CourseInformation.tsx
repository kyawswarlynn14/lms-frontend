import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation:FC<Props> = ({courseInfo, setCourseInfo, active, setActive}) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const {data} = useGetHeroDataQuery("Categories");
  useEffect(() => {
    if(data) {
      setCategories(data.layout.categories);
    }
  }, [data])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if(file) {
      const reader = new FileReader();

      reader.onload = (e:any) => {
        if(reader.readyState === 2) {
          setCourseInfo({...courseInfo, thumbnail: reader.result})
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = (e:any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = (e:any) => {
        setCourseInfo({...courseInfo, thumbnail: reader.result})
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='w-[80%] m-auto mt-24 pb-8'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`}>Course Name</label>
          <input 
            type="name" 
            name='' 
            required
            value={courseInfo.name}
            onChange={(e:any) => setCourseInfo({...courseInfo, name: e.target.value})}
            id='name'
            placeholder='MERN stack LMS platform with next 13'
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label className={`${styles.label}`}>Course Description</label>
          <textarea name="" 
            id="description" 
            placeholder="Write something amazing"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e:any) => setCourseInfo({...courseInfo, description: e.target.value})}
            cols={30} rows={8}>

          </textarea>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`}>Course Price</label>
            <input 
              type="number" 
              name='' 
              required
              value={courseInfo.price}
              onChange={(e:any) => setCourseInfo({...courseInfo, price: e.target.value})}
              id='price'
              placeholder='29'
              className={`${styles.input}`}
            />
          </div>

          <div className='w-[50%]'>
            <label className={`${styles.label}`}>Estimate Price (optional)</label>
            <input 
              type="number" 
              name='' 
              required
              value={courseInfo.estimatedPrice}
              onChange={(e:any) => setCourseInfo({...courseInfo, estimatedPrice: e.target.value})}
              id='estimatedPrice'
              placeholder='79'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`}>Course Tags</label>
            <input 
              type="text" 
              name='' 
              required
              value={courseInfo.tags}
              onChange={(e:any) => setCourseInfo({...courseInfo, tags: e.target.value})}
              id='tags'
              placeholder='MERN, Next 13, Socket io, tailwind css'
              className={`${styles.input}`}
            />
          </div>

          <div className='w-[50%]'>
            <label className={`${styles.label}`}>Course Category</label>
            
            <select
              name=''
              id=''
              className={`${styles.input}`}
              value={courseInfo.category}
              onChange={(e:any) => setCourseInfo({...courseInfo, category: e.target.value})}
            >
              <option className='dark:bg-slate-700' value="">Select Category</option>
              {categories.map((item:any) => (
                <option className='dark:bg-slate-700' value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`}>Course Level</label>
            <input 
              type="text" 
              name='' 
              required
              value={courseInfo.level}
              onChange={(e:any) => setCourseInfo({...courseInfo, level: e.target.value})}
              id='level'
              placeholder='Beginner/Intermediate/Expert'
              className={`${styles.input}`}
            />
          </div>

          <div className='w-[50%]'>
            <label className={`${styles.label}`}>Demo Url</label>
            <input 
              type="text" 
              name='' 
              required
              value={courseInfo.demoUrl}
              onChange={(e:any) => setCourseInfo({...courseInfo, demoUrl: e.target.value})}
              id='demoUrl'
              placeholder='eer54dg'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input type='file' accept='image/*' id='file' className='hidden' onChange={handleFileChange} />
          <label 
          className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          htmlFor="file">
            {courseInfo.thumbnail ? (
              courseInfo.thumbnail.url !== undefined ? (
                <Image src={courseInfo?.thumbnail?.url.startsWith("https") ? courseInfo.thumbnail.url : courseInfo.thumbnail } alt='course image' className='max-h-full w-full object-cover' width={500} height={500} />
              ) : (
                <Image src={courseInfo?.thumbnail} alt='course image' className='max-h-full w-full object-cover' width={500} height={500} />
              )
            ) : (
              <span className='text-black dark:text-white'>
                Drag and drop your thumbnail here or click to browser
              </span>
            )}
          </label>
        </div>
        <br />
        <div className='w-full flex items-center justify-end mb-4'>
              <input 
                type='submit'
                value="Next"
                className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer'
              />
        </div>
      </form>
    </div>
  )
}

export default CourseInformation