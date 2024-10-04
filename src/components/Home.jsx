import React, { useEffect, useState, useCallback } from 'react';
import Sidebax from "./Sidebax.jsx";
import Video from "./Video.jsx";
import { useAuth } from '../context/AuthProvider';
import ListItems from './ListItems.jsx';

function Home () {
  const { data, loading } = useAuth();
  const [videoData, setVideoData] = useState([]); // Store video data
  const [page, setPage] = useState(1); // Track current page
  const [isFetching, setIsFetching] = useState(false); // Track whether we are currently fetching more data

  // Infinite scroll function
  const handleScroll = useCallback(() => {
    const scrollableDiv = document.querySelector('.scroll-container');
    if (
      scrollableDiv.scrollTop + scrollableDiv.clientHeight >= scrollableDiv.scrollHeight - 10 &&
      !isFetching
    ) {
      // User is near the bottom, load more data
      setIsFetching(true);
    }
  }, [isFetching]);

  // Simulate fetching more videos
  const fetchMoreData = () => {
    if (loading) return; // Do nothing if data is still loading initially

    // Simulate an API call to fetch more data
    setTimeout(() => {
      const moreData = data.slice(0, 21); // Simulate fetching 5 more videos
      setVideoData((prevData) => [...prevData, ...moreData]);
      setPage((prevPage) => prevPage + 1);
      setIsFetching(false);
    }, 1000);
  };

  // Listen for scroll events
  useEffect(() => {
    const scrollableDiv = document.querySelector('.scroll-container');
    scrollableDiv.addEventListener('scroll', handleScroll);
    return () => scrollableDiv.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Fetch more data when scrolling reaches bottom
  useEffect(() => {
    if (isFetching) {
      fetchMoreData();
    }
  }, [isFetching]);

  // Initialize videoData with the first load
  useEffect(() => {
    if (!loading && data.length > 0) {
      setVideoData(data.slice(0, 21)); // Load the first 5 videos initially
    }
  }, [data, loading]);

  return (
    <div className='flex mt-20'>
      <Sidebax />
      <div className='h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden scroll-container'>
        <div className='sticky top-0 z-10 bg-white pb-2'>
          <ListItems />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-5'>
          {
            !loading && videoData.map((item, index) => {
              if (item.type !== "video") return false;
              return <Video key={index} video={item?.video} />;
            })
          }
        </div>

        {isFetching && <div className="text-center">Loading more videos...</div>}
      </div>
    </div>
  );
}

export default Home;

