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
    },
    {
      label: 'Operations',
      path: '/operations'
    },
    {
      label: 'Vehicles',
      path: '/vehicles'
    },
  ]
}
