import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

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

}
