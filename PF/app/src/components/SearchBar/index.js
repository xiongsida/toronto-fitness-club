import React from 'react';
import './style.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, changeInput, placeholdertext}) => (
  <div className='searchBar-wrap'>
    <SearchIcon className='searchBar-icon' />
    <input
      type='text'
      placeholder={placeholdertext}
      value={value}
      onChange={changeInput}
    />
  </div>
);

export default SearchBar;