import React, {FC, useState, useEffect} from 'react'
import { styles } from '../styles/style'
import Image from 'next/image'
import { AiOutlineCamera } from 'react-icons/ai'
import avatarIcon from '../../public/images/avatar.png'
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import toast from 'react-hot-toast'

type Props = {
    avatar: string | null;
    user: any
}

const ProfileInfo:FC<Props> = ({avatar, user}) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar, {isSuccess, error}] = useUpdateAvatarMutation();
    const [ editProfile, {isSuccess: success, error: updateError}] = useEditProfileMutation();
    const [loaduser, setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined, {skip: loaduser ? false : true});

    useEffect(() => {
        if(isSuccess || success) setLoadUser(true);
        if(error || updateError) console.log(error);

        if (success) toast.success("Name updated successfully!")
    }, [isSuccess, error, success, updateError])

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                updateAvatar(avatar);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (name !== "") {
            await editProfile({name})
        }
    }
  return (
    <>
    <div className='w-full flex justify-center '>
        <div className="relative">
            <Image 
                src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
                alt='profile image'
                width={100}
                height={100}
                className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full bg-cover'
            />
            <input 
                type='file'
                name=''
                id='avatar'
                className='hidden'
                onChange={imageHandler}
                accept='image/png,image/jpg,image/jpeg,image/webp'
            />
            <label htmlFor='avatar'>
                <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                    <AiOutlineCamera size={20} className="z-1 text-white" />
                </div>
            </label>
        </div>
    </div>
    <br />
    <br />
    <div className='w-full pl-6 800px:pl-10'>
        <form onSubmit={handleSubmit}>
            <div className="800px:w-1/2 m-auto pb-4 block">
                <div className="w-full">
                    <label className="block pb-2 dark:text-white">Full Name</label>
                    <input
                        type='text'
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="w-full mt-2">
                    <label className="block pb-2 dark:text-white">Email Address</label>
                    <input
                        type='text'
                        className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                        readOnly
                        value={user?.email}
                    />
                </div>
                <input
                    className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Update"
                    type='submit'
                />
            </div>
        </form>
        <br />
    </div>
    </>
  )
}

export default ProfileInfo