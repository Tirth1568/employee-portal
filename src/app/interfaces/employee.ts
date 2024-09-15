export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  empTagNumber: string;
  active: boolean;
}

export interface EmployeeRequest {
  first: number;
  rows: number;
  filter?: {
    name: string;
    id: number;
    email: string;
  };
}

export interface EmployeeResult {
  pageIndex: number;
  pageSize: number;
  records: Employee[];
  totalRecords: number;
}
