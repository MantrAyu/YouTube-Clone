import React from 'react';
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { PiFilmSlateLight } from "react-icons/pi";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import { FaFireAlt } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { PiMusicNote } from "react-icons/pi";
import { GiHanger } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinedFlag } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";

function Sidebax() {
  const sidebarItem=[
     {
        id:1,
        name:"Home",
        icon:<GoHome/>
     },
     {
        id:2,
        name:"Shorts",
        icon:<SiYoutubeshorts/>
     },
     {
        id:3,
        name:"Subscriptions",
        icon:<MdOutlineSubscriptions/>
     }
  ];
  const sidebarItem2=[
    {
       id:1,
       name:"Your Channel",
       icon:<PiUserSquareThin/>
    },
    {
       id:2,
       name:"History",
       icon:<MdHistory/>
    },
    {
       id:3,
       name:"Playlists",
       icon:<MdOutlineSubscriptions/>
    },
    {
        id:4,
        name:"Your Videos",
        icon:<BiVideo/>
    },
    {
        id:5,
        name:"Watch later",
        icon:<MdOutlineWatchLater/>
    },
    {
        id:6,
        name:"Liked videos",
        icon:<AiOutlineLike/>
    }
 ]; 
 const sidebarItem3=[
    {
       id:1,
       name:"Trending",
       icon:<FaFireAlt/>
    },
    {
       id:2,
       name:"Shopping",
       icon:<RiShoppingBag4Line/>
    },
    {
       id:3,
       name:"Music",
       icon:<PiMusicNote/>
    },
    {
        id:4,
        name:"Films",
        icon:<PiFilmSlateLight/>
    },
    {
        id:5,
        name:"Live",
        icon:<CiStreamOn/>
    },
    {
        id:6,
        name:"Gaming",
        icon:<SiYoutubegaming/>
    },
    {
        id:7,
        name:"News",
        icon:<FaRegNewspaper/>
    },
    {
        id:8,
        name:"Sport",
        icon:<TfiCup/>
    },
    {
        id:9,
        name:"Courses",
        icon:<PiLightbulbLight/>
    },
    {
        id:10,
        name:"Fashion & Beauty",
        icon:<GiHanger/>
    },
    {
        id:11,
        name:"Podcasts",
        icon:<MdPodcasts/>
    },
 ];
 const sidebarItem4=[
    {
       id:1,
       name:"Youtube Premium",
       icon:<FaYoutube/>
    },
    {
       id:2,
       name:"YouTube Studio",
       icon:<SiYoutubestudio/>
    },
    {
       id:3,
       name:"Youtube Music",
       icon:<SiYoutubemusic/>
    },
    {
        id:4,
        name:"Youtube Kids",
        icon:<SiYoutubekids/>
     }
 ];
 const sidebarItem5=[
    {
       id:1,
       name:"Settings",
       icon:<IoSettingsOutline/>
    },
    {
       id:2,
       name:"Report history",
       icon:<MdOutlinedFlag/>
    },
    {
       id:3,
       name:"Help",
       icon:<IoMdHelpCircleOutline />
    },
    {
        id:4,
        name:"Send feedback",
        icon:<RiFeedbackLine/>
     }
 ];
  return (
    <div className='px-6 w-[27%] h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden'>
        {/* Home w-[17%] */}
        <div className='space-y-3 items-center'>
            {
                sidebarItem.map((item)=>{
                    return(
                        <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 rounded-xl ps-1'>
                        <div className='text-xl cursor-pointer'>{item.icon}</div>
                        <span className='cursor-pointer'>{item.name}</span>
                        </div>
                    );
                }) }
        </div>
        <br />
        <hr />
        {/* You */}
        <div className='mt-4 space-y-3 items-center'>
            <div className="flex items-center space-x-2">
                <h1>You</h1>
                <FaChevronRight/>
            </div>
            {
                sidebarItem2.map((item)=>{
                    return(
                        <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 rounded-xl ps-1'>
                        <div className='text-xl cursor-pointer'>{item.icon}</div>
                        <span className='cursor-pointer'>{item.name}</span>
                        </div>
                    );
                }) }
        </div>
        <br />
        <hr />
        {/*Explore*/}
        <div className='mt-4 space-y-3 items-center'>
            <div className="items-center space-x-2">
                <h1 className='font-semibold'>Explore</h1>
            </div>
            {
                sidebarItem3.map((item)=>{
                    return(
                        <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 rounded-xl ps-1'>
                        <div className='text-xl cursor-pointer'>{item.icon}</div>
                        <span className='cursor-pointer'>{item.name}</span>
                        </div>
                    );
                }) }
        </div>
        <br />
        <hr />
        {/* More section */}
        <div className='mt-4 space-y-3 items-center'>
            <div className="items-center space-x-2">
                <h1 className='font-semibold'>More from YouTube</h1>
            </div>
            {
                sidebarItem4.map((item)=>{
                    return(
                        <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 rounded-xl ps-1'>
                        <div className='text-xl cursor-pointer text-red-500 '>{item.icon}</div>
                        <span className='cursor-pointer'>{item.name}</span>
                        </div>
                    );
                }) }
        </div>
        <br />
        <hr />
        {/* Settins and more */}
        <div className='mt-4 space-y-3 items-center'>
            <div className="items-center space-x-2">
                <h1 className='font-semibold'>Explore</h1>
            </div>
            {
                sidebarItem5.map((item)=>{
                    return(
                        <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 rounded-xl ps-1'>
                        <div className='text-xl cursor-pointer'>{item.icon}</div>
                        <span className='cursor-pointer'>{item.name}</span>
                        </div>
                    );
                }) }
                <hr />
        </div>
        <br />
        <span className='text-xs font-semibold text-gray-700'>
            <p>About&nbsp; Press&nbsp; Copyright<br />Contact us&nbsp; Creators&nbsp; Advertise<br />Developers<br /><br /></p>
         <p>
            Terms&nbsp; Privacy&nbsp; Policy & Safety <br /> How YouTube works <br /> Test new features
         </p>
        </span>
        <p className='text-xs text-gray-500 mt-5 '>© 2024 Google LLC</p>
    </div>
  )
}

export default Sidebax;