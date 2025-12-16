import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../core/models/student';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../../core/services/student-service';
import { NgFor } from '@angular/common';
import { StudentForm } from '../../../students/student-form/student-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  imports: [RouterModule, NgFor, StudentForm],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  showForm = false;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthYear', 'actions'];
  dataSource: Student[] = [];
  isLoading = true;

  constructor(private studentService: StudentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.dataSource = this.studentService.getStudents();
    this.isLoading = false;
  }

  openStudentForm(): void {
    const dialogRef = this.dialog.open(StudentForm, {
      width: '700px',
      maxHeight: '90vh'
    });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Student added:', result);
      this.loadStudents();
    }

    const newStudent = this.studentService.addStudent(result);
    this.dataSource = this.studentService.getStudents();
  });
    
  }

}
