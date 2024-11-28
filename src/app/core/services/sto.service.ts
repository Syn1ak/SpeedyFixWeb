import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StoDto} from "../dto/auth-dto";

@Injectable({
  providedIn: 'root'
})
export class StoService {
  private http = inject(HttpClient);

  checkStoStatus() {
    return this.http.get<StoDto>(`${environment.apiUrl}/public/api/info`);
  }

  getTemperature() {
    return this.http.get<string>(`${environment.apiUrl}/public/api/temperature`,{ responseType: 'text' as 'json' });
  }
}
