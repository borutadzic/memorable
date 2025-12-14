import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  isLoading = input.required<boolean>();
  message = input<string>('');
}
