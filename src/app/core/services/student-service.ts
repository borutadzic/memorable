import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students = signal<Student[]>([
    {
      id: 1,
      firstName: 'Ana',
      lastName: 'Novak',
      birthYear: 2000,
      address: 'Cesta 12',
      city: 'Ljubljana',
      email: 'ana@mail.si'
    }
  ]);
    getStudents(): Student[] {
      return this.students();
    }

    addStudent(studentData: Omit<Student, 'id'>): Student {
    const newId = this.generateId();
    const newStudent: Student = {
      ...studentData,
      id: newId
    };
    
    this.students.update(students => [...students, newStudent]);
    return newStudent;
  }

  private generateId(): number {
    const current = this.students();
    return current.length > 0 ? Math.max(...current.map(s => s.id)) + 1 : 1;
  }
}
