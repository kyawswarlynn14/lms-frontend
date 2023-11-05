"use client";
import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AllInvoices from '@/app/components/Admin/Order/AllInvoices';
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

            <div className='w-[85%] px-6'>
                <DashboardHero />
                <AllInvoices isDashboard={false} />
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default page