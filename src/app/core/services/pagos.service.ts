import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { IPagoProformaRequest,PagoProformaResponse } from "../interfaz/IPagosLicencia";
import { ApiResponse } from "../interfaz/ApiResponse";

@Injectable({ providedIn: 'root' })
export class PagosService {
    constructor(private http: HttpClient) { }
    private apiUrl = `${environment.apiUrl}/pagos-licencias`;

    public pagoProforma(payload: IPagoProformaRequest): Observable<ApiResponse<PagoProformaResponse>> {
        return this.http.post<ApiResponse<PagoProformaResponse>>(`${this.apiUrl}/pagar-proforma`, payload);
    }
}