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
    this.storedData.push(this.incomingData);
  }

  getFormData() {
    return this.storedData;
  }
}

export interface FormDataInterface {
  label?: string,
  categorie?: string,
  montant?: string,
  dateAchat?: any,
  loyer?: string
}