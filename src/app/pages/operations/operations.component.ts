import {Component, inject, OnInit, signal} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {OperationDto} from "../../core/dto/operations-dto";
import {OperationsService} from "./operations.service";
import {take} from "rxjs";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OperationsModalService} from "./operations-modal.service";
import {DisplayEmployeesPipe} from "../../shared/pipes/display-employees.pipe";

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatIcon,
    MatFabButton,
    DisplayEmployeesPipe
  ],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss'
})
export class OperationsComponent implements OnInit {
  private operationsService = inject(OperationsService);
  private operationsModalService = inject(OperationsModalService);

  $operations = signal<OperationDto[]>([]);

  ngOnInit() {
    this.fetchListOfOperations();
  }

  fetchListOfOperations() {
    this.operationsService.getListOfOperations()
      .pipe(take(1))
      .subscribe({
        next: res => this.$operations.set(res)
      });
  }

  book(item: OperationDto) {

  }

  create() {
    this.operationsModalService.create()
      .subscribe(() => this.fetchListOfOperations())
  }

  edit(item: OperationDto) {
    this.operationsModalService.edit(item)
      .subscribe(() => this.fetchListOfOperations())
  }

  delete(item: OperationDto) {
    this.operationsModalService.delete(item)
      .subscribe(() => this.fetchListOfOperations())
  }
}
