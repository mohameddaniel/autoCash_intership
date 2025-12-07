export type CarItemType = {
  ref: string;
  prix: number;
  nomVoiture: string;
  nomVendeur: string;
  localisation: string;
  datePublication: string; 
  category: "publiée" | "expertise" | "archivée"; 
};
