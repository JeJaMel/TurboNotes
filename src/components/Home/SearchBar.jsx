import { FiSearch } from "react-icons/fi";
import styles from "../../css/Home/SearchBar.module.css";
import { useNotes } from "../../context/UseNotes";

const SearchBar = () => {
  const { query, setQuery } = useNotes();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.iconContainer}>
        <FiSearch className={styles.searchIcon} />
      </div>
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

export default SearchBar;
