import { styles } from '@/app/styles/style';
import { AddCircle } from '@mui/icons-material';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

type Props = {
    benefits: {title: string} [];
    setBenefits: (benefits: {title: string}[]) => void;
    prerequisites: {title: string} [];
    setPrerequisites: (prerequisites: {title: string} []) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData:FC<Props> = ({benefits, setBenefits, prerequisites, setPrerequisites, active, setActive}) => {
    const handleBenefitChange = (index:number, value:any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }
    const handleAddBenefit = () => {
        setBenefits([...benefits, {title: ""}]);
    }

    const handlePrerequisiteChange = (index:number, value:any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    }
    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, {title: ""}]);
    }

    const prevButton = () => setActive(active -1);

    const handleOptions = () => {
        if(benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields to go to next!");
        }
    }
  return (
    <div className='w-[80%] m-auto mt-24 block dark:text-white'>
        <div>
            <label className={styles.label}>
                What are the benefits for students in this course?
            </label>
            <br />
            {benefits?.map((benefit: any, index:number) => (
                <input 
                    type='text'
                    key={index}
                    name='benefit'
                    placeholder='You will be able to build a full stack LMS platform'
                    required
                    className={`${styles.input} my-2`}
                    value={benefit.title}
                    onChange={e => handleBenefitChange(index, e.target.value)}
                />
            ))}
            <AddCircle style={{margin: "10px 0", cursor: "pointer", width: "30px"}} onClick={handleAddBenefit} /> 
        </div>
        <br />
        <div>
            <label className={styles.label}>
                What are the prerequisites for students in this course?
            </label>
            <br />
            {prerequisites.map((prerequisite: any, index:number) => (
                <input 
                    type='text'
                    key={index}
                    name='prerequisite'
                    placeholder='You need Basic knownledge of MERN stack'
                    required
                    className={`${styles.input} my-2`}
                    value={prerequisite.title}
                    onChange={e => handlePrerequisiteChange(index, e.target.value)}
                />
            ))}
            <AddCircle style={{margin: "10px 0", cursor: "pointer", width: "30px"}} onClick={handleAddPrerequisite} /> 
        </div>
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

export default CourseData