"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchPosts = async () => {
    const response = await fetch("/api/quotes");
    const data = await response.json();

    setAllPosts(data);
    setIsloading(false);
  };
  // use effect untuk inisiasi data
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Cari Quotes yang cocok untuk kamu 😊😊😊'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer text-center'
        />
      </form>


      {/* All Prompts */}
      {searchText ? (
        searchedResults.length > 0 ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <p className="desc">Quotes yang kamu cari ngga ada nih 😅</p> // Tampilkan pesan jika hasil pencarian kosong
        )
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;