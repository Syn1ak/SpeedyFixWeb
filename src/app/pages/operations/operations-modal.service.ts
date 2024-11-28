import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OperationDto, OperationViewDto} from "../../core/dto/operations-dto";
import {OperationUpsertModalComponent} from "./operation-upsert-modal/operation-upsert-modal.component";
import {of, switchMap} from "rxjs";
import {OperationsService} from "./operations.service";
import {ModalService} from "../../core/services/modals/modal.service";
import {OperationOrderModalComponent} from "./operation-order-modal/operation-order-modal.component";
import {OperationOrdersService} from "../../core/services/operation-orders.service";

@Injectable({
  providedIn: 'root'
})
export class OperationsModalService {
  private operationOrdersService = inject(OperationOrdersService);
  private operationsService = inject(OperationsService);
  private modalService = inject(ModalService);
  private dialog = inject(MatDialog);

  create() {
    return this.generateUpsertModal("Add Operation", null).afterClosed()
      .pipe( // ?? change here
        switchMap((view) => this.operationsService.createOperation(view as unknown as OperationViewDto))
      );
  }

  edit(item: OperationDto) {
    return this.generateUpsertModal("Edit Operation", item).afterClosed()
      .pipe(
        switchMap((view) => {
          const data = {
            id: item.id,
            ...view
          } as OperationViewDto;
          return this.operationsService.updateOperation(data)
        })
      )
  }

  delete(item: OperationDto) {
    return this.modalService.deleteModal({message: `Do you really want to delete ${item.name} operation?`})
      .pipe(switchMap((res) => {
        if (!res) return of(null);
        return this.operationsService.deleteOperation(item.id)
      }))
  }

  book(item: OperationDto) {
    return this.dialog.open(OperationOrderModalComponent, {
        data: { initialModel: item },
        height: '550px',
        width: '550px'
      }
    ).afterClosed()
      .pipe(
        switchMap((view) => this.operationOrdersService.createOperationOrder(view))
      );
  }


  private generateUpsertModal(
    title: string,
    initialModel: OperationDto
  ) {
    return this.dialog.open(OperationUpsertModalComponent, {
        data: { title, initialModel },
        height: '550px',
        width: '550px'
      }
    )
  }
}
