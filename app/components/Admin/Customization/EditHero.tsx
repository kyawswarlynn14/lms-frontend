import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const EditHero = (props: Props) => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const {data, refetch} = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true
    });
    const [editLayout, {isLoading, isSuccess, error}] = useEditLayoutMutation();

    useEffect(() => {
        if(data) {
            setTitle(data?.layout?.banner?.title);
            setSubTitle(data?.layout?.banner?.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
        if(isSuccess) {
            refetch();
            toast.success("Hero updated successfully!");
        } 
        if(error) {
            if("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [data, isSuccess, error]);

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if(reader.readyState === 2) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle
        })
    }

  return (
    <div>EditHero</div>
  )
}

export default EditHero