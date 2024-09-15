import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from '../../core/shared/shared.module';
import { Lookup } from '../../interfaces/lookup';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [SharedModule,DropdownModule ,CalendarModule ],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css'
})
export class ManageEmployeeComponent {
	form: any;
  employee : any;
	isLoadForm = false;
	countryConfigDetail: any;
	locationCountryCode: any;
	optionList: any;
  departments  : Lookup [] = [];
  designations  : Lookup [] = [];
  minDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 100)); // 100 years ago
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 18));  // 18 years ago
  
	constructor(private config: DynamicDialogConfig , private ref :DynamicDialogRef
     ) {}

	ngOnInit(): void {
		if (this.config.data) {
			this.departments = this.config.data?.departments;
			this.designations = this.config.data?.designations;
			this.employee = this.config.data?.employee;
      if(!!this.employee)
			this.employee.birthDate =new Date(this.employee.birthDate);
		}
		this.createForm();
	}

	createForm() {
		this.form = new FormGroup({
			id: new FormControl(this.employee?.id ?this.employee?.id  : 0  ),
			firstName: new FormControl( this.employee?.firstName , [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
			lastName: new FormControl( this.employee?.lastName,[Validators.required] ),
			email: new FormControl( this.employee?.email , [Validators.required,Validators.email]),
			birthDate: new FormControl( this.employee?.birthDate ,Validators.required),
			departmentId: new FormControl( this.employee?.departmentId,Validators.required ),
			designationId: new FormControl( this.employee?.designationId,Validators.required ),
			empTagNumber: new FormControl( this.employee?.empTagNumber )
		});
		this.isLoadForm = true;
	}


  submitForm(){
    console.log(this.form.value);

        let postDataTemp: any = Object.assign({}, this.form.getRawValue());
        if(!!postDataTemp && postDataTemp.birthDate ){
          postDataTemp.birthDate =  this.formatDate(postDataTemp.birthDate);
        }
        let postData: any = JSON.parse(JSON.stringify(postDataTemp));
        console.log(postData);
        this.ref.close(postData);
        
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure 2 digits
    const day = ('0' + date.getDate()).slice(-2); // Ensure 2 digits
    return `${year}-${month}-${day}`;
  }

  formatDateForDisplay(date: Date): string {
    let dob = new Date(date);
    const year = dob.getFullYear();
    const month = ('0' + (dob.getMonth() + 1)).slice(-2); // Ensure 2 digits
    const day = ('0' + dob.getDate()).slice(-2); // Ensure 2 digits
    return `${day}/${month}/${year}`; // Format as dd/MM/yyyy
  }
}
