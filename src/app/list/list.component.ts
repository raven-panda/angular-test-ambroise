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

  ngOnInit(): void {
    this.formData = this.dataService.getFormData();
  }

  /**
   * Take the HTML element of a row and put its cells text content into an object.
   * @param {HTMLElement} row HTML Element of the selected row.
   * @returns An object of row's value
   */
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

  /**
   * Calls the openDialog method with the object of the selected row as parameter.
   * @param {HTMLElement} row HTML Element of the selected row.
   */
  editRow(row: HTMLElement): void {
    let selectedRow = this.selectRow(row);

    this.openDialog(selectedRow);
  }

  /**
   * Calls the data service to delete the formdata of the selected estate property.
   * @param {HTMLElement} row HTML Element of the selected row.
   */
  deleteRow(row: HTMLElement): void {
    let selectedRow = this.selectRow(row);

    let nom = selectedRow.nom;
    let montant = selectedRow.montant;
    let dateAchat = selectedRow.dateAchat;

    if (nom && montant && dateAchat) {
      this.dataService.deleteData(nom, montant, dateAchat);
    }

    // Refresh formdata
    this.formData = this.dataService.getFormData();
  }

  /**
   * - Opens the dialog box, and send the row object as data to display in the form.
   * - Refreshes the formData property after the dialog was closed.
   * @param {object} row The selected row to be edited.
   */
  openDialog(row: object): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: row
    });

    dialogRef.afterClosed().subscribe(() => {
      this.formData = this.dataService.getFormData();
    })
  }
}