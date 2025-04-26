export interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  vacanteId: number; // 👈 importante cambio
  estado: 'pendiente' | 'adjudicada' | 'cancelada';
}
