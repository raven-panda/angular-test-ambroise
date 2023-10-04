import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe: DatePipe) {}

  storedData: Array<FormDataInterface> = [];

  /**
   * Add an estate property formdata into the stored data.
   * @param {FormDataInterface} data 
   * @returns *true* or *false*
   */
  setFormData(data: FormDataInterface): boolean {
    let incomingData = data;

    // Formatting the date
    incomingData.dateAchat = this.datePipe.transform(incomingData.dateAchat, 'MM-dd-yyyy');

    // If the name doesn't exist, push the formdata in the stored data
    if(!this.storedData.find(item => item.nom === incomingData.nom)) {
      this.storedData.push(incomingData);
      return true;
    } else {
      return false;
    }
  }

  /**
   * @returns The data stored in the data service in an array.
   */
  getFormData(): Array<FormDataInterface> {

    return this.storedData;
  }

  /**
   * Deletes an estate property formdata from the stored data.
   * @param {string} nom The name of the estate property
   * @param {string} montant The price of the estate property
   * @param {string} date The purchase date of the estate property
   */
  deleteData(nom: string, montant: string, date: string): void {
    let newData = this.storedData.filter(data => !(data.nom === nom && data.montant === montant && data.dateAchat === date));
    this.storedData = newData;
  }

  /**
   * Replace an estate property formdata from the stored data.
   * @param {FormDataInterface} oldData Data object not edited
   * @param {FormDataInterface} newData Data object edited
   * @returns *true*, *false* or *'already-exists'*
   */
  updateData(oldData: FormDataInterface, newData: FormDataInterface): boolean|string {
    if (oldData.nom && oldData.montant && oldData.dateAchat) {

      const matchName = this.storedData.find(item => {
        if (item.nom !== oldData.nom) {
          return item.nom === newData.nom;
        } else {
          return;
        }
      });

      if(!matchName) {
        this.deleteData(oldData.nom, oldData.montant, oldData.dateAchat);

        this.setFormData(newData);
        return true;
      } else {
        return 'already-exists';
      }
    } else {
      return false;
    }
  }
}

export interface FormDataInterface {
  nom: string,
  categorie: string,
  montant: string,
  dateAchat: any,
  loyer?: string|null|undefined
}