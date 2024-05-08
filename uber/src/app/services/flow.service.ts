import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  
  private apiKey = '5737EF2A-C228-4AA7-AAAE-8F69FC86LF19';
  private apiSecret = '66e3eaf21090fceff589659881baa31bbd05d36a';
  private flowBaseUrl = 'https://www.flow.cl/api';

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

  obtenerPagosRecibidos(): Promise<any> {
    // URL de la API de Flow para obtener el listado de pagos recibidos
    const url = 'https://www.flow.cl/api/payment/getPayments';
    
    // Headers necesarios para autenticar la solicitud
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 66e3eaf21090fceff589659881baa31bbd05d36a'
    });

    // Realizar la solicitud GET a la API de Flow
    return this.http.get(url, { headers }).toPromise();
  }

  obtenerPagosRecibidos() {
    const url = 'https://www.flow.cl/api/payment/getPayments';
    const token = 'TU_TOKEN_DE_ACCESO';
  
    // Configura los encabezados de la solicitud
    const headers = {
      Authorization: 'Bearer ' + token
    };
  
    // Realiza la solicitud HTTP utilizando el plugin
    this.http.get(url, {}, headers)
      .then(data => {
        console.log(data.status);
        console.log(data.data); // datos de respuesta como cadena
        console.log(data.headers);
      })
      .catch(error => {
        console.error(error.status);
        console.error(error.error); // datos de error como cadena
        console.error(error.headers);
      });
  }
}