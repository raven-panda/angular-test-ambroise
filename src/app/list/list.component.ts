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
    let nom = row.querySelector('#nom')?.textContent;
    let montant = row.querySelector('#montant')?.textContent;
    let categorie = row.querySelector('#categorie')?.textContent;
    let dateAchat = row.querySelector('#dateAchat')?.textContent;
    let loyer = row.querySelector('#loyer')?.textContent;

    let returnedRow = {
      nom: nom,
      montant: montant,
      categorie: categorie,
      dateAchat: dateAchat,
      loyer: loyer
    }

    return returnedRow;
  }

  editRow(row: HTMLElement) {
    let selectedRow = this.selectRow(row);

    this.openDialog(selectedRow);
  }

  deleteRow(row: HTMLElement) {
    let selectedRow = this.selectRow(row);

    let nom = selectedRow.nom;
    let montant = selectedRow.montant;
    let dateAchat = selectedRow.dateAchat;

    if (nom && montant && dateAchat) {
      this.dataService.deleteData(nom, montant, dateAchat);
    }

    this.formData = this.dataService.getFormData();
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