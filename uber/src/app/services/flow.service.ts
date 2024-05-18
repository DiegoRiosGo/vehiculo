import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  
  private baseUrl: string = 'https://abcd1234.ngrok.io/proxy';

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
    const url = `${this.flowBaseUrl}/payment/getTransactions`;
    
    // Headers necesarios para autenticar la solicitud
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 5737EF2A-C228-4AA7-AAAE-8F69FC86LF19'
    });

    // Realizar la solicitud GET a la API de Flow
    return this.http.get(url, { headers }).toPromise();
  }


  getStatus(signature: string) {
    const url = 'https://www.flow.cl/api/payment/getStatus';
    const params = { s: signature };

    return this.http.get(url, { params, responseType: 'text' })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        let errorMessage = 'Unexpected error occurred.';
        if (error.status === 400 || error.status === 401) {
          errorMessage = 'Bad request or unauthorized.';
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error: ${error.status} - ${error.error}`;
        }
        throw new Error(errorMessage);
      });
  }
}