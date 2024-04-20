import { useEffect, useState } from "react";
import { getSearchedMolecule, info } from "../../services/utils";
import { IMolecule } from "../../services/types";

interface IResult {
  molecule_id: number;
}

const SearchResult: React.FC<IResult> = ({ molecule_id }) => {
  const [moleculeInfo, setMoleculeInfo] = useState<IMolecule | null>(null);

  useEffect(() => {
    const getMoleculeInfo = async () => {
      const fetchedMoleculeInfo = await getSearchedMolecule(molecule_id);
      if (fetchedMoleculeInfo?.status === 200) {
        setMoleculeInfo(fetchedMoleculeInfo.data);
      }
      console.log(fetchedMoleculeInfo);
    };

    if (molecule_id) {
      getMoleculeInfo();
    }
  }, [molecule_id]);

  return (
    <div>
      {moleculeInfo ? (
        <div>
          <h1>Molecule Information</h1>
          <section>
            <h2>General</h2>
            <p>Date: {moleculeInfo.molecule.Date}</p>
            <p>Keyword: {moleculeInfo.molecule.keyword}</p>
          </section>

          <section>
            <h2>PubChem Data</h2>
            <p>ATC Code: {moleculeInfo.pubchem.atc_code}</p>
            <p>CAS Registry Number: {moleculeInfo.pubchem.cas_reg}</p>
            <p>Compound Name: {moleculeInfo.pubchem.compoundname}</p>
            <p>Decomposition: {moleculeInfo.pubchem.decomposition}</p>
            <p>Half-Life: {moleculeInfo.pubchem.half_life}</p>
            <img src={moleculeInfo.pubchem.image_url} alt="Molecule Structure" />
            <p>IUPAC Name: {moleculeInfo.pubchem.iupac_name}</p>
            <p>Melting Point: {moleculeInfo.pubchem.melting_point}</p>
            <p>Molecular Formula: {moleculeInfo.pubchem.molecular_form}</p>
            <p>Molecular Weight: {moleculeInfo.pubchem.molecular_weight}</p>
            <p>Physical Description: {moleculeInfo.pubchem.physical_desc}</p>
            <p>PubChem CID: {moleculeInfo.pubchem.pubchem_cid}</p>
            <p>Reactivity: {moleculeInfo.pubchem.reactivity}</p>
            <p>Solubility: {moleculeInfo.pubchem.solubility}</p>
          </section>

          <section>
            <h2>PubMed Data</h2>
            <p>Benefits/Risks: {moleculeInfo.pubmed.Benefits_Risks}</p>
            <p>Dosage: {moleculeInfo.pubmed.Clinical_Studies}</p>
            <p>Indications: {moleculeInfo.pubmed.Marketing_Experience}</p>
            <p>Pharmacology: {moleculeInfo.pubmed.Overview_of_Safety}</p>
            <p>Side Effects: {moleculeInfo.pubmed.Pharmacodynamics}</p>
            <p>Pharmacodynamics: {moleculeInfo.pubmed.Pharmacodynamics}</p>
            <p>Pharmacodynamics Drug Interaction: {moleculeInfo.pubmed.Pharmacodynamics_Drug_Interaction_page}</p>
          </section>
        </div>
      ) : (
        <span className="loader" />
      )}
    </div>
  );
};

export default SearchResult;
