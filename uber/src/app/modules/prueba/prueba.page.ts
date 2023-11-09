import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {

  climaData:any;

  constructor(private api:ClimaService) { }

  ngOnInit() {
  }

  obtenerclima(){
    this.api.getclima().subscribe((data)=>{
      this.climaData=data;
    })
  }

  ionViewWillEnterr(){
    this.obtenerclima();
  }
}
