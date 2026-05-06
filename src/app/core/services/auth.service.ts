import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CrearUsuarioResponse, ICrearUsuarioRequest, IObtenerUsuarioRequest, LoginResponse } from '../interfaz/ILoginLicencia';
import { ApiResponse, ApiResponseData } from '../interfaz/ApiResponse';
import { ObtenerSolicitudResponse } from '../interfaz/ISolicitudLicencia';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login-licencias`;
  private tokenKey = 'authToken';
  private userKey = 'userData';

  constructor(private http: HttpClient) {}

  recuperarContrasena(payload: { opcion: string; codigo: string; num_docu: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-contrasena`, payload);
  }

  vincularContacto(payload: { opcion: string;codigo: string; email:string; num_docu: string; telefono:string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-codigo-recuperacion`, payload);
  }

  enviarNuevaContrasena(payload:{opcion:number; codigo_confirmacion:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-nueva-contrasena`, payload);
  }

  login(payload: { codigo: string; userpassword: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload);
  }

  public crearUsuario(payload: ICrearUsuarioRequest): Observable<ApiResponseData<CrearUsuarioResponse>> {
      return this.http.post<ApiResponseData<CrearUsuarioResponse>>(`${this.apiUrl}/crear-usuario`, payload);
  }

  public obtenerUsuario(payload: IObtenerUsuarioRequest): Observable<ApiResponse<ObtenerSolicitudResponse>> {
      return this.http.post<ApiResponse<ObtenerSolicitudResponse>>(`${this.apiUrl}/obtener-usuario`, payload);
  }

  setSession(token: string, userData: any) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(userData));
    console.log('USER DATA:', userData)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000; // Comparar tiempo de expiración
  }
}