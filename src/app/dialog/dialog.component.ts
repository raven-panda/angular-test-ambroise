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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  dateAchatFormatted: Date = new Date(this.data.dateAchat);
  oldData: FormDataInterface = Object.assign({}, this.data);

  onSubmit(form: NgForm) {
    let updateResult = this.dataService.updateData(this.oldData, form.value);

    if (updateResult === true) {
      this.dialog.close(updateResult);
    } else if (updateResult === 'already-exists') {
      form.controls['label'].setErrors({'already-exists': true});
    } else {
      form.controls['label'].setErrors({'exception': true});
    }
  }
}