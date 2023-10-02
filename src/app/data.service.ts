import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe: DatePipe) {}

  incomingData: FormDataInterface = {};
  storedData: Array<FormDataInterface> = [];

  setFormData(data: object) {
    this.incomingData = data;
    this.incomingData.dateAchat = this.datePipe.transform(this.incomingData.dateAchat, 'MM-dd-yyyy');

    if(!this.storedData.find(item => item.label === this.incomingData.label)) {
      this.storedData.push(this.incomingData);
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
}

export interface FormDataInterface {
  label?: string,
  categorie?: string,
  montant?: string,
  dateAchat?: any,
  loyer?: string
}