import { Injectable, signal } from '@angular/core';
import { Enrollment } from '../models/enrollment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrollments = signal<Enrollment[]>([
    { id: 1, studentId: 1, courseId: 1 },
    { id: 2, studentId: 1, courseId: 3 },
    { id: 3, studentId: 2, courseId: 2 },
    { id: 4, studentId: 2, courseId: 4 },
    { id: 5, studentId: 3, courseId: 1 },
  ]);

  getEnrollments(): Enrollment[] {
    return this.enrollments();
  }

  getEnrollmentsForStudent(studentId: number): Enrollment[] {
    return this.enrollments().filter(e => e.studentId === studentId);
  }

  getEnrollmentsForCourse(courseId: number): Enrollment[] {
    return this.enrollments().filter(e => e.courseId === courseId);
  }

  enrollStudent(studentId: number, courseId: number): Enrollment {
    const newEnrollment: Enrollment = {
      id: this.generateId(),
      studentId,
      courseId
    };
    
    this.enrollments.update(enrollments => [...enrollments, newEnrollment]);
    return newEnrollment;
  }

  unenrollStudent(enrollmentId: number): void {
    this.enrollments.update(enrollments => 
      enrollments.filter(e => e.id !== enrollmentId)
    );
  }

  isStudentEnrolled(studentId: number, courseId: number): boolean {
    return this.enrollments().some(e => 
      e.studentId === studentId && e.courseId === courseId
    );
  }

  private generateId(): number {
    const current = this.enrollments();
    return current.length > 0 ? Math.max(...current.map(e => e.id)) + 1 : 1;
  }

}
