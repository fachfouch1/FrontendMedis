import { useEffect, useState } from "react";
import { getSearchedMolecule } from "../../services/utils";

interface IResult {
  molecule_id: number;
}

const SearchResult: React.FC<IResult> = ({ molecule_id }) => {
  const [moleculeInfo, setMoleculeInfo] = useState<any>(null);
  useEffect(
    () => {
      const getMoleculeInfo = async () => {
        const fetchedMoleculeInfo = await getSearchedMolecule(molecule_id);
        if (fetchedMoleculeInfo?.status === 200) {
          setMoleculeInfo(fetchedMoleculeInfo.data);
        }
        console.log(fetchedMoleculeInfo);
      };
      if (molecule_id) getMoleculeInfo();
    },
    // eslint-disable-next-line
    [molecule_id]
  );

  return <div>{moleculeInfo}</div>;
};

export default SearchResult;
