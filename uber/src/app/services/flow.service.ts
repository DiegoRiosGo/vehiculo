import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  
  private apiKey = '5737EF2A-C228-4AA7-AAAE-8F69FC86LF19';
  private apiSecret = '66e3eaf21090fceff589659881baa31bbd05d36a';
  private flowBaseUrl = 'https://sandbox.flow.cl/api';

  constructor(private http: HttpClient) {}

  makePayment(paymentData: any) {
    const url = `${this.flowBaseUrl}/payment/create`;

    return this.http.post(url, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${this.apiKey}:${this.apiSecret}`)}`
      }
    });
  }
}