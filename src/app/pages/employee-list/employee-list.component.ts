import { Component, OnInit } from '@angular/core';
import {
  Employee,
  EmployeeRequest,
  EmployeeResult,
} from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LookupService } from '../../services/lookup.service';
import { Lookup } from '../../interfaces/lookup';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    TagModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TagModule,
    RippleModule,
  ],
  providers: [DialogService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  emailFilter = '';
  nameFilter = '';
  idFilter = 0;
  request: EmployeeRequest = {
    first: 0,
    rows: 10,
    filter: {
      name: '',
      id: 0,
      email: '',
    },
  };
  departments: Lookup[] = [];
  designations: Lookup[] = [];

  ref: DynamicDialogRef | undefined;
  constructor(
    private employeeService: EmployeeService,
    private lookupService: LookupService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getDesignations();
  }
  getEmployeeList() {
    this.employeeService
      .getEmployees(this.request)
      .subscribe((data) => (this.employees = data));
  }
  loadEmployees($event: TableLazyLoadEvent) {
    console.log($event);
    this.request.first = $event.first || 0;
    this.getEmployeeList();
  }
  filterEmployee() {
    this.request = {
      ...this.request,
      first: 0,
      filter: {
        name: this.nameFilter,
        id: this.idFilter,
        email: this.emailFilter,
      },
    };
    this.getEmployeeList();
  }

  getDepartments() {
    this.lookupService
      .getDepartments()
      .subscribe((data) => (this.departments = data));
  }
  getDesignations() {
    this.lookupService
      .getDesignations()
      .subscribe((data) => (this.designations = data));
  }
  openAddForm(emp: any = null) {
    this.ref = this.dialogService.open(ManageEmployeeComponent, {
      header: !!emp ? 'Update Employee' : 'Add Employee',
      data: {
        departments: this.departments,
        designations: this.designations,
        employee: emp,
      },
      showHeader: true,
      width: '90vw',
      height: '75vh',
      breakpoints: {
        '960px': '50vw',
        '640px': '90vw',
      },
    });

    this.ref.onClose.subscribe((formData: any) => {
      if (!!formData) {
        if (!!formData.id) {
          this.employeeService.update(formData.id,formData).subscribe((json) => {
            this.employees.records = this.employees.records.map((item: any) =>
              item.id === formData.id ? { ...item, ...json } : item
            );
          });
        } else {
          this.employeeService.add(formData).subscribe((json) => {
            this.employees.a = [...this.employees.records, json]; // Assuming the API returns the created employee as `json`
          });
        }
      }
    });
  }
  delete(id: number) {
    this.employeeService.delete(id).subscribe((json) => {
      this.employees.records = this.employees.records.filter(
        (employee: any) => employee.id !== id
      );
    });
  }
}
