import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student';
import { MockData } from '../utils/mock-data';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students = signal<Student[]>(MockData.generateStudents(25));

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

  updateStudent(updatedStudent: Student): void {
    this.students.update(students => 
      students.map(s => s.id === updatedStudent.id ? updatedStudent : s)
    );
  }

  deleteStudent(id: number): void {
    console.log('Deleting student with ID:', id);
    this.students.update(students => 
      students.filter(s => s.id !== id)
    );
  }

}
