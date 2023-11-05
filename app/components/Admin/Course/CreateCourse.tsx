"use client";
import React, { useState, useEffect } from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

type Props = {}

function CreateCourse({}: Props) {
    const [createCourse, {isLoading, isSuccess, error} ] = useCreateCourseMutation();
    
    useEffect(() => {
        if(isSuccess) {
            toast.success("Course created successfully");
            redirect("/admin/courses");
        }
        if(error){
            if("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isLoading, isSuccess, error]);

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{title: ""}]);
    const [prerequisites, setPrerequisites] = useState([{title: ""}]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);
    const [courseData, setCourseData] = useState({});

    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({title: benefit.title}));

        const formattedPrerequisites = prerequisites.map((prerequisite) => ({title: prerequisite.title}));

        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoLength: courseContent.videoLength,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map(link => ({
                title: link.title,
                url: link.url
            })),
            suggestion: courseContent.suggestion,
        }));

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            category: courseInfo.category,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    }
    // console.log(courseData)

    const handleCourseCreate = async (e: any) => {
        if(!isLoading) {
            await createCourse(courseData);
        }
    }

  return (
    <div className='dark:text-white w-full flex max-h-screen'>
        <div className="w-[80%]">
            {active === 0 && (
                <CourseInformation 
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                />
            )}

            {active === 1 && (
                <CourseData 
                    benefits={benefits}
                    setBenefits={setBenefits}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                    active={active}
                    setActive={setActive}
                />
            )}

            {active === 2 && (
                <CourseContent 
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    active={active}
                    setActive={setActive}
                    handleSubmit={handleSubmit}
                />
            )}

            {active === 3 && (
                <CoursePreview 
                    handleCourseCreate={handleCourseCreate}
                    courseData={courseData}
                    active={active}
                    setActive={setActive}
                    isEdit={false}
                />
            )}
        </div>

        <div className="w-[20%]">
            <CourseOptions active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default CreateCourse