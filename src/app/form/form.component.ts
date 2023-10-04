import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {

  constructor(private dataService: DataService) { }

  showForm = false;

  /**
   * Called on the form submit.
   * @param {NgForm} form The formGroup instance with fields value
   */
  onSubmit(form: NgForm): void {
    let addProperty = this.dataService.setFormData(form.value);

    if (addProperty) {
      form.resetForm();
    } else {
      form.controls['nom'].setErrors({'already-exists': true});
    }
  }
}

