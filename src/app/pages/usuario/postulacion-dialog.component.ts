import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-postulacion-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './postulacion-dialog.component.html',
  styleUrls: ['./postulacion-dialog.component.scss'],
})
export class PostulacionDialogComponent {
  nombre: string = '';
  email: string = '';
  cvFile: File | null = null;
  cvBase64: string | null = null;

  constructor(private dialogRef: MatDialogRef<PostulacionDialogComponent>) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file;

      // Convertir a base64 para simular almacenamiento (ya que no tenemos backend)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.cvBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enviarPostulacion() {
    if (!this.nombre.trim() || !this.email.trim() || !this.cvBase64) {
      alert('Por favor, completa todos los campos y adjunta tu CV.');
      return;
    }

    // Retornamos los datos de postulación
    this.dialogRef.close({
      nombre: this.nombre,
      email: this.email,
      cvBase64: this.cvBase64,
    });
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
