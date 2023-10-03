import { Component } from '@angular/core';
import { DataService, FormDataInterface } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  constructor(private dataService: DataService,
              public dialog: MatDialog) {}

  formData: Array<FormDataInterface> = [];

  ngOnInit() {
    this.formData = this.dataService.getFormData();
  }

  selectRow(row: HTMLElement) {
    let label = row.querySelector('#label')?.textContent;
    let montant = row.querySelector('#montant')?.textContent;
    let categorie = row.querySelector('#categorie')?.textContent;
    let dateAchat = row.querySelector('#dateAchat')?.textContent;
    let loyer = row.querySelector('#loyer')?.textContent;

    let returnedRow = {
      label: label,
      montant: montant,
      categorie: categorie,
      dateAchat: dateAchat,
      loyer: loyer
    }

    return returnedRow;
  }

  deleteRow(row: HTMLElement) {
    let selectedRow = this.selectRow(row);

    let label = selectedRow.label;
    let montant = selectedRow.montant;
    let dateAchat = selectedRow.dateAchat;

    if (label && montant && dateAchat) {
      this.dataService.deleteData(label, montant, dateAchat);
    }

    this.formData = this.dataService.getFormData();
  }

  editRow(row: HTMLElement) {
    let selectedRow = this.selectRow(row);

    this.openDialog(selectedRow);
  }

  openDialog(row: object) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: row
    });

    dialogRef.afterClosed().subscribe(() => {
      this.formData = this.dataService.getFormData();
    })
  }
}