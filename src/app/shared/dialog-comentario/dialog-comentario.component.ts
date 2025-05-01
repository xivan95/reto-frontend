import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-comentario',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './dialog-comentario.component.html',
  styleUrls: ['./dialog-comentario.component.scss'],
})
export class DialogComentarioComponent {
  comentario: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(null);
  }

  enviar(): void {
    this.dialogRef.close(this.comentario);
  }
}
