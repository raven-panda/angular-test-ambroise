import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService, FormDataInterface } from '../data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(private dataService: DataService,
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDataInterface) {}

  dateAchatFormatted: Date = new Date(this.data.dateAchat);
  oldData: FormDataInterface = Object.assign({}, this.data);

  /**
   * Called on the form submit.
   * @param {NgForm} form The formGroup instance with fields value
   */
  onSubmit(form: NgForm): void {
    let updateResult = this.dataService.updateData(this.oldData, form.value);

    if (updateResult === true) {
      form.resetForm();
      this.dialog.close();
    } else if (updateResult === 'already-exists') {
      form.controls['nom'].setErrors({'already-exists': true});
    } else {
      form.controls['nom'].setErrors({'exception': true});
    }
  }
}