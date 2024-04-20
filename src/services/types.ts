export interface IMolecule {
  molecule: {
    Date: string;
    keyword: string;
  };
  pubchem: {
    atc_code: string;
    cas_reg: string;
    compoundname: string;
    decomposition: string;
    half_life: string;
    image_url: string;
    iupac_name: string;
    melting_point: string;
    molecular_form: string;
    molecular_weight: string;
    physical_desc: string;
    pubchem_cid: string;
    reactivity: string;
    solubility: string;
  };
  pubmed: {
    Benefits_Risks: string;
    Clinical_Studies: string;
    Marketing_Experience: string;
    Overview_of_Efficacy: string;
    Overview_of_Safety: string;
    Pharmacodynamics: string;
    Pharmacodynamics_Drug_Interaction_page: string;
  };
}

export interface IMolecules {
  User_name: string;
  date_of_creation: string;
  id: number;
  keyword: string;
  user_id: number;
}
