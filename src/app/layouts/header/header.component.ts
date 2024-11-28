import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AuthService, UserRole} from "../../core/services/auth.service";

export interface Routes {
  label: string;
  path: string;
  allowedRoles?: UserRole[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public authService = inject(AuthService);

  routes: Routes[] = [
    {
      label: 'Home',
      path: '/home',
      allowedRoles: [UserRole.USER, UserRole.ADMIN]
    },
    {
      label: 'Operations',
      path: '/operations',
      allowedRoles: [UserRole.USER, UserRole.ADMIN]
    },
    {
      label: 'Vehicles',
      path: '/vehicles',
      allowedRoles: [UserRole.USER]
    },
    {
      label: 'Employees',
      path: '/employees',
      allowedRoles: [UserRole.ADMIN]
    },
    {
      label: 'Profile',
      path: '/customer',
      allowedRoles: [UserRole.USER]
    },
    {
      label: 'Orders',
      path: '/orders',
      allowedRoles: [UserRole.USER, UserRole.ADMIN]
    }
  ]
}
