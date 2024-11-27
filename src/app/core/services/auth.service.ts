import {inject, Injectable, signal} from '@angular/core';
import { environment } from "../../../environments/environment";
import {LoginDto, SignUpDto} from "../dto/auth-dto";
import {HttpClient} from "@angular/common/http";
import {switchMap, tap} from "rxjs";

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface UserInfo {
  token: string;
  id: number;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  $userInfo = signal<UserInfo>(null);

  setUser(user: UserInfo) {
    this.$userInfo.set(user);
  }

  isAuthenticated() {
    return this.$userInfo();
  }

  login(loginDto: LoginDto) {
    return this.http.post<UserInfo>(`${environment.apiUrl}/public/login`, loginDto)
      .pipe(
        tap((val) => {
          localStorage.setItem('user', JSON.stringify(val));
          this.$userInfo.set(val);
        })
      )
  }

  public signUpCustomer(signUpDto: SignUpDto) {
    return this.http.post<number>(`${environment.apiUrl}/public/api/createCustomer`, signUpDto);
  }

  // public addNewEmployee(signUpDto: SignUpDto) {
  //   return this.http.post<number>(`${environment.apiUrl}/admin/api/createEmployee`, );
  // }
}
