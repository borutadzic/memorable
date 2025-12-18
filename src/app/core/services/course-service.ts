import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses = signal<Course[]>([
    { id: 1, code: 'MAT101', name: 'Mathematics 1', professor: 'Prof. Novak', credits: 6 },
    { id: 2, code: 'PHY101', name: 'Physics', professor: 'Prof. Kovač', credits: 5 },
    { id: 3, code: 'PRO101', name: 'Programming 1', professor: 'Prof. Horvat', credits: 7 },
    { id: 4, code: 'ENG101', name: 'English', professor: 'Prof. Smith', credits: 3 },
    { id: 5, code: 'HIS101', name: 'History', professor: 'Prof. Žagar', credits: 4 },
    { id: 6, code: 'CHE101', name: 'Chemistry', professor: 'Prof. Kralj', credits: 5 },
    { id: 7, code: 'BIO101', name: 'Biology', professor: 'Prof. Petek', credits: 5 },
    { id: 8, code: 'ECO101', name: 'Economics', professor: 'Prof. Vidmar', credits: 4 }
  ]);

  getCourses(): Course[] {
    return this.courses();
  }

  getCourse(id: number): Course | undefined {
    return this.courses().find(c => c.id === id);
  }
  
}
