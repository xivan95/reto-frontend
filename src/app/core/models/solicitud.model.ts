export interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  estado: 'pendiente' | 'adjudicada' | 'cancelada';
  vacanteId: number;
  cvUrl?: string;
  comentario?: string;
  fecha: string
}
