import { Component } from '@angular/core';
import { DbserviciosService } from './services/baseDatos/dbservicios.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dbService: DbserviciosService) {}
  
  ngOnInit() {
    // Initialize the database when the app starts
    this.dbService.initDatabase().then(() => {
      console.log('Database initialized successfully');
    }).catch(error => {
      console.error('Error initializing database:', error);
    });

    this.syncDataToFirebase();
  }

  // Función para sincronizar datos con Firebase
  syncDataToFirebase() {
    // Aquí llamas a la función que sincroniza los datos con Firebase
    // Por ejemplo:
    this.dbService.syncDataToFirebase().then(() => {
      console.log('Datos sincronizados con Firebase');
    }).catch(error => {
      console.error('Error al sincronizar datos con Firebase:', error);
    });
  }
}
