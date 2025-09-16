import React from 'react';
import Banner from '../components/Banner';
import TagsSection from '../components/TagSection';
import AnnouncementSection from '../components/AnnouncementSection';
import PostsSection from './PostSection';
import PostDetails from './PostDetails';
import Footer from '../components/Footer';

const Home = () => {
     const dummyTags = ["React", "Node", "MongoDB", "Express", "JavaScript"];

  const handleTagClick = (tag) => {
    console.log("Selected Tag:", tag);
    // Later: API call to fetch posts by this tag
  };

  const dummyAnnouncements = [
    {
      title: "Server Maintenance",
      description: "The site will be down from 12 AM to 2 AM for maintenance.",
      time: "2025-09-15 11:00 AM",
    },
    {
      title: "New Feature",
      description: "We added new tags for better search experience!",
      time: "2025-09-14 5:30 PM",
    },
  ];
  const dummyPosts = [
    {
      id: 1,
      authorName: "Shaker",
      authorImage: "https://i.pravatar.cc/50?img=1",
      title: "Learning React",
      description: "React is awesome for building UI...",
      tags: ["React", "JavaScript"],
      time: "2025-09-15 11:00 AM",
      upVote: 12,
      downVote: 2,
      comments: 5,
    },
    {
      id: 2,
      authorName: "Nasima",
      authorImage: "https://i.pravatar.cc/50?img=2",
      title: "Node.js Basics",
      description: "Node.js helps run JS on server...",
      tags: ["Node", "Backend"],
      time: "2025-09-14 9:00 AM",
      upVote: 5,
      downVote: 1,
      comments: 2,
    },
    // more dummy posts...
  ];

    return (
        <div>
            <Banner></Banner>
            <AnnouncementSection announcements={dummyAnnouncements}></AnnouncementSection>
            <PostsSection posts={dummyPosts}></PostsSection>
            <Footer></Footer>
           
        </div>
    );
};

export default Home;