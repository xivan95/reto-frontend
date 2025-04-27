import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-confirmacion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>
      <p>{{ data.mensaje }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="confirmar()">
        Confirmar
      </button>
    </mat-dialog-actions>
  `,
})
export class DialogConfirmacionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }
}
