import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService, FormDataInterface } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {

  constructor(private dataService: DataService) { }

  formData: Array<FormDataInterface> = [];
  showForm = false;

  onSubmit(form: NgForm) {
    let addProperty = this.dataService.setFormData(form.value);

    if (!addProperty) {
      form.controls['label'].setErrors({'already-exists': true});
    }
  }

}

