import { useEffect, useState } from "react";
import styles from "./search-page.module.css";
import { getMolecule } from "../../services/utils";
import clsx from "clsx";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(1);
  const [userId, setUserId] = useState<number>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMolecule, setSearchedMolecule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMoleculeHandler = async () => {
    setLoading(true);
    if (sliderValue && searchTerm.length > 0 && userId !== undefined) {
      console.log(userId, sliderValue, searchTerm)
      const response = await getMolecule(userId, sliderValue, searchTerm);
      if (response?.molecule_id) {
        setSearchedMolecule(response.molecule_id);
      } else {
        setError(response.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const userStored = localStorage.getItem("userData");
    if (userStored) {
      const userData = JSON.parse(userStored);
      setUserId(userData.id);
      if (!userData.status) {
        navigate("/profile");
      }
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div style={{ marginBottom: "20px" }}>
          <img src="/medisSearchLogo.png" alt="searchMedis logo" className={styles.logo} width={"350px"} />
        </div>
        <div className={styles.search_layout}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => !loading && setSearchTerm(e.target.value)}
            className={clsx(styles.search_bar, loading && styles.search_bar_disabled)}
          />
          <div className={styles.slider_button_layout}>
            <div className={styles.slider_container}>
              <span style={{ alignSelf: "flexStart" }}>
                Number of articles: <span className={styles.slider_count}>{sliderValue}</span>
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
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
              {loading && <span className="loader" />}
              {error && <span className={styles.error_message}>{error}</span>}
              <button
                disabled={loading}
                className={clsx(styles.search_button, loading && styles.search_button_disabled)}
                onClick={getMoleculeHandler}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className={styles.result_layout}>
          {searchedMolecule && <SearchResult molecule_id={searchedMolecule} />}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
