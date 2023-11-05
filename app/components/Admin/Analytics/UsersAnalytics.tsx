import React, { FC } from 'react'
import {
    Tooltip,
    Area,
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts"
import Loader from '../../Loader/Loader'
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import { styles } from '@/app/styles/style'

type Props = {
    isDashboard: boolean;
}

const CoursesAnalytics:FC<Props> = ({isDashboard}) => {
    const {data, isLoading, isError} = useGetUsersAnalyticsQuery({});

    // const analyticsData = [
    //     {name: 'Jan 2023', count: 440},
    //     {name: 'Feb 2023', count: 8200},
    //     {name: 'March 2023', count: 342},
    //     {name: 'April 2023', count: 543},
    //     {name: 'May 2023', count: 2145},
    //     {name: 'Jun 2023', count: 740},
    //     {name: 'July 2023', count: 1200},
    //     {name: 'August 2023', count: 942},
    //     {name: 'Sept 2023', count: 743},
    //     {name: 'October 2023', count: 3145},
    //     {name: 'Nov 2023', count: 8543},
    //     {name: 'Dec 2023', count: 137},
    // ];
    
    // const analyticsData: any = [];
    // data && data.courses.last12Months.forEach((item: any) => {
    //     analyticsData.push({name: item.month.split(", ")[0], uv:item.count})
    // })

    const analyticsData: any = [];
    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({name: item.month.split(", ")[0], count:item.count})
    })

  return (
    <>
    {isLoading ? (
        <Loader />
    ) : (
        <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
            <div className={`${isDashboard ? "ml-8 mb-5" : ''}`}>
                <h1 className={`${styles.title} ${isDashboard && "text-[20px]"} px-5 text-start`}>
                    Users Analytics
                </h1>
                {!isDashboard && (
                    <p className={`${styles.label} px-5`}>
                        Last 12 months analytics data{" "}
                    </p>
                )}
            </div>

            <div className={`w-full ${isDashboard ? 'h-[25vh]' : "h-screen"} flex items-center justify-center`}>
                <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? '50%' : '100%'}>
                    <AreaChart data={analyticsData} margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="#4d62d9" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )}
    </>
  )
}

export default CoursesAnalytics