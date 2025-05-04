import { Usuario } from './usuario.model';

export interface Empresa {
  idEmpresa: number;
  razonSocial: string;
  direccionFiscal: string;
  pais: string;
  user?: Usuario; 
}
