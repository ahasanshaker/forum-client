import React from 'react';
import Banner from '../components/Banner';
import TagsSection from '../components/TagSection';
import AnnouncementSection from '../components/AnnouncementSection';

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
    return (
        <div>
            <Banner></Banner>
            <TagsSection tags={dummyTags} onTagClick={handleTagClick} ></TagsSection>
            <AnnouncementSection announcements={dummyAnnouncements}></AnnouncementSection>
            
        </div>
    );
};

export default Home;