import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { abbreviateNumber } from 'js-abbreviation-number';
import ReactPlayer from 'react-player/youtube';

function Video({ video }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Track mute/unmute state

    console.log(video); // Logging the video object as per your request

    // Handle mute/unmute toggle
    const handleToggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className=''>
            <Link to={`/video/${video?.videoId}`}>
                <div
                    className='flex flex-col'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        setIsMuted(true); // Reset to mute when mouse leaves
                    }}
                >
                    {/* thumbnail & time */}
                    <div className='relative h-48 md:h-56 md:rounded-xl hover:rounded-none duration-200 overflow-hidden group'>
                        {!isHovered ? (
                            <>
                                <img
                                    className="h-full w-full transform transition-transform duration-300 group-hover:scale-110"
                                    src={video?.thumbnails[0]?.url}
                                    alt=""
                                />
                                {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
                            </>
                        ) : (
                            <div className="absolute inset-0">
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${video?.videoId}`}
                                    playing={true}
                                    muted={isMuted} // Control mute/unmute state
                                    width="100%"
                                    height="100%"
                                    style={{ backgroundColor: "#000000" }}
                                />

                                {/* Mute/Unmute button */}
                                <button 
                                    onClick={handleToggleMute}
                                    className='absolute bottom-3 right-3 bg-black text-white p-1 rounded'
                                >
                                    {isMuted ? 'Unmute' : 'Mute'}
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Channel logo & title */}
                    <div className='flex mt-3 space-x-2 '>
                        <div className='items-start'>
                            <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                                <img
                                    className="h-full w-full rounded-full overflow-hidden"
                                    src={video?.author?.avatar[0].url}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div>
                            <span className='text-sm font-bold line-clamp-2'>
                                {video?.title}
                            </span>
                            <span className='flex items-center font-semibold mt-1 text-[13px] text-gray-600'>
                                {video?.author?.title}
                                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                    <BsFillCheckCircleFill className='text-gray-600 ml-1 text-[13px]' />
                                )}
                            </span>
                            <div className='flex text-gray-500 text-[13px]'>
                                <span>{`${abbreviateNumber(
                                    video?.stats?.views, 2
                                )} views`}
                                </span>
                                <span className='flex text-[24px] leading-none font-bold relative top-[-10px] mx-1'>
                                    .
                                </span>
                                <span>{video?.publishedTimeText}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Video;
