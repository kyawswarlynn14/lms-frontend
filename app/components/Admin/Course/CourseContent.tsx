import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import {BsLink45Deg, BsPencil} from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    active: number;
    setActive: (active: number) => void;
    handleSubmit: any;
}

const CourseContent:FC<Props> = ({courseContentData, setCourseContentData, active, setActive, handleSubmit: handleCourseSubmit}) => {
    
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );
    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    const handleCollapseToggle = (index: number) => {
        const updatedCollasped = [...isCollapsed];
        updatedCollasped[index] = !updatedCollasped[index];
        setIsCollapsed(updatedCollasped);
    }

    const handleRemoveLink = (index:number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({title:"", url:""});
        setCourseContentData(updatedData);
    }

    const newContentHandler = (item: any) => {
        if(item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            toast.error("Please fill all the fields first!");
        } else {
            let newVideoSection = "";
            if(courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
                if(lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent =  {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                videoLength: "",
                links: [{title: "", url: ""}],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const addNewSection = () => {
        if(
            courseContentData[courseContentData.length - 1]?.title === "" ||
            courseContentData[courseContentData.length - 1]?.description === "" ||
            courseContentData[courseContentData.length - 1]?.videoUrl === "" ||
            courseContentData[courseContentData.length - 1]?.videoLength === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].title === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{title: "", url: ""}],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const prevButton = () => setActive(active -1);

    const handleOptions = () => {
        if(
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].videoLength === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("section can't be empty!");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    }

  return (
    <div className='w-[80%] m-auto mt-24 p-3 dark:text-white'>
        <form onSubmit={handleSubmit}>
            {courseContentData?.map((item:any, index:number) => {
                const showSectionInput = index === 0 || item.videoSection !== courseContentData[index -1].videoSection;
                return(
                    <>
                    <div className={`w-full bg-[#cdc8c817] ${showSectionInput ? "mt-10" : "mt-0"} p-3`}>
                        {showSectionInput && (
                            <div className='flex items-center w-full'>
                                <input 
                                    type='text'
                                    className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer bg-transparent outline-none`}
                                    value={item.videoSection}
                                    name='videoSection'
                                    onChange={e => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].videoSection = e.target.value;
                                        setCourseContentData(updatedData)
                                    }}
                                />
                                <BsPencil className="cursor-pointer" />
                            </div>
                        )}
                        <div className={`w-full flex items-center justify-between my-0`}>
                        {isCollapsed[index] ? (
                            <>
                            {item.title ? (
                                <p className='font-Poppins'>
                                    {index + 1}. {item.title}
                                </p>
                            ) : (
                                <></>
                            )}
                            </>
                        ) : (
                            <div></div>
                        )}

                        <div className='flex items-center'>
                            <AiOutlineDelete 
                             className={`text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                             onClick={() => {
                                if (index > 0) {
                                    const updatedData = [...courseContentData];
                                    updatedData.splice(index, 1);
                                    setCourseContentData(updatedData);
                                }
                             }}
                            />
                            <MdOutlineKeyboardArrowDown
                                className={`${isCollapsed[index] ? "rotate-180" : "rotate-0"} text-lg transform`}
                                onClick={() => handleCollapseToggle(index)}
                            />
                        </div>
                        </div>
                        {!isCollapsed[index] && (
                            <>
                            <div className='my-3'>
                                <label className={styles.label}>Video title</label>
                                <input 
                                    type='text'
                                    placeholder='Project Plan...'
                                    className={styles.input}
                                    value={item.title}
                                    name='title'
                                    onChange={e => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].title = e.target.value;
                                        setCourseContentData(updatedData)
                                    }}
                                />
                            </div>

                            <div className='mb-3'>
                                <label className={styles.label}>Video Url</label>
                                <input 
                                    type='text'
                                    placeholder='sdsdfsa'
                                    className={styles.input}
                                    value={item.videoUrl}
                                    name='videoUrl'
                                    onChange={e => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].videoUrl = e.target.value;
                                        setCourseContentData(updatedData)
                                    }}
                                />
                            </div>

                            <div className='mb-3'>
                                <label className={styles.label}>Video Length (in minutes)</label>
                                <input 
                                    type='number'
                                    placeholder='120'
                                    className={styles.input}
                                    value={item.videoLength}
                                    name='videoLength'
                                    onChange={e => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].videoLength = e.target.value;
                                        setCourseContentData(updatedData)
                                    }}
                                />
                            </div>

                            <div className='mb-3'>
                                <label className={styles.label}>Video Description</label>
                                <textarea
                                    rows={8} 
                                    cols={30}
                                    placeholder='Video Description'
                                    className={`${styles.input} !h-min py-2`}
                                    value={item.description}
                                    name='description'
                                    onChange={e => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].description = e.target.value;
                                        setCourseContentData(updatedData)
                                    }}
                                />
                                <br />
                                <br />
                            </div>

                            {item?.links.map((link:any, linkIndex: number) => (
                                <div className="mb-3 block">
                                    <div className="w-full flex items-center justify-between gap-2">
                                        <label className={styles.label}>
                                            Link {linkIndex + 1}
                                        </label>
                                        <AiOutlineDelete 
                                            className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-[20px]`}
                                            onClick={() => linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)}
                                        />
                                    </div>

                                    <input 
                                        type='text'
                                        placeholder='Source Code... (Link title)'
                                        className={styles.input}
                                        value={link.title}
                                        onChange={(e) => {
                                            const updatedData = [...courseContentData];
                                        updatedData[index].links[linkIndex].title = e.target.value;
                                        setCourseContentData(updatedData)
                                        }}
                                    />

                                    <input 
                                        type='text'
                                        placeholder='Source Code Url... (Link Url)'
                                        className={styles.input}
                                        value={link.url}
                                        onChange={(e) => {
                                            const updatedData = [...courseContentData];
                                        updatedData[index].links[linkIndex].url = e.target.value;
                                        setCourseContentData(updatedData)
                                        }}
                                    />
                                </div>
                            ))}
                            <br />
                            <div className='inline-block mb-4'>
                                <p className='flex items-center text-[16px] cursor-pointer' onClick={() => handleAddLink(index)}>
                                    <BsLink45Deg className="mr-2" /> Add Link
                                </p>
                            </div>
                            </>
                        )}
                        <br />
                        {index === courseContentData.length - 1 && (
                            <div>
                                <p className='flex gap-2 items-center text-[16px] cursor-pointer' onClick={(e:any) => newContentHandler(item)}>
                                    <AiOutlinePlusCircle /> Add New Content
                                </p>
                            </div>
                        )}
                    </div>
                    </>
                )
            })}
            <br />
            <div className='flex items-center gap-2 text-[20px] cursor-pointer' onClick={() => addNewSection()}>
                <AiOutlinePlusCircle /> Add New Section
            </div>
        </form>
        <br />
        <div className='w-full flex items-center justify-between'>
            <button className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' onClick={() => prevButton()}>
                Prev
            </button>

            <button className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' onClick={() => handleOptions()}>
                Next
            </button>
        </div>
    </div>
  )
}

export default CourseContent