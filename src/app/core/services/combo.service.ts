import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { 
    IcomboRequest, GiroResponse, TipoLicenciaResponse, FuncionesResponse, 
    CondicionesResponse, ActividadesResponse, TipoDocumentosResponse, IUbigeoRequest,
    TipoPersonaResponse, UbigeoResponse
} from "../interfaz/IComboLicencia";
import { ApiResponse } from "../interfaz/ApiResponse";

@Injectable({ providedIn: 'root' })
export class ComboService {
    constructor(private http: HttpClient) { }
    private apiUrl = `${environment.apiUrl}/combo-licencias`;

    public listarGiros(payload: IcomboRequest): Observable<ApiResponse<GiroResponse>> {
        return this.http.post<ApiResponse<GiroResponse>>(`${this.apiUrl}/listar-giros`, payload);
    }

    public listarTiposLicencia(payload: IcomboRequest): Observable<ApiResponse<TipoLicenciaResponse>> {
        return this.http.post<ApiResponse<TipoLicenciaResponse>>(`${this.apiUrl}/listar-tipo-licencia`, payload);
    }

    public listarFunciones(payload: IcomboRequest): Observable<ApiResponse<FuncionesResponse>> {
        return this.http.post<ApiResponse<FuncionesResponse>>(`${this.apiUrl}/listar-funciones`, payload);
    }

    public listarTipoDoc(payload: IcomboRequest): Observable<ApiResponse<TipoDocumentosResponse>> {
        return this.http.post<ApiResponse<TipoDocumentosResponse>>(`${this.apiUrl}/listar-tipo-documento`, payload);
    }

    public listarActividades(payload: IcomboRequest): Observable<ApiResponse<ActividadesResponse>> {
        return this.http.post<ApiResponse<ActividadesResponse>>(`${this.apiUrl}/listar-actividades`, payload);
    }

    public listarCondiciones(payload: IcomboRequest): Observable<ApiResponse<CondicionesResponse>> {
        return this.http.post<ApiResponse<CondicionesResponse>>(`${this.apiUrl}/listar-condiciones`, payload);
    }

    public listarTipoPersona(payload: IcomboRequest): Observable<ApiResponse<TipoPersonaResponse>> {
        return this.http.post<ApiResponse<TipoPersonaResponse>>(`${this.apiUrl}/listar-tipo-persona`, payload);
    }

    public listarUbigeo(payload: IUbigeoRequest): Observable<ApiResponse<UbigeoResponse>> {
        return this.http.post<ApiResponse<UbigeoResponse>>(`${this.apiUrl}/listar-ubigeo`, payload);
    }
}