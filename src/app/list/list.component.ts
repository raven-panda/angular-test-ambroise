import { Component } from '@angular/core';
import { DataService, FormDataInterface } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private dataService: DataService) {}

  formData: Array<FormDataInterface> = [];

  ngOnInit(): void {
    this.formData = this.dataService.getFormData();
  }
}
