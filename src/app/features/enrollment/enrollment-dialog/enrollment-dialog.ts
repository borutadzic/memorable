import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../core/models/student';
import { Course } from '../../../core/models/course';
import { CourseService } from '../../../core/services/course-service';
import { EnrollmentService } from '../../../core/services/enrollment-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollment-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatListModule, MatIconModule, MatSelectModule
  ],
  templateUrl: './enrollment-dialog.html',
  styleUrls: ['./enrollment-dialog.scss']
})
export class EnrollmentDialogComponent {
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private dialogRef = inject(MatDialogRef<EnrollmentDialogComponent>);
  private snackBar = inject(MatSnackBar);

  student: Student;
  allCourses: Course[] = [];
  enrolledCourses: Course[] = [];
  availableCourses: Course[] = [];
  
  selectedCourseId: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { student: Student }) {
    this.student = data.student;
    this.loadData();
  }

  loadData(): void {
    this.allCourses = this.courseService.getCourses();
    
    const enrollments = this.enrollmentService.getEnrollmentsForStudent(this.student.id);
    const enrolledCourseIds = enrollments.map(e => e.courseId);
    this.enrolledCourses = this.allCourses.filter(c => enrolledCourseIds.includes(c.id));
    
    this.availableCourses = this.allCourses.filter(c => !enrolledCourseIds.includes(c.id));
  }

  enrollStudent(): void {
    if (this.selectedCourseId) {
      const course = this.courseService.getCourse(this.selectedCourseId);
      
      if (course) {
        this.enrollmentService.enrollStudent(this.student.id, this.selectedCourseId);
        
        this.snackBar.open(
          `Enrolled in ${course.code} - ${course.name}`, 
          'Close', 
          {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          }
        );
        
        this.loadData(); 
        this.selectedCourseId = null;
      }
    }
  }

  unenrollStudent(courseId: number): void {
    const course = this.courseService.getCourse(courseId);
    const enrollment = this.enrollmentService.getEnrollmentsForStudent(this.student.id)
      .find(e => e.courseId === courseId);
    
    if (enrollment && course) {
      this.enrollmentService.unenrollStudent(enrollment.id);
      
      this.snackBar.open(
        `Removed from ${course.code} - ${course.name}`, 
        'Close', 
        {
          duration: 3000,
          panelClass: ['warning-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
      
      this.loadData();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}