import styles from "../../css/Home/SearchBar.module.css";
import { useNotes } from "../../context/useNotes"; 

const SearchBar = () => {
  const { query, setQuery } = useNotes();

  const handleChange = (e) => {
    setQuery(e.target.value);
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

export default SearchBar;
