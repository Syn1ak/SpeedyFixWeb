import {inject, Injectable, signal} from '@angular/core';
import { environment } from "../../../environments/environment";
import {LoginDto, SignUpDto} from "../dto/auth-dto";
import {HttpClient} from "@angular/common/http";
import {switchMap, tap} from "rxjs";
import {Router} from "@angular/router";

export enum UserRole {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN'
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
  private router = inject(Router);
  private http = inject(HttpClient);

  $userInfo = signal<UserInfo>(null);

  hasRoles(allowedRoles: UserRole[]) {
    const userRoles = [this.$userInfo()?.role];
    return allowedRoles.some(role => userRoles.includes(role));
  }

  isUser() {
    return this.$userInfo()?.role === UserRole.USER;
  }

  isAdmin() {
    return this.$userInfo()?.role === UserRole.ADMIN;
  }

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

  logout() {
    localStorage.clear();
    this.$userInfo.set(null);
    return this.router.navigate(['/'])
  }

  public signUpCustomer(signUpDto: SignUpDto) {
    return this.http.post<number>(`${environment.apiUrl}/public/api/createCustomer`, signUpDto);
  }

  // public addNewEmployee(signUpDto: SignUpDto) {
  //   return this.http.post<number>(`${environment.apiUrl}/admin/api/createEmployee`, );
  // }
}
