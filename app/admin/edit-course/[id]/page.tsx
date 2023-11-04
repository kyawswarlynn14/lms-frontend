import AdminSidebar from '@/app/components/Admin/AdminSidebar'
import EditCourse from '@/app/components/Admin/Course/EditCourse'
import Heading from '@/app/utils/Heading'
import React, {FC} from 'react'

type Props = {}

const page:FC<Props> = ({params}: any) => {
    const id = params.id;
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
                <EditCourse id={id} />
            </div>
        </div>
    </div>
  )
}

export default page