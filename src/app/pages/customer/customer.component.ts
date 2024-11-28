import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { CustomerDto} from '../../core/dto/auth-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private authService = inject(AuthService);
  customerForm: FormGroup;
  isEditing: boolean = false;
  originalData: CustomerDto | null = null;

  constructor(private customerService: CustomerService) {
    this.customerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(200)]),
      telephoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d{10}')
      ]),
      password: new FormControl('', [Validators.maxLength(255)])
    });
  }

  ngOnInit() {
    this.loadCustomerData();
  }

  private loadCustomerData() {
    const customerId = this.authService.$userInfo()?.id;
    this.customerService.getCustomer(customerId).pipe(take(1)).subscribe({
      next: (customer) => {
        if (customer) {
          this.originalData = customer;
          this.customerForm.patchValue({
            firstName: customer.user.firstName || '',
            lastName: customer.user.lastName || '',
            email: customer.user.email || '',
            telephoneNumber: customer.user.telephoneNumber || '',
            password: customer.user.password || '',
          });
        }
      },
      error: (err) => {
        console.error('Error fetching customer data:', err);
      }
    });
  }

  toggleEdit() {
    this.isEditing = true;
  }

  onSubmit() {
    const form = this.customerForm;
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const updatedCustomer: CustomerDto = {
      id: this.originalData.id,
      user: {
        id: this.originalData.user.id,
        firstName: form.value.firstName || this.originalData?.user.firstName,
        lastName: form.value.lastName || this.originalData?.user.lastName,
        email: form.value.email || this.originalData?.user.email,
        telephoneNumber: form.value.telephoneNumber || this.originalData?.user.telephoneNumber,
        password: this.originalData.user.password
      }
    };


    this.customerService.updateCustomer(updatedCustomer.id, updatedCustomer.user).pipe(take(1)).subscribe({
      next: () => {
        console.log('Profile updated successfully!');
        this.isEditing = false;
        this.originalData = { ...updatedCustomer };
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile.');
      }
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadCustomerData();
  }
}
