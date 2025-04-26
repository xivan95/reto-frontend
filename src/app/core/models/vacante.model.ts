export interface Vacante {
  id: number;
  titulo: string;
  descripcion: string;
  requisitos: string;
  ubicacion: string;
  empresa: string;
  estado: 'CREADA' | 'ASIGNADA' | 'CANCELADA';
  tipoContrato: 'Tiempo Completo' | 'Medio Tiempo' | 'Prácticas' | 'Freelance';
  categoria: string;
}
