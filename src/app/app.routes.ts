import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/demo-components/demo-components.component').then(c => c.DemoComponentsComponent)
  }
];
