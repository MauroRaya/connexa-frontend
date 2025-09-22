export type Student = {
  id: number;
  name: string;
  email: string;
};

export type Group = {
  id: number;
  name: string;
  subject: string;
  modality: "IN_PERSON" | "ONLINE" | "HYBRID";
  location: string;
  objective: string;
  students: Student[];
};
