import React, {FC, useEffect, useState} from 'react'
import axios from 'axios';

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer:FC<Props> = ({videoUrl, title}) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
        axios.post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
            videoId: videoUrl,
        }).then(res => {
            setVideoData(res.data);
        })
    }, [videoUrl]);
    console.log(videoData)

  return (
    <div className='pt-[41%] relative'>
        {videoData.otp && videoData.playbackInfo !== "" && (
            <iframe
                src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=0mjvfcBqEDBu82Xm`}
                className='border-none w-[90%] h-full absolute top-0 left-0'
                allowFullScreen={true}
                allow='encrypted-media'
            ></iframe>
            
        )}
    </div>
  )
}

export default CoursePlayer