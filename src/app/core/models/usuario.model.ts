export interface Usuario {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'empresa' | 'admin';
}
