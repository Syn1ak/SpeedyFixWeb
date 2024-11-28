import {Component, inject, OnInit, signal} from '@angular/core';
import {DisplayEmployeesPipe} from "../../shared/pipes/display-employees.pipe";
import {MatButton, MatFabButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {EmployeeService} from "./employee.service";
import {take} from "rxjs";
import {EmployeesModalService} from "./employees-modal.service";
import {EmployeeDto, EmployeeViewDto} from "../../core/dto/employees-dto";
import {LocalizeEmployeeTypePipe} from "../../shared/pipes/localize-employee-type.pipe";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    DisplayEmployeesPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFabButton,
    MatIcon,
    LocalizeEmployeeTypePipe
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  private employeesService = inject(EmployeeService);
  private employeesModalService = inject(EmployeesModalService);

  $employees = signal<EmployeeDto[]>([]);

  ngOnInit() {
    this.fetchListOfOfEmployees()
  }

  fetchListOfOfEmployees() {
    this.employeesService.getListOfOfEmployees()
      .pipe(take(1))
      .subscribe({
        next: res => this.$employees.set(res)
      });
  }

  create() {
    this.employeesModalService.create()
      .subscribe((val) => {
        if (!val) return;
        this.fetchListOfOfEmployees();
      })
  }

  edit(item: EmployeeDto) {
    const { id, user, type, position} = item;
    const view: EmployeeViewDto = {
      employee: {
        id,
        type,
        position
      },
      user
    }
    this.employeesModalService.edit(view)
      .subscribe((val) => {
        if (!val) return;
        this.fetchListOfOfEmployees();
      })
  }

  delete(item: EmployeeDto) {
    this.employeesModalService.delete(item)
      .subscribe((val) => {
        if (!val) return;
        this.fetchListOfOfEmployees();
      })
  }
}
