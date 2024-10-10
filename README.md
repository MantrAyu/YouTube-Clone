# YouTube Clone

A responsive YouTube clone built with **React**, featuring real-time feed updates, infinite scrolling, search suggestions powered by a third-party API, video preview on hover, and routing using **React Router**. The application uses **React Hooks** and **Redux** for state management, and integrates with the YouTube API to fetch video data.

## Demo Video

Click the image below to watch the demo video:

<a href="https://youtu.be/CViU7TpQViY" target="_blank">
    <img src="https://img.youtube.com/vi/CViU7TpQViY/maxresdefault.jpg" alt="Watch the video" width="750"/>
</a>

## Features

- **Real-Time Feed Updates**: Video feed updates dynamically as new content is available.
- **Infinite Scrolling**: Load more videos as you scroll, providing a seamless experience.
- **Responsive Design**: Fully responsive layout for all devices (mobile, tablet, desktop).
- **Search Suggestions**: Search suggestions powered by a third-party API for enhanced search functionality.
- **Video Preview on Hover**: Videos start playing automatically when you hover over them, similar to YouTube.
- **Routing**: Implemented using **React Router** for seamless navigation between different parts of the app.
- **State Management**: State management is handled using **React Hooks** and **Redux**.
- **YouTube API Integration**: Fetch video data, search results, and video details using the YouTube API.

## Tech Stack

- **Frontend**: React, Redux, React Router
- **API**: YouTube Data API v3
- **Styling**: CSS, Flexbox, Grid
- **State Management**: React Hooks, Redux
- **Other Tools**: Axios (for API requests)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MantrAyu/YouTube-Clone.git
    cd youtube-clone
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Get a YouTube API Key:

- Visit [Google Developer Console](https://console.developers.google.com/) and create a new project.
- Enable the YouTube Data API v3 for your project.
- Create an API key.

4. In the `.env` file in the root of the project and add your API key:

    ```bash
    REACT_APP_YOUTUBE_API_KEY=your_api_key_here
    ```

5. Start the application:

    ```bash
    npm start
    ```

## Project Structure

```bash
youtube-clone/ 
│ 
├── public/ 
│ └── logo.png 
│ └── profile.jpg 
│ └── vite.svg 
├── src/ 
│ ├── assets/ 
│ │   └── react.jsx 
│ ├── components/ 
│ │   └── Home.jsx 
│ │   └── ListItems.jsx.jsx 
│ │   └── Navbar.jsx 
│ │   └── PlayingVideo.jsx 
│ │   └── Search.jsx 
│ │   └── SearchCard.jsx 
│ │   └── SideBax.jsx 
│ │   └── SuggestedVideo.jsx 
│ │   └── Video.jsx 
│ │   └── description.css 
│ │   └── styles.css 
│ ├── context/ 
│ │   └── AuthProvider.jsx 
│ ├── loader/ 
│ │   └── Loading.jsx 
│ │   └── Time.jsx 
│ ├── utils/ # API services (Axios calls) 
│ │   └── rapidapi.js 
│ ├── App.js 
│ ├── index.css 
│ └── main.jsx 
├── .env # Environment variables 
├── package.json # Project dependencies 
└── README.md # Documentation 
```


## API Integration

### YouTube Data API

- The YouTube Data API is used to fetch videos, search results, and video details.
- You'll need a valid API key from Google to access the YouTube Data API.

### Search Suggestions API

- A third-party API is used to power search suggestions, enhancing the user experience by providing relevant results.

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check out the code.
