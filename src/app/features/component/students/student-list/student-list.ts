import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../../../core/models/student';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../../core/services/student-service';
import { NgFor } from '@angular/common';
import { StudentForm } from '../../../students/student-form/student-form';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-list',
  imports: [RouterModule, NgFor, StudentForm, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showForm = false;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthYear', 'actions'];
  dataSource: Student[] = [];
  isLoading = true;

  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20];
  currentPage = 0;
  totalStudents = 0;

  constructor(private studentService: StudentService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.dataSource = this.studentService.getStudents();
    this.totalStudents = this.dataSource.length;
    this.isLoading = false;
  }

  get pagedStudents(): Student[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  openStudentForm(student?: Student): void {
    const dialogRef = this.dialog.open(StudentForm, {
      width: '700px',
      maxHeight: '90vh',
      data: student
    });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (student) {
        this.studentService.updateStudent(result);
        this.snackBar.open('Student updated successfully!', 'Close', {
          duration: 3000
        });
      } else {
        this.studentService.addStudent(result);
        this.snackBar.open('Student added successfully!', 'Close', {
          duration: 3000
        });
      }
      this.loadStudents();
    }
  });
    
  }

}
