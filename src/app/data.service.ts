import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  storedData: Array<FormDataInterface> = [];

  setFormData(data: object) {
    this.storedData.push(data);
  }

  getFormData() {
    return this.storedData;
  }
}

export interface FormDataInterface {
  label?: string,
  categorie?: string,
  montant?: string,
  dateAchat?: any
}