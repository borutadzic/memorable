import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../core/models/student';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../../core/services/student-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [RouterModule, NgFor],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthYear', 'actions'];
  dataSource: Student[] = [];
  isLoading = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.dataSource = this.studentService.getStudents();
    this.isLoading = false;
  }

}
