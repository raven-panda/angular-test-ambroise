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

    if(!this.storedData.find(item => item.label === incomingData.label)) {
      this.storedData.push(incomingData);
      return true;
    } else {
      return false;
    }
  }

  getFormData() {

    return this.storedData;
  }

  deleteData(label: string, montant: string, date: string) {
    let newData = this.storedData.filter(data => !(data.label === label && data.montant === montant && data.dateAchat === date));
    this.storedData = newData;
  }

  updateData(oldData: FormDataInterface, newData: FormDataInterface) {
    if (oldData.label && oldData.montant && oldData.dateAchat) {

      const matchName = this.storedData.find(item => {
        if (item.label !== oldData.label) {
          return item.label === newData.label;
        } else {
          return;
        }
      });

      if(!matchName) {
        this.deleteData(oldData.label, oldData.montant, oldData.dateAchat);

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
  label?: string,
  categorie?: string,
  montant?: string,
  dateAchat?: any,
  loyer?: string
}