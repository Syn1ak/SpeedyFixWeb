import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {StoService} from "../../core/services/sto.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  tires: string | null = null;

  constructor(private stoService: StoService) {}

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
