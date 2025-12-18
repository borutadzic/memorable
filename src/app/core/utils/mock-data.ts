// src/app/core/utils/mock-data.ts
import { faker } from '@faker-js/faker';
import { Student } from '../models/student';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';

export class MockData {
  
  static generateStudents(count: number): Student[] {
    const students: Student[] = [];
    
    for (let i = 1; i <= count; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      
      students.push({
        id: i,
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        birthYear: faker.number.int({ min: 1990, max: 2010 }),
        address: faker.location.streetAddress(),
        city: faker.location.city()
      });
    }
    
    return students;
  }
  
  static generateCourses(): Course[] {
    const courses: Course[] = [
      { id: 1, code: 'MAT101', name: 'Mathematics 1', professor: this.generateProfessorName(), credits: 6 },
      { id: 2, code: 'PHY101', name: 'Physics', professor: this.generateProfessorName(), credits: 5 },
      { id: 3, code: 'PRO101', name: 'Programming 1', professor: this.generateProfessorName(), credits: 7 },
      { id: 4, code: 'ENG101', name: 'English', professor: this.generateProfessorName(), credits: 3 },
      { id: 5, code: 'HIS101', name: 'History', professor: this.generateProfessorName(), credits: 4 },
      { id: 6, code: 'CHE101', name: 'Chemistry', professor: this.generateProfessorName(), credits: 5 },
      { id: 7, code: 'BIO101', name: 'Biology', professor: this.generateProfessorName(), credits: 5 },
      { id: 8, code: 'ECO101', name: 'Economics', professor: this.generateProfessorName(), credits: 4 },
      { id: 9, code: 'MAT202', name: 'Mathematics 2', professor: this.generateProfessorName(), credits: 6 },
      { id: 10, code: 'PRO202', name: 'Programming 2', professor: this.generateProfessorName(), credits: 6 }
    ];
    
    return courses;
  }
  
  static generateEnrollments(students: Student[], courses: Course[]): Enrollment[] {
    const enrollments: Enrollment[] = [];
    let enrollmentId = 1;
    
    students.forEach(student => {
      const numCourses = faker.number.int({ min: 1, max: 4 });
      const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numCourses && i < shuffledCourses.length; i++) {
        enrollments.push({
          id: enrollmentId++,
          studentId: student.id,
          courseId: shuffledCourses[i].id
        });
      }
    });
    
    return enrollments;
  }
  
  private static generateProfessorName(): string {
    const titles = ['Prof.', 'Dr.', 'Assoc. Prof.'];
    const title = faker.helpers.arrayElement(titles);
    return `${title} ${faker.person.lastName()}`;
  }
}