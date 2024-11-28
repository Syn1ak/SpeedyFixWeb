import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {StoService} from "../../core/services/sto.service";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public authService = inject(AuthService);
  private stoService = inject(StoService);
  tires: string;

  ngOnInit() {
    this.loadStoStatus();
  }

  loadStoStatus() {
    this.stoService.getTemperature().subscribe({
      next: (data: string) => {
        this.tires = data;
      },
      error: (err) => {
        console.error('Error loading tires recommendation:', err);
      }
    });
  }
}
