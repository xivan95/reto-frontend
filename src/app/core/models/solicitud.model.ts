export interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  vacante: string;
  estado: 'Pendiente' | 'Adjudicada' | 'Rechazada';
}
