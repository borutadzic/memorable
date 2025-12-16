import { Routes } from '@angular/router';
import { StudentList } from './features/component/students/student-list/student-list';

export const routes: Routes = [
    { path: '', component: StudentList },
    { path: 'students', component: StudentList }
];
