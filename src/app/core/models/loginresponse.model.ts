import { Usuario } from "./usuario.model";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: Usuario;
  expiration: string; // o Date si quieres parsearlo
}
