import { inject, Injectable, signal } from '@angular/core';
import { Enrollment } from '../models/enrollment';
import { StudentService } from './student-service';
import { CourseService } from './course-service';
import { MockData } from '../utils/mock-data';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);

  private enrollments = signal<Enrollment[]>([]);

  constructor() {
    this.initializeEnrollments();
  }

  private initializeEnrollments(): void {
    const students = this.studentService.getStudents();
    const courses = this.courseService.getCourses();
    
    const initialEnrollments = MockData.generateEnrollments(students, courses);
    
    this.enrollments.set(initialEnrollments);
    
  }

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
