"use client";
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react'
import Loader from '../../Loader/Loader';
import toast from 'react-hot-toast';
import { styles } from '@/app/styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {}

const EditCategories:FC<Props> = () => {
    const {data, isLoading, refetch} = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true
    })
    const [editLayout, {isSuccess, error}] = useEditLayoutMutation();
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        setCategories(data?.layout?.categories);
        if(isSuccess) {
            refetch();
            toast.success("Categories updated successfully!");
        } 
        if(error) {
            if("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [isSuccess, error, data])

    const handleCategoriesAdd = (id: string, value: string) => {
        setCategories((prev: any) => prev.map((i:any) => (i._id === id ? {...i, title: value} : i)));
    }

    const newCategoriesHandler = () => {
        if(categories[categories.length - 1].title === "") {
            toast.error("Category title can't be empty!");
        } else {
            setCategories((prev: any) => [...prev, {title: ""}]);
        }
    }

    const areCategoriesUnchanged = (originalCategories: any[], newCategories: any[]) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    }

    const isAnyCategoryTitleEmpty = (categories: any[]) => {
        return categories?.some((c: any) => c.title === "");
    }

    const editCategoriesHandler = async () => {
        if (
            !areCategoriesUnchanged(data?.layout.categories, categories) &&
            !isAnyCategoryTitleEmpty(categories)
        ) {
            await editLayout({type: "Categories", categories})
        }
    }

  return (
    <>
    {isLoading ? (
        <Loader />
    ) : (
        <div className='mt-[120px] text-center'>
            <h1 className={styles.title}>All Categories</h1>
            {categories && categories.map((item: any, index: number) => (
                <div className="p-3">
                    <div className="flex items-center w-full justify-center">
                        <input 
                            className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                            value={item.title}
                            onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                            placeholder='Enter category title...'
                        />

                        <AiOutlineDelete 
                            className="text-[18px] cursor-pointer"
                            onClick={() => {
                                setCategories((prev: any) => prev.filter((i:any) => i._id !== item._id));
                            }}
                        />
                    </div>
                </div>
            ))}
            <br />
            <br />
            <div className="w-full flex justify-center">
                <IoMdAddCircleOutline className="text-[25px] cursor-pointer" onClick={newCategoriesHandler} />
            </div>
            <div
                className={`${styles.button} !w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34]
                            ${
                                areCategoriesUnchanged(data.layout.categories, categories) ||
                                isAnyCategoryTitleEmpty(categories)
                                ? "!cursor-not-allowed"
                                : "cursor-pointer bg-[#42d383]"
                            }
                            rounded absolute bottom-6 right-12`
                }
                onClick={
                    areCategoriesUnchanged(data.layout.categories, categories) ||
                    isAnyCategoryTitleEmpty(categories)
                    ? () => null
                    : editCategoriesHandler
                }
            >
                Save
            </div>
        </div>
    )}
    </>
  )
}

export default EditCategories