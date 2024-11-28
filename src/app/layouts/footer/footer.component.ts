import {Component, OnInit} from '@angular/core';
import {StoDto} from "../../core/dto/auth-dto";
import {StoService} from "../../core/services/sto.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  stoInfo: StoDto | null = null;

  constructor(private stoService: StoService) {}

  ngOnInit() {
    this.loadStoStatus();
  }

  loadStoStatus() {
    this.stoService.checkStoStatus().subscribe({
      next: (data: StoDto) => {
        this.stoInfo = data;
      },
      error: (err) => {
        console.error('Error loading STO status:', err);
      }
    });
  }
}
