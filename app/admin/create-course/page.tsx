import AdminSidebar from '@/app/components/Admin/AdminSidebar'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading 
            title="Elearning - Add Course"
            description="Elearning is a platform for students to learn and get help from teachers" 
            keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>

            <div className='w-[85%]'>
                <CreateCourse />
            </div>
        </div>
    </div>
  )
}

export default page