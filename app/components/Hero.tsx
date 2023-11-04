import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='w-full 1000px:flex min-h-[500px] items-center justify-center mt-12'>
        {/* <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation'></div> */}
        <div className='dark:text-white font-bold text-xl'>Hero Page</div>
    </div>
  )
}

export default Hero