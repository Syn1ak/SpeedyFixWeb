import {inject, Injectable, signal} from '@angular/core';
import { environment } from "../../../environments/environment";
import {LoginDto, SignUpDto} from "../dto/auth-dto";
import {HttpClient} from "@angular/common/http";
import {switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  $token = signal<string>(null);

  login(loginDto: LoginDto) {
    return this.http.post<string>(`${environment.apiUrl}/public/login`, loginDto)
      .pipe(
        tap((token) => this.$token.set(token))
      )
  }

  private signUp(signUpDto: SignUpDto) {
    return this.http.post<number>(`${environment.apiUrl}/public/api/user`, signUpDto)
  }

  public signUpCustomer(signUpDto: SignUpDto) {
    return this.signUp(signUpDto)
      .pipe(
        switchMap(id => this.createCustomer(id))
      );
  }

  public addNewEmployee(signUpDto: SignUpDto) {
    return this.signUp(signUpDto)
      .pipe(
        switchMap(id => this.createEmployee(id))
      );
  }

  private createEmployee(id: number) {
    return this.http.post<number>(`${environment.apiUrl}/admin/api/employee`, { userId: id });
  }

  private createCustomer(id: number) {
    return this.http.post<number>(`${environment.apiUrl}/public/api/customer`, { userId: id });
  }
}
