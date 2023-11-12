import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
//import { Console } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';


// como usar SQLite https://como-programar.net/ionic/sqlite/
@Injectable({
  providedIn: 'root'
})
export class DbserviciosService {
  //variable para la coneccion a BD
  public db!: SQLiteObject;
  public datosUsuario = new BehaviorSubject<any[]>([]);
  public datosRol = new BehaviorSubject<any[]>([]);
  public datosPregunta = new BehaviorSubject<any[]>([]);
  public datosVehiculo = new BehaviorSubject<any[]>([]);
  
  //observable para la disponibilidad de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false)

  //constructor
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
      await this.db.executeSql('CREATE TABLE IF NOT EXIST usuario (usuarioid INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR (30), apellido VARCHAR (30), correo VARCHAR(50), contraseña VARCHAR(10)), FOREIGN KEY (idpreguntas) REFERENCES (tpreguntas(idpregunta), respuesta VARCHAR(50), FOREIGN KEY (rolid) REFERENCES (rol(rolid))', []).then(()=> {
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

      await this.db.executeSql('CREATE TABLE IF NOT EXIST rol (rolid INTEGER PRIMARY KEY, nomrol VARCHAR(30))', []).then(()=>{
        console.log('Tabla rol creada con exito')
      }).catch(error=>{
        console.error('Error al crear la tabla: ' + JSON.stringify(error));
      })

      //await this.db.executeSql('CREATE TABLE IF NOT EXIST')

      //ejecutar los insert iniciales
        //inserts de rol
      await this.db.executeSql('INSERT INTO rol (rolid, nomrol) VALUES (1, Administrador)')
      await this.db.executeSql('INSERT INTO rol (rolid, nomrol) VALUES (2, Alumno)')
      await this.db.executeSql('INSERT INTO rol (rolid, nomrol) VALUES (3, Conductor)')
      
        //insert de preguntas de seguridad
      await this.db.executeSql('INSERT INTO tpreguntas (pregunta) VALUES (¿Cuál es el nombre de tu primer mascota?)')
      await this.db.executeSql('INSERT INTO tpreguntas (pregunta) VALUES (¿En qué ciudad naciste?)')
      await this.db.executeSql('INSERT INTO tpreguntas (pregunta) VALUES (¿Cuál es tu comida favorita?)')
        //insert del usuario Administrador
      await this.db.executeSql('INSERT INTO usuarios (nombre, correo, contrasena, idpregunta, Firulais, rol_id) VALUES (Administrador, admin@example.com, contrasena_segura, 1)')  
      //manipular el observable
      this.isDBReady.next(true);

    } catch (e) {
      await this.presentAlert("ERROR AL CREAR TABLA" + e);
    }

  }
  //observable para las tablas
  loadDataUsuario(){
    this.db.executeSql('SELECT * FROM usuario', [])
      .then(data => {
        let items = [];
        for (let i = 0; i < data.rows.length; i++) {
          items.push(data.rows.item(i));
        }
        this.datosUsuario.next(items);
      })
      .catch(error => {
        console.error('Error al obtener datos: ' + JSON.stringify(error));
      });
  }
  getDataUsuario(): Observable<any[]> {
    return this.datosUsuario.asObservable();
  }
  
  loadDataRol(){
    this.db.executeSql('SELECT * FROM rol', []).then(data => {
      let items = [];
      for (let i = 0; i < data.rows.length; i++){
        items.push(data.rows.item(i));
      }
      this.datosRol.next(items);
    }).catch(error => {
      console.error('Error al obtener datos: ' + JSON.stringify(error));
    });
  }
  getDataRol(): Observable<any[]> {
    return this.datosRol.asObservable();
  }

  loadDataPreguntasec(){
    this.db.executeSql('SELECT * FROM tpreguntas', []).then(data =>{
      let items = [];
      for (let i = 0; i < data.rows.length; i++){
        items.push(data.rows.items(i));
      }
      this.datosPregunta.next(items);
    }).catch(error =>{
      console.error('Error al obtener datos: ' + JSON.stringify(error));
    });
  }
  getDataPreguntasec(): Observable<any[]> {
    return this.datosPregunta.asObservable();
  }




  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });
  }


  
  //FUNCION DE RETORNO DEL OBSERVABLE DE LA BD COMO BOOLEAN 
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