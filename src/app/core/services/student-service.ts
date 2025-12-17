import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students = signal<Student[]>([
    { id: 1, firstName: 'Ana', lastName: 'Novak', birthYear: 2000, email: 'ana@mail.si', address: 'Cesta 12', city: 'Ljubljana' },
  { id: 2, firstName: 'Marko', lastName: 'Kovač', birthYear: 2001, email: 'marko@mail.si', address: 'Ulica 15', city: 'Maribor' },
  { id: 3, firstName: 'Luka', lastName: 'Horvat', birthYear: 1999, email: 'luka@mail.si', address: 'Pot 8', city: 'Celje' },
  { id: 4, firstName: 'Maja', lastName: 'Kralj', birthYear: 2002, email: 'maja@mail.si', address: 'Cesta 22', city: 'Koper' },
  { id: 5, firstName: 'Peter', lastName: 'Žagar', birthYear: 2000, email: 'peter@mail.si', address: 'Ulica 5', city: 'Novo mesto' },
  { id: 6, firstName: 'Irena', lastName: 'Petek', birthYear: 2001, email: 'irena@mail.si', address: 'Pot 17', city: 'Velenje' },
  { id: 7, firstName: 'Bojan', lastName: 'Vidmar', birthYear: 1998, email: 'bojan@mail.si', address: 'Cesta 3', city: 'Ptuj' },
  { id: 8, firstName: 'Nina', lastName: 'Kos', birthYear: 2002, email: 'nina@mail.si', address: 'Ulica 9', city: 'Nova Gorica' },
  { id: 9, firstName: 'Gregor', lastName: 'Oblak', birthYear: 1999, email: 'gregor@mail.si', address: 'Pot 21', city: 'Murska Sobota' },
  { id: 10, firstName: 'Tina', lastName: 'Jereb', birthYear: 2000, email: 'tina@mail.si', address: 'Cesta 7', city: 'Trbovlje' },
  { id: 11, firstName: 'Rok', lastName: 'Kmet', birthYear: 2001, email: 'rok@mail.si', address: 'Ulica 12', city: 'Slovenska Bistrica' },
  { id: 12, firstName: 'Sara', lastName: 'Golob', birthYear: 2002, email: 'sara@mail.si', address: 'Pot 4', city: 'Izola' }
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

  updateStudent(updatedStudent: Student): void {
  this.students.update(students => 
    students.map(s => s.id === updatedStudent.id ? updatedStudent : s)
  );
}
}
