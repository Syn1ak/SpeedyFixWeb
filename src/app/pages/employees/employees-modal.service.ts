import {inject, Injectable} from '@angular/core';
import {ModalService} from "../../core/services/modals/modal.service";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "./employee.service";
import {of, switchMap} from "rxjs";
import {EmployeeDto, EmployeeViewDto} from "../../core/dto/employees-dto";
import {EmployeesUpsertComponent} from "./employees-upsert/employees-upsert.component";

@Injectable({
  providedIn: 'root'
})
export class EmployeesModalService {
  private employeesService = inject(EmployeeService);
  private modalService = inject(ModalService);
  private dialog = inject(MatDialog);

  create() {
    return this.generateUpsertModal("Add Employee", null).afterClosed()
      .pipe(
        switchMap((view) => {
          if (!view) return of(null);
          return this.employeesService.createEmployee(view)
        })
      );
  }

  edit(item: EmployeeViewDto) {
    return this.generateUpsertModal("Edit Employee", item).afterClosed()
      .pipe(
        switchMap((view) => {
          if (!view) return of(null);
          return this.employeesService.updateEmployee(view)
        })
      )
  }

  delete(item: EmployeeDto) {
    return this.modalService.deleteModal({message: `Do you really want to delete ${item.user.firstName + " " + item.user.lastName} employee?`})
      .pipe(switchMap((res) => {
        if (!res) return of(null);
        return this.employeesService.deleteEmployee(item.id)
      }))
  }


  private generateUpsertModal(
    title: string,
    initialModel: EmployeeViewDto
  ) {
    return this.dialog.open<any, any, EmployeeViewDto>(EmployeesUpsertComponent, {
        data: {title, initialModel},
        height: '550px',
        width: '600px'
      }
    )
  }
}
