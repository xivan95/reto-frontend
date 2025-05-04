export interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  estado: number;
  vacanteId: number;
  archivo?: string;
  comentarios?: string;
  fecha: string
}
