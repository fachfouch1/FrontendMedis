import { useEffect, useState } from "react";
import { getSearchedMolecule } from "../../services/utils";

interface IResult {
  molecule_id: number;
}

const Result: React.FC<IResult> = ({ molecule_id }) => {
  const [moleculeInfo, setMoleculeInfo] = useState<any>(null);
  useEffect(
    () => {
      const getMoleculeInfo = async () => {
        const fetchedMoleculeInfo = await getSearchedMolecule(molecule_id);
        if (fetchedMoleculeInfo?.status === 200) {
          setMoleculeInfo(fetchedMoleculeInfo);
        }
        console.log(fetchedMoleculeInfo);
      };
      if (molecule_id) getMoleculeInfo();
    },
    // eslint-disable-next-line
    [molecule_id]
  );

  return <div>dksfjlghsdjkfghsdfghjkldhjfgljlsdfjgj dksfjlghsdjkfghsdfghjkldhjfgljlsdfjgj qsfsdf sf dksfjlghsdjkfghsdfghjkldhjfgljlsdfjgj qsfsdf sf dksfjlghsdjkfghsdfghjkldhjfgljlsdfjgj qsfsdf sf  sf</div>;
};

export default Result;
