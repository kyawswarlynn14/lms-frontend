"use client";
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import CoursesAnalytics from '@/app/components/Admin/Analytics/CoursesAnalytics';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React, { FC } from 'react'

type Props = {}

const page:FC<Props> = () => {
  return (
    <div>
        <AdminProtected>
        <Heading 
            title="Elearning - Admin"
            description="Elearning is a platform for students to learn and get help from teachers" 
            keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>

            <div className='w-[85%]'>
                <CoursesAnalytics />
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default page