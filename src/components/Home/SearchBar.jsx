import { useState } from "react";
import styles from "../../css/Home/SearchBar.module.css";
import propTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Update parent component with search query
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search notes..."
        className={styles.searchInput}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: propTypes.func.isRequired,
};

export default SearchBar;
