import { Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {AdminGuard} from "./core/guards/admin.guard";
import {UserGuard} from "./core/guards/user.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/hero/hero.component').then(c => c.HeroComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.component').then(c => c.SignUpComponent)
  },
  {
    path: 'operations',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/operations/operations.component').then(c => c.OperationsComponent)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'vehicles',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./pages/vehicles/routes').then(r => r.ROUTES),
  },
  {
    path: 'customer',
    canActivate: [AuthGuard, UserGuard],
    loadComponent: () => import('./pages/customer/customer.component').then(c => c.CustomerComponent)
  },
  {
    path: 'employees',
    canActivate: [AuthGuard, AdminGuard],
    loadComponent: () => import('./pages/employees/employees.component').then(c => c.EmployeesComponent)
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./pages/forbidden/forbidden.component').then(c => c.ForbiddenComponent)
  }
];
