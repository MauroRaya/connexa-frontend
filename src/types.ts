export type Student = {
  id: number;
  name: string;
  email: string;
};

export type Group = {
  id: number;
  name: string;
  subject: string;
  modality: "ONLINE" | "PRESENCIAL" | "HÍBRIDO";
  location: string;
  objective: string;
  date: string;
  duration: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  code: string;
  students: Student[];
  capacity: number;
};
