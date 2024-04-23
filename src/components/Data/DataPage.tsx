import { useEffect, useState } from "react";
import styles from "./data-page.module.css";
import { IMolecules } from "../../services/types";
import { deleteMolecule, downloadPDF, getAllMolecules } from "../../services/utils";
import SearchResult from "../Search/SearchResult";

const DataPage = () => {
  const [molecules, setMolecules] = useState<IMolecules[]>([
/*     {
      User_name: "user four",
      date_of_creation: "2024-04-20 19:12:43",
      id: 54,
      keyword: "paracetamol",
      user_id: 8,
    }, */
  ]);
  const [searchableMolecules, setSearchableMolecules] = useState<IMolecules[]>([
   /*  {
      User_name: "user four",
      date_of_creation: "2024-04-20 19:12:43",
      id: 54,
      keyword: "paracetamol",
      user_id: 8,
    }, */
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [singleView, setSingleView] = useState<JSX.Element | null>(null);

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
    const filteredMolecules = searchableMolecules.filter(molecule =>
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
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by Molecule"
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
