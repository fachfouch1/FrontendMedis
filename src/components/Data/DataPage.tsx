import { useEffect, useState } from "react";
import styles from "./data-page.module.css";
import { IMolecules } from "../../services/types";
import { deleteMolecule, downloadPDF, getAllMolecules, getMolecule } from "../../services/utils";
import SearchResult from "../Search/SearchResult";
import clsx from "clsx";

interface SpinningStatus {
  [key: number]: boolean;
}

const DataPage = () => {
  const [molecules, setMolecules] = useState<IMolecules[]>([]);
  const [searchableMolecules, setSearchableMolecules] = useState<IMolecules[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [spinningStatus, setSpinningStatus] = useState<SpinningStatus>({});
  const [singleView, setSingleView] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string>("");

  const handleEdit = (id: number) => {
    const singleView = (
      <div className={styles.tableContainer}>
        <button onClick={handleBack}>Back</button>
        <SearchResult molecule_id={id} />
      </div>
    );
    setSingleView(singleView);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteMolecule(id);
    if (response) {
      const updatedMolecules = molecules.filter((molecule) => molecule.id !== id);
      setMolecules(updatedMolecules);
    }
  };

  const handleDownloadPDF = async (id: number, moleculeName: string) => {
    const response = await downloadPDF(id);
    if (response?.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `molecule_${moleculeName}.pdf`);
      document.body.appendChild(link);
      link.click();
    }
  };

  const handleScraping = async (moleculeId: number, keyword: string) => {
    setSpinningStatus((prev) => ({ ...prev, [moleculeId]: true }));
    const response = await getMolecule(8, 1, keyword);
    if (!response?.molecule_id) {
      setError(response.message);
    }
    setSpinningStatus((prev) => ({ ...prev, [moleculeId]: false }));
  };

  const handleBack = () => {
    setSingleView(null);
  };

  useEffect(() => {
    const getMolecules = async () => {
      setLoading(true);
      const response = await getAllMolecules();
      if (response?.status === 200) {
        setMolecules(response.data);
        setSearchableMolecules(response.data);
      }
      setLoading(false);
    };

    getMolecules();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filteredMolecules = searchableMolecules.filter(
      (molecule) =>
        molecule.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        molecule.User_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMolecules(filteredMolecules);
  };

  if (singleView) return singleView;

  if (loading)
    return (
      <div className={styles.no_data}>
        <span className="loader" />{" "}
      </div>
    );

  return (
    <div className={styles.tableContainer}>
      <p>{error}</p>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by Molecule or User Name"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        style={{ margin: "20px 0" }}
      />
      {molecules?.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Date of Creation</th>
              <th>ID</th>
              <th>Molecule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {molecules.map((molecule) => (
              <tr key={molecule.id}>
                <td>{molecule.User_name}</td>
                <td>{molecule.date_of_creation}</td>
                <td>{molecule.id}</td>
                <td>{molecule.keyword}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                    <div
                      className={clsx(styles.refresh_icon, spinningStatus[molecule.id] && styles.spinner)}
                      onClick={() => handleScraping(molecule.id, molecule.keyword)}
                    />
                    <div className={styles.edit_icon} onClick={() => handleEdit(molecule.id)} />
                    <div
                      className={styles.download_icon}
                      onClick={() => handleDownloadPDF(molecule.id, molecule.keyword)}
                    />
                    <div className={styles.delete_icon} onClick={() => handleDelete(molecule.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.no_data}>No data found</div>
      )}
    </div>
  );
};

export default DataPage;
