import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {SubmitModalView} from "../../../core/services/modals/modal.service";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubmitModalView
  ) {
  }

  submit() {
    this.dialogRef.close(true);
  }
}
