import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function SuggestedVideo({ video }) {
  console.log(video);
  
  // Fallback values to prevent undefined issues
  const thumbnailUrl = video?.thumbnails?.[0]?.url || 'https://via.placeholder.com/168x94';
  const videoTitle = video?.title || 'Untitled Video';
  const authorTitle = video?.author?.title || 'Unknown Author';
  const views = abbreviateNumber(video?.stats?.views, 2) || '0';
  const publishedTime = video?.publishedTimeText || 'Unknown time';
  const isVerified = video?.author?.badges?.some(badge => badge.type === "VERIFIED_CHANNEL");

  return (
    <div className="w-full">
      <Link to={`/video/${video?.videoId}`} className="flex mb-3">
        {/* Thumbnail */}
        <div className="relative h-24 w-40 flex-shrink-0 rounded-xl overflow-hidden hover:rounded-none duration-200">
          <img
            className="h-full w-full object-cover"
            src={thumbnailUrl}
            alt={videoTitle}
          />
          {video?.lengthSeconds && <Time time={video.lengthSeconds} />}
        </div>
        
        {/* Video Details */}
        <div className="flex flex-col ml-3 flex-1 min-w-0">
          {/* Video Title */}
          <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2">
            {videoTitle}
          </span>
          
          {/* Author Info */}
          <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 flex items-center">
            {authorTitle}
            {isVerified && (
              <BsFillCheckCircleFill className="text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
            )}
          </span>
          
          {/* Video Stats */}
          <div className="flex items-center text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-1">
            <span>{`${views} views`}</span>
            <span className="mx-1 text-xs text-gray-500">•</span>
            <span>{publishedTime}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SuggestedVideo;
