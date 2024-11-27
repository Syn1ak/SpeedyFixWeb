import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./layouts/header/header.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return;
    const user = JSON.parse(userJson);
    this.authService.setUser(user);
  }
}
