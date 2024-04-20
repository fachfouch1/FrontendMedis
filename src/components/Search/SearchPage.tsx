import { useState } from "react";
import styles from "./search-page.module.css";
import { getMolecule } from "./utils";

const SearchPage = () => {
  const [sliderValue, setSliderValue] = useState(1); // Default slider value
  const [searchTerm, setSearchTerm] = useState("");

  const getMoleculeHandler = async () => {
    if (sliderValue && searchTerm.length > 0) {
      await getMolecule(8, sliderValue, searchTerm);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "20px" }}>
        <img
          src="/medisSearchLogo.png"
          alt="searchMedis logo"
          className={styles.logo}
          width={"350px"}
        />
      </div>
      <div className={styles.search_layout}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search_bar}
        />
        <div className={styles.slider_button_layout}>
          <div className={styles.slider_container}>
            <span style={{ alignSelf: "flexStart" }}>
              Number of articles:{" "}
              <span className={styles.slider_count}>{sliderValue}</span>
            </span>
            <input
              type="range"
              min="1"
              max="5"
              step={1}
              value={sliderValue}
              className={styles.slider}
              onChange={(e) => setSliderValue(+e.target.value)}
            />
          </div>
          <button className={styles.search_button} onClick={getMoleculeHandler}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
