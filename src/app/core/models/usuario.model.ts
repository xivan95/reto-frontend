export interface Usuario {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'empresa' | 'admin';
  experiencia: string;
  educacion: string;
}
