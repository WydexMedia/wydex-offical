
import React from 'react'
import HomeVideo from './HomeComponents/HomeVideo'
import Discription from './HomeComponents/Discription'
import VideoAnimation from './HomeComponents/VideoAnimation'
import OurStory from './HomeComponents/OurStory' 
import Services from './HomeComponents/Services'
import BottomBar from './HomeComponents/BottomBar'
import Clinds from './HomeComponents/Clints'
import ClintSay from './HomeComponents/ClintSay'
import EndSection from './HomeComponents/EndSection'

function Home() {   
  return (
    <div className="min-h-screen  bg-black text-white">
      <HomeVideo />
      <div className=" w-full relative z-10 bg-white">
        <Discription/>
        <VideoAnimation/>
        <OurStory/>
        <Services />
        <BottomBar/>
        <Clinds/>
        <ClintSay/>
        <EndSection/>

      </div>
    </div>
  );

}

export default Home; 