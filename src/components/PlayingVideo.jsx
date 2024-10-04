import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom'; // Import Link for navigation
import { fetchData } from '../utils/rapidapi';
import { abbreviateNumber } from 'js-abbreviation-number';
import { AiOutlineLike } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaRegThumbsDown, FaShare } from 'react-icons/fa'; // Additional Icons
import SuggestedVideo from './SuggestedVideo';
import Navbar from "./Navbar.jsx";

function PlayingVideo() {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]); // Corrected State Variable
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false); // Toggle Description
  const [likes, setLikes] = useState(0); // Like Count
  const [dislikes, setDislikes] = useState(0); // Dislike Count
  const [shareMessage, setShareMessage] = useState(''); // Share Confirmation

  useEffect(() => {
    fetchVideoDetails();
    fetchComments();
    fetchRelatedVideos();
    // Scroll to top when video ID changes
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch Video Details
  const fetchVideoDetails = async () => {
    try {
      const res = await fetchData(`video/details/?id=${id}`);
      console.log('Video Details:', res);
      setVideo(res);
      setLikes(res?.stats?.likes || 0);
      setDislikes(res?.stats?.dislikes || 0); // Ensure dislikes are available
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const res = await fetchData(`video/comments/?id=${id}`);
      console.log('Comments:', res); // Log the entire response
      if (res.comments && Array.isArray(res.comments)) {
        setComments(res.comments);
      } else {
        setComments([]);
        console.warn('Comments data is not in expected format:', res);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  // Fetch Related Videos
  const fetchRelatedVideos = () => {
    fetchData(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideos(res);
    });
  };

  // Parse Description to Convert URLs into Clickable Links
  const parseDescription = (description) => {
    if (!description) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
  };

  // Handle Share Button Click
  const handleShare = () => {
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        setShareMessage('Link copied to clipboard!');
        setTimeout(() => setShareMessage(''), 2000); // Clear after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  // Handle Like Button Click
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // Handle Dislike Button Click
  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div>
    <div className='flex justify-center mt-16 px-4 overflow-x-hidden'>
      <div className='w-full max-w-[1580px] flex flex-col lg:flex-row'>
        {/* Main Content */}
        <div className='flex flex-col lg:flex-1 px-5 py-3'>
          {/* Video Player */}
          <div className='h-[200px] md:h-[500px]'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              height="100%"
              width="100%"
              controls
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          
          {/* Video Details */}
          <div>
            {/* Video Title */}
            <div className="font-bold text-sm md:text-xl mt-4">
              {video?.title || 'Untitled Video'}
            </div>
            
            {/* Author Info and Stats */}
            <div className="flex justify-between flex-col md:flex-row mt-4">
              {/* Author Info */}
              <div className="flex">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        video?.author?.avatar &&
                        Array.isArray(video.author.avatar) &&
                        video.author.avatar.length > 0
                          ? video.author.avatar[0].url
                          : 'https://via.placeholder.com/44' // Fallback avatar
                      }
                      alt={video?.author?.title || 'Author Avatar'}
                    />
                  </div>
                </div>
                <div className="flex space-x-5 ml-3">
                  <div className="flex flex-col">
                    <div className="text-md font-semibold flex items-center">
                      {video?.author?.title || 'Unknown Author'}
                      {video?.author?.badges &&
                        video.author.badges.some((badge) => badge.type === "VERIFIED_CHANNEL") && (
                          <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                        )}
                    </div>
                    <div className="text-sm">
                      {video?.author?.stats?.subscribersText || '0 Subscribers'}
                    </div>
                  </div>
                  <span className="mt-1 text-center bg-red-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200">
                    Subscribe
                  </span>
                </div>
              </div>
              
              {/* Video Stats: Like, Dislike, Share, Views */}
              <div className="flex items-center mt-4 md:mt-0 space-x-4">
                {/* Like Button */}
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500"
                  onClick={handleLike}
                  aria-label="Like Video"
                >
                  <AiOutlineLike className="text-xl" />
                  <span>{abbreviateNumber(likes, 2)}</span>
                </button>
                
                {/* Dislike Button */}
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500"
                  onClick={handleDislike}
                  aria-label="Dislike Video"
                >
                  <FaRegThumbsDown className="text-xl" />
                  <span>{abbreviateNumber(dislikes, 2)}</span>
                </button>
                
                {/* Share Button */}
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500"
                  onClick={handleShare}
                  aria-label="Share Video"
                >
                  <FaShare className="text-xl" />
                  <span>Share</span>
                </button>
                
                {/* Views */}
                <div className="flex items-center space-x-1 text-gray-700">
                  <span>{abbreviateNumber(video?.stats?.views, 2)}</span>
                  <span>Views</span>
                </div>
              </div>
            </div>
            
            {/* Video Description */}
            <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm whitespace-pre-wrap">
              {video?.description ? (
                <>
                  <div className="description">
                    {showFullDescription 
                      ? parseDescription(video.description) 
                      : parseDescription(video.description.slice(0, 200))}
                  </div>
                  {video.description.length > 200 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? ' less' : ' more'}
                    </span>
                  )}
                </>
              ) : (
                <p className="text-gray-500">No description available.</p>
              )}
            </div>
            
            {/* Comments Count */}
            <div className="flex gap-x-6 font-semibold rounded-xl mt-4 text-xl">
              {abbreviateNumber(video?.stats?.comments, 2) || 0} <p>Comments</p>
            </div>
            
            {/* Share Confirmation Message */}
            {shareMessage && (
              <div className="text-green-500 text-sm mt-2">
                {shareMessage}
              </div>
            )}
            
            {/* Comments Section */}
            <div className="flex flex-col w-full mt-4">
              <div className="flex flex-col w-full border-t pt-4">
                {comments.length > 0 ? (
                  comments.map((comment, index) => {
                    const commentAuthor = comment.author || {};
                    const commentAvatar =
                      Array.isArray(commentAuthor.avatar) && commentAuthor.avatar.length > 0
                        ? commentAuthor.avatar[0].url
                        : 'https://via.placeholder.com/40'; // Fallback avatar
                    const commentTitle = commentAuthor.title || 'Unknown User';
                    const publishedTimeText = comment.publishedTimeText || 'Just now';
                    const commentText = comment.content || 'No text available.'; // Use comment.content for text
                    const commentLikes = comment.stats?.likes || 0;

                    return (
                      <div key={comment.id || index} className="flex space-x-4 border-b py-3">
                        {/* Commenter Avatar */}
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            className="h-full w-full object-cover"
                            src={commentAvatar}
                            alt={commentTitle}
                          />
                        </div>

                        {/* Comment Content */}
                        <div className="flex flex-col w-full">
                          {/* Commenter Name and Timestamp */}
                          <div className="flex justify-between">
                            <div className="text-sm font-semibold">
                              {commentTitle}
                            </div>
                            <span className="text-gray-400 text-xs">
                              {publishedTimeText}
                            </span>
                          </div>

                          {/* Comment Text */}
                          <div className="text-sm text-gray-700 mt-1">
                            {commentText}
                          </div>

                          {/* Comment Actions: Like, Reply */}
                          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                            <AiOutlineLike className="text-gray-400 text-sm" />
                            <span>
                              {abbreviateNumber(commentLikes, 2)} Likes
                            </span>
                            <span>•</span>
                            <span className="cursor-pointer hover:underline">Reply</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No comments available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className=" hidden lg:block lg:w-1/3 px-4 py-6">
          {/* Related Videos */}
          <div className="flex flex-col  ">
            {relatedVideos?.contents?.map((item, index) => {
              if (item?.type !== "video") return null; // Use null instead of false for React rendering
              return <SuggestedVideo key={index} video={item?.video} />;
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PlayingVideo;
