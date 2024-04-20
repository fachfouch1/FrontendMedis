import { useEffect, useState } from "react";
import styles from "./data-page.module.css";
import { IMolecules } from "../../services/types";
import { getAllMolecules } from "../../services/utils";

const DataPage = () => {
  const [molecules, setMolecules] = useState<IMolecules[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEdit = (id: number) => {
    console.log("Edit function called.");
    // Implementation for edit
  };

  const handleDelete = (id: number) => {
    console.log("Delete function called.");
    // Implementation for delete
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

  if (!loading && molecules.length === 0) return <div className={styles.no_data}>No data found</div>;
  if (loading) return <span className="loader" />;

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
