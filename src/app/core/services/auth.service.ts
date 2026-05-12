import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CrearUsuarioResponse, ICrearUsuarioRequest, 
  IObtenerUsuarioRequest, LoginResponse, SolicitarCodigoCambioContrasenaResponse, 
  CambiarContrasenaResponse, IIntentosUsuarioRequest, IntentosUsuarioResponse,
CambiarContrasenaRequest,DesbloquearUsuarioResponse,IDesbloquearUsuarioRequest,ObtenerUsuarioResponse } from '../interfaz/ILoginLicencia';
import { ApiResponse, ApiResponseData } from '../interfaz/ApiResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login-licencias`;
  private tokenKey = 'authToken';
  private userKey = 'userData';

  constructor(private http: HttpClient) {}

  solicitarCodioCambioContrasena(correo: string): Observable<SolicitarCodigoCambioContrasenaResponse> {
    return this.http.post<ApiResponseData<SolicitarCodigoCambioContrasenaResponse>>(`${this.apiUrl}/solicitar-codigo-cambio-contrasena`, { correo })
      .pipe(map(response => response.data));
  }

  cambiarContrasena(payload: CambiarContrasenaRequest): Observable<CambiarContrasenaResponse> {
    return this.http.post<ApiResponseData<CambiarContrasenaResponse>>(`${this.apiUrl}/cambiar-contrasena`, payload)
      .pipe(map(response => response.data));
  }

  login(payload: { codigo: string; userpassword: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload);
  }

  public crearUsuario(payload: ICrearUsuarioRequest): Observable<ApiResponseData<CrearUsuarioResponse>> {
      return this.http.post<ApiResponseData<CrearUsuarioResponse>>(`${this.apiUrl}/crear-usuario`, payload);
  }

  public obtenerUsuario(payload: IObtenerUsuarioRequest): Observable<ApiResponse<ObtenerUsuarioResponse>> {
      return this.http.post<ApiResponse<ObtenerUsuarioResponse>>(`${this.apiUrl}/obtener-usuario`, payload);
  }

  public intentosUsuario(payload: IIntentosUsuarioRequest): Observable<ApiResponseData<IntentosUsuarioResponse>> {
      return this.http.post<ApiResponseData<IntentosUsuarioResponse>>(`${this.apiUrl}/intentos-usuario`, payload);
  }

  public desbloquearUsuario(payload: IDesbloquearUsuarioRequest): Observable<ApiResponse<DesbloquearUsuarioResponse>> {
      return this.http.post<ApiResponse<DesbloquearUsuarioResponse>>(`${this.apiUrl}/desbloquear-usuario`, payload);
  }

  setSession(token: string, userData: any) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(userData));
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
    return Date.now() >= payload.exp * 1000;
  }
}