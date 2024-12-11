import React from 'react';
import './css/SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchKeyword, setSearchKeyword }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="가고싶은 장소를 검색해보세요."
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button className="search-button">
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
      </button>
    </div>
  );
};

export default SearchBar;
