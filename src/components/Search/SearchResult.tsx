import { useEffect, useState } from "react";
import { getSearchedMolecule, updateMolecule } from "../../services/utils";
import { IMolecule } from "../../services/types";
import styles from "./search-page.module.css";

interface IResult {
  molecule_id: number;
}

const SearchResult: React.FC<IResult> = ({ molecule_id }) => {
  const [editableInfo, setEditableInfo] = useState<IMolecule | null>(null);

  useEffect(() => {
    const getMoleculeInfo = async () => {
      const fetchedMoleculeInfo = await getSearchedMolecule(molecule_id);
      if (fetchedMoleculeInfo?.status === 200) {
        setEditableInfo(fetchedMoleculeInfo.data);
      }
    };

    if (molecule_id) {
      getMoleculeInfo();
    }
  }, [molecule_id]);

  const handleChange = (section: keyof IMolecule, field: keyof any, value: string) => {
    if (editableInfo) {
      setEditableInfo({
        ...editableInfo,
        [section]: {
          ...editableInfo[section],
          [field]: value,
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (editableInfo) {
      const response = await updateMolecule(molecule_id, editableInfo);
      if (response.status === 200) {
        alert("Update successful");
      } else {
        alert("Update failed");
      }
    }
  };

  if (!editableInfo) return <span className="loader" />;

  return (
    <div>
      <h1>Molecule Information</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <section>
          <h2>General</h2>
          <label>Date: {editableInfo.molecule.Date}</label>
          <br />
          <label>Keyword: {editableInfo.molecule.keyword}</label>
        </section>

        <section>
          <h2>PubChem Data</h2>
          <label>
            ATC Code:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.atc_code}
              onChange={(e) => handleChange("pubchem", "atc_code", e.target.value)}
            />
          </label>
          <label>
            CAS Registry Number:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.cas_reg}
              onChange={(e) => handleChange("pubchem", "cas_reg", e.target.value)}
            />
          </label>
          <label>
            Compound Name:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.compoundname}
              onChange={(e) => handleChange("pubchem", "compoundname", e.target.value)}
            />
          </label>
          <label>
            Decomposition:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.decomposition}
              onChange={(e) => handleChange("pubchem", "decomposition", e.target.value)}
            />
          </label>
          <label>
            Half-Life:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.half_life}
              onChange={(e) => handleChange("pubchem", "half_life", e.target.value)}
            />
          </label>
          <label>
            IUPAC Name:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.iupac_name}
              onChange={(e) => handleChange("pubchem", "iupac_name", e.target.value)}
            />
          </label>
          <label>
            Melting Point:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.melting_point}
              onChange={(e) => handleChange("pubchem", "melting_point", e.target.value)}
            />
          </label>
          <label>
            Molecular Formula:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.molecular_form}
              onChange={(e) => handleChange("pubchem", "molecular_form", e.target.value)}
            />
          </label>
          <label>
            Molecular Weight:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.molecular_weight}
              onChange={(e) => handleChange("pubchem", "molecular_weight", e.target.value)}
            />
          </label>
          <label>
            Physical Description:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.physical_desc}
              onChange={(e) => handleChange("pubchem", "physical_desc", e.target.value)}
            />
          </label>
          <label>
            PubChem CID:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.pubchem_cid}
              onChange={(e) => handleChange("pubchem", "pubchem_cid", e.target.value)}
            />
          </label>
          <label>
            Reactivity:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.reactivity}
              onChange={(e) => handleChange("pubchem", "reactivity", e.target.value)}
            />
          </label>
          <label>
            Solubility:{" "}
            <input
              className={styles.input_field}
              type="text"
              value={editableInfo.pubchem.solubility}
              onChange={(e) => handleChange("pubchem", "solubility", e.target.value)}
            />
          </label>
        </section>

        <section>
          <h2>PubMed Data</h2>
          <label>
            Benefits/Risks:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Benefits_Risks}
              onChange={(e) => handleChange("pubmed", "Benefits_Risks", e.target.value)}
            />
          </label>
          <label>
            Clinical Studies:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Clinical_Studies}
              onChange={(e) => handleChange("pubmed", "Clinical_Studies", e.target.value)}
            />
          </label>
          <label>
            Marketing Experience:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Marketing_Experience}
              onChange={(e) => handleChange("pubmed", "Marketing_Experience", e.target.value)}
            />
          </label>
          <label>
            Overview of Efficacy:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Overview_of_Efficacy}
              onChange={(e) => handleChange("pubmed", "Overview_of_Efficacy", e.target.value)}
            />
          </label>
          <label>
            Overview of safety:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Overview_of_Safety}
              onChange={(e) => handleChange("pubmed", "Overview_of_Safety", e.target.value)}
            />
          </label>
          <label>
            Pharmacodynamics:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Pharmacodynamics}
              onChange={(e) => handleChange("pubmed", "Pharmacodynamics", e.target.value)}
            />
          </label>
          <label>
            Pharmacodynamics Interaction:{" "}
            <textarea
              className={styles.textarea_field}
              value={editableInfo.pubmed.Pharmacodynamics_Drug_Interaction_page}
              onChange={(e) => handleChange("pubmed", "Pharmacodynamics_Drug_Interaction_page", e.target.value)}
            />
          </label>
        </section>

        <button className={styles.search_button} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default SearchResult;
