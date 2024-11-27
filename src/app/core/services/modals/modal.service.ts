import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteModalComponent} from "../../../shared/modals/delete-modal/delete-modal.component";

export interface SubmitModalView {
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialog = inject(MatDialog);

  deleteModal(config: { message: string }) {
    const ref = this.dialog.open<any, SubmitModalView, boolean>(DeleteModalComponent, {
      data: {
        message: config.message,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
      }
    })
    return ref.afterClosed();
  }
}
