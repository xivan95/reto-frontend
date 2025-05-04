import { Categoria } from './categoria.model';
import { Empresa } from './empresa.model';
import { Solicitud } from './solicitud.model';

export interface Vacante {
  idVacante: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  salario: number;
  estatus: string;
  destacado: number;
  imagen: string;
  detalles: string;
  categoria: Categoria;
  empresa: Empresa;
}
