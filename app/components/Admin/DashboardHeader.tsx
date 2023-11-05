"use client";
import React, {FC, useState} from 'react'
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DashboardHeader:FC<Props> = ({open, setOpen}) => {

  return (
    <div className='dark:text-white w-full flex items-center justify-end p-6 fixed top-5 right-0'>
        <ThemeSwitcher />
        <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>
            <IoMdNotificationsOutline className="text-2xl cursor-pointer " />
            <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] text-center  text-white'>
                3
            </span>
        </div>

        {open &&  (
            <div className='w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-50 rounded'>
                <h5 className="text-center text-[20px] font-Poppins p-3">
                    Notifications
                </h5>

                <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                    <div className="w-full flex items-center justify-between p-2">
                        <p>
                            New Question Received
                        </p>
                        <p className="cursor-pointer">
                            Mark as read
                        </p>
                    </div>
                    <p className='px-2'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum hic aliquid consectetur.
                    </p>
                    <p className="cursor-pointer p-2">
                        5 days ago
                    </p>
                </div>

                <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                    <div className="w-full flex items-center justify-between p-2">
                        <p>
                            New Question Received
                        </p>
                        <p className="cursor-pointer">
                            Mark as read
                        </p>
                    </div>
                    <p className='px-2'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum hic aliquid consectetur.
                    </p>
                    <p className="cursor-pointer p-2">
                        5 days ago
                    </p>
                </div>
            </div>
        )}
    </div>
  )
}

export default DashboardHeader