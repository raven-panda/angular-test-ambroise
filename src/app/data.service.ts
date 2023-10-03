import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe: DatePipe) {}

  storedData: Array<FormDataInterface> = [];

  setFormData(data: FormDataInterface) {
    let incomingData = data;

    incomingData.dateAchat = this.datePipe.transform(incomingData.dateAchat, 'MM-dd-yyyy');

    if(!this.storedData.find(item => item.nom === incomingData.nom)) {
      this.storedData.push(incomingData);
      return true;
    } else {
      return false;
    }
  }

  getFormData() {

    return this.storedData;
  }

  deleteData(nom: string, montant: string, date: string) {
    let newData = this.storedData.filter(data => !(data.nom === nom && data.montant === montant && data.dateAchat === date));
    this.storedData = newData;
  }

  updateData(oldData: FormDataInterface, newData: FormDataInterface) {
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
  loyer?: string
}