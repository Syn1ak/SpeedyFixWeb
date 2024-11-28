import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatTabGroup, MatTab } from "@angular/material/tabs";
import {
  OperationOrderDto,
  OperationOrderFullViewDto,
  OperationOrderStatusType
} from "../../core/dto/operation-order-dto";
import { AuthService } from "../../core/services/auth.service";
import { ModalService } from "../../core/services/modals/modal.service";
import { of, switchMap, take } from "rxjs";
import { HistoryService } from "./history.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatTabGroup,
    MatTab,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private authService = inject(AuthService);
  private historyService = inject(HistoryService);
  private modalService = inject(ModalService);

  $orders = signal<{ [status: string]: OperationOrderDto[] }>({});
  $statuses = Object.keys(OperationOrderStatusType).map(key => ({
    value: key,
    label: key
  }));
  $loading = signal<{ [status: string]: boolean }>({});

  isAdmin = this.authService.isAdmin();

  ngOnInit() {
    if (this.$statuses.length > 0) {
      this.fetchOrdersByStatus(this.$statuses[0].value);
    }
  }

  fetchOrdersByStatus(status: string) {
    if (this.$orders()[status]) return;

    this.$loading.update(val => ({ ...val, [status]: true }));
    const userId = this.authService.$userInfo()?.id;
    const isAdmin = this.authService.$userInfo()?.role === 'ROLE_ADMIN';

    const request = isAdmin
      ? this.historyService.findAllByStatus(status)
      : this.historyService.findAllByStatusAndCustomerId(status, userId);
    request.pipe(take(1)).subscribe({
      next: orders => {
        this.$orders.update(val => ({ ...val, [status]: orders }));
        this.$loading.update(val => ({ ...val, [status]: false }));
      },
      error: (err) => {
        this.$loading.update(val => ({ ...val, [status]: false }));
      }
    });
  }

  cancelOrder(order: OperationOrderDto) {
    this.historyService.changeStatusOfOperation(order.id, OperationOrderStatusType.CANCELLED).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error cancelling order', err);
      }
    });
  }



  editOrder(order: OperationOrderDto) {
    // Логіка для редагування замовлення (можливо, виклик модального вікна для редагування)
    console.log('Editing order:', order);
    //this.modalService.openEditOrderModal(order); // Викликаємо модальне вікно редагування
  }
}
