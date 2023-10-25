import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DbserviciosService {
  //variable para la coneccion a BD
  public database!: SQLiteObject;

  //variable para la creacion de tablas
  crearDB() {
  //verificar que la plataforma este lista
    this.platform.ready().then(() => {
      //crear la BD
      this.sqlite.create({
        name: 'bdRapp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //llamo la funcion para crear tablas
        this.crearT();
        //usuario admin por default
        this.agregarUsuarioAdminDefault();
      }).catch(e => {
        this.presentAlert("Error al Crear la BD: " + e);
      })
    })
  }
  //variables para insert iniciales

  //observable para las tablas
  
  //observable para la disponibilidad de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false)
  //constructor
  constructor(public sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearDB()
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });
  }


  async crearT() {
    try {
      //ejecutar las variables de creacion de tablas

        //await this.database.executeSql(this.tablarol, []);

      //ejecutar los insert

        //await this.database.executeSql(this.insertrol, [2, "Alumno"]);
      //manipular el observable
      this.isDBReady.next(true);

    } catch (e) {
      await this.presentAlert("ERROR AL CREAR TABLA" + e);
    }

  }
  //FUNCION DE RETORNO DEL OBSERVABLE DE LA BF
  dbState() {
    return this.isDBReady.asObservable();
  }
  //FUNCIONES PARA RETORNAR LOS OBSERVABLES DE LAS TABLAS

  /*fetchHorario(): Observable<Horario[]> {
    return this.listhorarios.asObservable();
  }*/

  crearusuairo(iduser: any, rutusuario: any, nomuser: any, apelluser: any, correo:any, pass: any, rol: any, question: any, answear: any) {
    return this.database.executeSql('INSERT OR IGNORE INTO usuario (idusuario, rut, nombre, apellido, correo, clave, rol, pregunta, respuesta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [iduser, rutusuario, nomuser, apelluser,correo, pass, rol, question])
  }

  //Buscar Horario por alumno o profesor segun el Rut (Ayuda estoy callendo en la locura)

  //login de usuario

  loginVal(correo: string, clave: string): Promise<boolean> {
    return this.platform.ready()
      .then(() => {
        return this.sqlite.create({
          name: 'bdRapp.db',
          location: 'default'
        });
      })
      .then((db) => {
        return db.executeSql(
          `SELECT COUNT(*) as count FROM usuario WHERE correo = ? AND clave = ?`,
          [correo, clave]
        )
        .then((data) => {
          if (data.rows.item(0).count > 0) {
            return true; // Las credenciales son válidas
          } else {
            return false; // Las credenciales no son válidas
          }
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión', error);
        return false;
      });
  }

  //usuario default para iniciar sesion
  agregarUsuarioAdminDefault() {
    // Verificar si el usuario admin ya existe en la base de datos.
    this.database.executeSql(
      'SELECT COUNT(*) as count FROM usuario WHERE rut = ?',
      ['admin']
    ).then((data) => {
      const count = data.rows.item(0).count;
      if (count === 0) {
        // El usuario admin no existe, así que lo insertamos.
        this.crearusuairo(1, 'admin', 'Admin', 'Default', 'admin', 'admin123', 1, 1, 'Respuesta secreta');
      }
    }).catch((error) => {
      console.error('Error al verificar la existencia del usuario admin:', error);
    });
  }
}