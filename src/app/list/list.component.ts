import { Component } from '@angular/core';
import { DataService, FormDataInterface } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private dataService: DataService,
              public dialog: MatDialog) {}

  formData: Array<FormDataInterface> = [];

  ngOnInit() {
    this.formData = this.dataService.getFormData();
    console.log(this.formData);
  }

  deleteRow(row: HTMLElement) {
    let label = row.querySelector('#label')?.textContent;
    let montant = row.querySelector('#montant')?.textContent;
    let dateAchat = row.querySelector('#dateAchat')?.textContent;

    if (label && montant && dateAchat) {
      this.dataService.deleteData(label, montant, dateAchat);
    }

    this.formData = this.dataService.getFormData();
  }

  editRow(row: HTMLElement) {
    this.openDialog();
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La boite est fermée');
    })
  }
}