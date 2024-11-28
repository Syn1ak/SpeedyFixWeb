import { Routes } from '@angular/router';

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
    loadComponent: () => import('./pages/operations/operations.component').then(c => c.OperationsComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./pages/vehicles/routes').then(r => r.ROUTES),
  },
  {
    path: 'customer',
    loadComponent: () => import('./pages/customer/customer.component').then(c => c.CustomerComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./pages/employees/employees.component').then(c => c.EmployeesComponent)
  }
];
