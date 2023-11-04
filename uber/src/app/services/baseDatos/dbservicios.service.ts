import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Console } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';


// como usar SQLite https://como-programar.net/ionic/sqlite/
@Injectable({
  providedIn: 'root'
})
export class DbserviciosService {
  //variable para la coneccion a BD
  public db!: SQLiteObject;
  
  constructor(public sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearDB()
  }
  //crear la base de datos
  crearDB() {
  //verificar que la plataforma este lista
    this.platform.ready().then(() => {
      //crear la BD
      this.sqlite.create({
        name: 'dbUber.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        alert('database created/opened')
        //llamo la funcion para crear tablas
        this.crearT();
      }).catch(e => {
        this.presentAlert("Error al Crear la BD: " + e);
      })
    })
  }
  
  async crearT() {
    try {
      //ejecutar las variables de creacion de tablas
      await this.db.executeSql('CREATE TABLE IF NOT EXIST usuario (usuarioid INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR (30), apellido VARCHAR (30), correo VARCHAR(50), contraseña VARCHAR(10)), FOREIGN KEY (idpreguntas) REFERENCES (tpreguntas(idpregunta), respuesta VARCHAR(50))', []).then(()=> {
        console.log('Tabla usuario creada con exito')
      }).catch(error => {
        console.error('Error al crear la tabla: ' + JSON.stringify(error));
      });

      await this.db.executeSql('CREATE TABLE IF NOT EXIST tpreguntas (idpreguntas INTEGER PRIMARY KEY AUTOINCREMENT, pregunta VARCHAR(50))', [])

      await this.db.executeSql('CREATE TABLE IF NOT EXIST vehiculo (autoid INTEGER PRIMARY KEY AUTOINCREMENT, patente VARCHAR(6), FOREIGN KEY (userid) REFERENCES (usuario(usuarioid)),asientos NUMBER(10))', []).then(()=>{
        console.log('Tabla vehiculo creada con exito')
      }).catch(error =>{
        console.error('Error al crear la tabla: '+ JSON.stringify(error));
      });

      await this.db.executeSql('CREATE TABLE IF NOT EXIST rol_id (rolid INTEGER PRIMARY KEY AUTOINCREMENT, nomrol VARCHAR(30))', []).then(()=>{
        console.log('Tabla rol creada con exito')
      }).catch(error=>{
        console.error('Error al crear la tabla: ' + JSON.stringify(error));
      })

      await this.db.executeSql('CREATE TABLE IF NOT EXIST')
        //await this.database.executeSql(this.tablarol, []);

      //ejecutar los insert
      await this.db.executeSql('INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES (Administrador, admin@example.com, contrasena_segura, 1)')
        //await this.database.executeSql(this.insertrol, [2, "Alumno"]);
      //manipular el observable
      this.isDBReady.next(true);

    } catch (e) {
      await this.presentAlert("ERROR AL CREAR TABLA" + e);
    }

  }

  //variables para insert iniciales

  //observable para las tablas
  
  //observable para la disponibilidad de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false)
  //constructor
  

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });
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
    return this.db.executeSql('INSERT OR IGNORE INTO usuario (idusuario, rut, nombre, apellido, correo, clave, rol, pregunta, respuesta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [iduser, rutusuario, nomuser, apelluser,correo, pass, rol, question])
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
}