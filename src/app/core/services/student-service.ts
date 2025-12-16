import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    {
      id: 1,
      firstName: 'Ana',
      lastName: 'Novak',
      birthYear: 2000,
      address: 'Cesta 12',
      city: 'Ljubljana',
      email: 'ana@mail.si'
    }
  ];
    getStudents(): Student[] {
      return this.students;
    }
}
