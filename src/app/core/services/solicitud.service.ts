import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { 
    ListarSolicitudesResponse, IListarSolicitudesRequest, ObtenerSolicitudResponse, IObtenerSolicitudRequest, 
    DesistirSolicitudResponse, IDesistirSolicitudRequest, CrearSolicitudResponse, ICrearSolicitudRequest, 
    SolicitudGiroResponse, ISolicitudGiroRequest, RutaAnexoSolicitudResponse, IRutaAnexoSolicitudRequest,
    EditarRepresentanteLegalResponse, GiroPorZonificacionRequest, GiroPorZonificacionResponse, IEditarRepresentanteLegalRequest,
    IPredioRequest, IRepresentanteLegalRequest, IZonificacionRequest, IlistarEstablecimientosRequest,
    PredioResponse, RepresentanteLegalResponse, ZonificacionResponse, listarEstablecimientosResponse,
    IPreguntasXAnexoFuncionRequest, PreguntasXAnexoFuncionResponse,  CodLotePredioResponse, ICodLotePredioRequest,
    SolicitudFinalResponse, ISolicitudFinalRequest, AprobarSolicitudResponse, IAprobarSolicitudRequest,
    IObtenerRutaSolicitudRequest, ObtenerRutaSolicitudResponse
    } from "../interfaz/ISolicitudLicencia";
import { ApiResponse, ApiResponseData } from "../interfaz/ApiResponse";

@Injectable({ providedIn: 'root' })
export class SolicitudService {
    constructor(private http: HttpClient) { }
    private apiUrl = `${environment.apiUrl}/solicitud-licencias`;

    public listarPredios(payload: IPredioRequest): Observable<ApiResponse<PredioResponse>> {
        return this.http.post<ApiResponse<PredioResponse>>(`${this.apiUrl}/listar-predios`, payload);
    }

    public listarGirosPorZonificacion(payload: GiroPorZonificacionRequest): Observable<ApiResponse<GiroPorZonificacionResponse>> {
        return this.http.post<ApiResponse<GiroPorZonificacionResponse>>(`${this.apiUrl}/listar-giros-x-zonificacion`, payload);
    }

    public obtenerRepresentanteLegal(payload: IRepresentanteLegalRequest): Observable<ApiResponse<RepresentanteLegalResponse>> {
        return this.http.post<ApiResponse<RepresentanteLegalResponse>>(`${this.apiUrl}/obtener-representante-legal`, payload);
    }

    public editarRepresentanteLegal(payload: IEditarRepresentanteLegalRequest): Observable<ApiResponse<EditarRepresentanteLegalResponse>> {
        return this.http.post<ApiResponse<EditarRepresentanteLegalResponse>>(`${this.apiUrl}/editar-representante-legal`, payload);
    }

    public listarSolicitudes(payload: IListarSolicitudesRequest): Observable<ApiResponse<ListarSolicitudesResponse>> {
        return this.http.post<ApiResponse<ListarSolicitudesResponse>>(`${this.apiUrl}/listar-solicitudes`, payload);
    }

    public obtenerSolicitud(payload: IObtenerSolicitudRequest): Observable<ApiResponse<ObtenerSolicitudResponse>> {
        return this.http.post<ApiResponse<ObtenerSolicitudResponse>>(`${this.apiUrl}/obtener-solicitud`, payload);
    }

    public desistirSolicitud(payload: IDesistirSolicitudRequest): Observable<ApiResponseData<DesistirSolicitudResponse>> {
        return this.http.post<ApiResponseData<DesistirSolicitudResponse>>(`${this.apiUrl}/desistir-solicitud`, payload);
    }

    public solicitudGiro(payload: ISolicitudGiroRequest): Observable<ApiResponse<SolicitudGiroResponse>> {
        return this.http.post<ApiResponse<SolicitudGiroResponse>>(`${this.apiUrl}/solicitud-giro`, payload);
    }

    public crearSolicitud(payload: ICrearSolicitudRequest): Observable<ApiResponse<CrearSolicitudResponse>> {
        return this.http.post<ApiResponse<CrearSolicitudResponse>>(`${this.apiUrl}/crear-solicitud`, payload);
    }

    public obtenerZonificacion(payload: IZonificacionRequest): Observable<ApiResponse<ZonificacionResponse>> {
        return this.http.post<ApiResponse<ZonificacionResponse>>(`${this.apiUrl}/obtener-zonificacion`, payload);
    }

    public listarEstablecimientos(payload: IlistarEstablecimientosRequest): Observable<ApiResponse<listarEstablecimientosResponse>> {
        return this.http.post<ApiResponse<listarEstablecimientosResponse>>(`${this.apiUrl}/listar-establecimiento`, payload);
    }

    public preguntasXAnexoFuncion(payload: IPreguntasXAnexoFuncionRequest): Observable<ApiResponse<PreguntasXAnexoFuncionResponse>> {
        return this.http.post<ApiResponse<PreguntasXAnexoFuncionResponse>>(`${this.apiUrl}/listar-preguntas`, payload);
    }

    public solicitudFinal(payload: ISolicitudFinalRequest): Observable<ApiResponse<SolicitudFinalResponse>> {
        return this.http.post<ApiResponse<SolicitudFinalResponse>>(`${this.apiUrl}/solicitud-final`, payload);
    }

    public obtenerRutaArchivo(payload: IObtenerRutaSolicitudRequest): Observable<Blob> {
        return this.http.post(`${this.apiUrl}/obtener-ruta-archivo`, payload, {
            responseType: 'blob'
        });
    }

    public aprobarSolicitud(payload: IAprobarSolicitudRequest): Observable<ApiResponse<AprobarSolicitudResponse>> {
        return this.http.post<ApiResponse<AprobarSolicitudResponse>>(`${this.apiUrl}/aprobar-solicitud`, payload);
    }

    generarPdfAnexo(data: any): Observable<Blob> {
        return this.http.post(`${this.apiUrl}/solicitud-licencias/generar-pdf-anexo`, data, {
            responseType: 'blob'
        });
    }

    public rutaAnexoSolicitud(payload: IRutaAnexoSolicitudRequest): Observable<ApiResponse<RutaAnexoSolicitudResponse>> {
        const formData = new FormData();
        formData.append('id_solicitud', payload.id_solicitud);
        formData.append('nro_anexo', payload.nro_anexo);
        formData.append('usuario', payload.usuario);
        formData.append('archivo', payload.archivo);

        return this.http.post<ApiResponse<RutaAnexoSolicitudResponse>>(
            `${this.apiUrl}/ruta-anexo-solicitud`, 
            formData
        );
    }

    public descargarAnexo(numero: number): Observable<HttpResponse<Blob>> {
        return this.http.get(`${this.apiUrl}/descargar-anexo/${numero}`, {
            responseType: 'blob',
            observe: 'response'
        });
    }

    generarAnexoPdf(numero: number, variables: Record<string, any>): Observable<HttpResponse<Blob>> {
        return this.http.post(
            `${this.apiUrl}/generar-anexo-pdf/${numero}`,
            variables,
            {
            observe: 'response',
            responseType: 'blob'
            }
        );
    }

    public listarCodLotePredios(payload: ICodLotePredioRequest): Observable<ApiResponse<CodLotePredioResponse>> {
        return this.http.post<ApiResponse<CodLotePredioResponse>>(`${this.apiUrl}/obtener-cod-lote-y-listar-predios`, payload);
    }
}