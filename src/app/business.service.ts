// business.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  uri = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    this.http
      .post(`${this.uri}/api/v1/business`, obj)
      .subscribe(res => console.log("Done"));
  }
  getBusinesses() {
    return this.http.get(`${this.uri}/api/v1/business`);
  }
  editBusiness(id) {
    return this.http.get(`${this.uri}/api/v1/business/${id}`);
  }
  updateBusiness(person_name, business_name, business_gst_number, id) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    this.http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log("Done"));
  }
}
