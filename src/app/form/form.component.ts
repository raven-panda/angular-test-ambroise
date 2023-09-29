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
    this.dataService.setFormData(form.value);
    
    // Testing the stored data in the service
    this.formData = this.dataService.getFormData();
    console.log(this.formData);
  }
}

