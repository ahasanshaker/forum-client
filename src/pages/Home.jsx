import React from 'react';
import Banner from '../components/Banner';
import TagsSection from '../components/TagSection';

const Home = () => {
     const dummyTags = ["React", "Node", "MongoDB", "Express", "JavaScript"];

  const handleTagClick = (tag) => {
    console.log("Selected Tag:", tag);
    // Later: API call to fetch posts by this tag
  };
    return (
        <div>
            <Banner></Banner>
            <TagsSection tags={dummyTags} onTagClick={handleTagClick} ></TagsSection>
        </div>
    );
};

export default Home;