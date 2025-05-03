export interface Usuario {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'EMPLOYEE' | 'COMPANY' | 'ADMIN';
  experiencia: string;
  educacion: string;
  enabled: boolean;
}
