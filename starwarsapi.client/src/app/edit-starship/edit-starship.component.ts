import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Starship } from '../models/starship.model';
import { StarshipService } from '../services/starship.service';

@Component({
  selector: 'app-edit-starship',
  standalone: false,
  templateUrl: './edit-starship.component.html',
  styleUrls: ['./edit-starship.component.css']
})
export class EditStarshipComponent {
  isSaving = false;

  constructor(
    public dialogRef: MatDialogRef<EditStarshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Starship,
    private starshipService: StarshipService
  ) {
    this.dialogRef.disableClose = true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.isSaving = true;
    if (!this.data.id) {
      // Create new starship
      this.starshipService.createStarship(this.data).subscribe({
        next: (created) => this.dialogRef.close(created),
        error: () => this.isSaving = false
      });
    } else {
      // Update existing starship
      this.starshipService.updateStarship(this.data.id, this.data).subscribe({
        next: () => this.dialogRef.close(this.data),
        error: () => this.isSaving = false
      });
    }
  }

  onDelete(): void {
    if (!confirm("Are you sure you want to delete this starship?"))
      return;

    this.starshipService.deleteStarship(this.data.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.isSaving = false
    });
  }
}
