import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course';
import { MockData } from '../utils/mock-data';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses = signal<Course[]>(MockData.generateCourses());

  getCourses(): Course[] {
    return this.courses();
  }

  getCourse(id: number): Course | undefined {
    return this.courses().find(c => c.id === id);
  }
  
}
