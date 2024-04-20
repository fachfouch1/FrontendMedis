import { useEffect, useState } from "react";
import styles from "./data-page.module.css";
import { IMolecules } from "../../services/types";
import { deleteMolecule, getAllMolecules } from "../../services/utils";
import SearchResult from "../Search/SearchResult";

const DataPage = () => {
  const [molecules, setMolecules] = useState<IMolecules[]>([]);
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

  const handleBack = () => {
    setSingleView(null);
  };

  useEffect(() => {
    const getMolecules = async () => {
      setLoading(true);
      const response = await getAllMolecules();
      if (response?.status === 200) setMolecules(response.data);
      setLoading(false);
    };

    getMolecules();
  }, []);

  if (singleView) return singleView;

  if (!loading && molecules.length === 0) return <div className={styles.no_data}>No data found</div>;
  if (loading)
    return (
      <div className={styles.no_data}>
        <span className="loader" />{" "}
      </div>
    );

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Date of Creation</th>
            <th>ID</th>
            <th>Keyword</th>
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
                  <div className={styles.delete_icon} onClick={() => handleDelete(molecule.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPage;
