import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  
  formData: Object = {};

  showForm = false;

  onSubmit() {
    console.log('submit');
  }
}

