import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
//import { Console } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';
import { Tpreguntas } from '../models/tpreguntas';
import { Vehiculo } from '../models/vehiculo';
import { Viaje } from '../models/viaje';
import { Detalle } from '../models/detalle';

// como usar SQLite https://como-programar.net/ionic/sqlite/
@Injectable({
  providedIn: 'root'
})
export class DbserviciosService {
  //variable para la coneccion a BD
  public db!: SQLiteObject;
  public datosUsuario = new BehaviorSubject<Usuario[]>([]);
  public datosRol = new BehaviorSubject([]);
  public datosPregunta = new BehaviorSubject<Tpreguntas[]>([]);
  public datosVehiculo = new BehaviorSubject<Vehiculo[]>([]);
  public datosViaje = new BehaviorSubject<Viaje[]>([])
  public datosDetalle = new BehaviorSubject<Detalle[]>([])
  

  //variables creacion de tablas prueba rol

  //tabla creada
  tablarol: string = "CREATE TABLE IF NOT EXIST rol (id INTEGER PRIMARY KEY autoincrement, nomrol VARCHAR(30) NOT NULL);";

  //ingreso a tabla
  registrorol: string = "INSERT or IGNORE INTO rol (id, nomrol) VALUES (1, 'Administrador');";
  /*
  await this.db.executeSql('CREATE TABLE IF NOT EXIST rol (rolid INTEGER PRIMARY KEY autoincrement, nomrol VARCHAR(30))', []).then(()=>{
        console.log('Tabla rol creada con exito')
      }).catch(error=>{
        console.error('Error al crear la tabla: ' + JSON.stringify(error));
      }) 

  //inserts de rol
      //revisar si fallla
      await this.db.executeSql('INSERT or IGNORE INTO rol (rolid, nomrol) VALUES (1, \'Administrador\');',[]);
      await this.db.executeSql('INSERT or IGNORE INTO rol (rolid, nomrol) VALUES (2, \'Alumno\');',[]);
  */

  //variable para manipulación del estatus de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //constructor
  constructor(public sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearDB()
  }

  //funciones para subscribirme al observable
  dbState(){
    return this.isDBReady.asObservable();
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
  getDataUsuario(): Observable<Usuario[]> {
    return this.datosUsuario.asObservable();
  }
  
  agregarUsuario(usuario: Usuario) {
    const { nombre, apellido, correo, contrasena, preguntaS, respuesta, rol, imagen } = usuario;
    this.db.executeSql('INSERT INTO usuario (nombre, apellido, correo, contrasena, idpreguntas, respuesta, rolid, imagenperfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, correo, contrasena, preguntaS, respuesta, rol, imagen])
      .then(() => {
        console.log('Usuario agregado con éxito');
        this.loadDataUsuario(); // Recargar datos después de la inserción
      })
      .catch(error => {
        console.error('Error al agregar usuario: ' + JSON.stringify(error));
      });
  }

  modificarUsuario(usuario: Usuario) {
    const { id_usuario, nombre, apellido, correo, contrasena, preguntaS, respuesta, rol, imagen } = usuario;
    this.db.executeSql('UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, idpreguntas = ?, respuesta = ?, rolid = ?, imagenperfil = ? WHERE usuarioid = ?',
      [nombre, apellido, correo, contrasena, preguntaS, respuesta, rol, imagen, id_usuario])
      .then(() => {
        console.log('Usuario modificado con éxito');
        this.loadDataUsuario(); // Recargar datos después de la modificación
      })
      .catch(error => {
        console.error('Error al modificar usuario: ' + JSON.stringify(error));
      });
  }


//-------------------------------------------------------------

// Función para cargar datos de la tabla "rol"

getDataRol(): Observable<Rol[]> {
  return this.datosRol.asObservable();
}


//revisar si fallla
  loadDataRol(){
    return this.db.executeSql('SELECT * FROM rol',[]).then(res=>{
      //variable para almacenar la consulta
      let items: Rol[] = [];
      //validar si existen registros
      if(res.rows.length > 0){
        //procedo a recorrer y guardar
        for(var i=0; i<res.rows.length; i++){
          //agrego los datos a mi variable
          items.push({
            id: res.rows.item(i).id,
            nom_rol: res.rows.item(i).nom_rol,
          })
        }
      }
      //actualizar mi observable
      this.datosRol.next(items as any);
    }).catch(e=>{
      this.presentAlert("Error en cargar Rol: " + e);
    })
  }
  // Función para agregar un vehículo a la tabla "vehiculo"
agregarRol(Rol: Rol) {
  const { id, nom_rol } = Rol;
  this.db.executeSql('INSERT INTO Rol (id, nom_rol) VALUES (?, ?)',
    [id, nom_rol])
    .then(() => {
      console.log('Rol agregado con éxito');
      this.loadDataRol(); // Recargar datos después de la inserción
    })
    .catch(error => {
      console.error('Error al agregar Rol: ' + JSON.stringify(error));
    });
}

// Función para modificar un vehículo en la tabla "vehiculo"
modificarRol(Rol: Rol) {
  const { id, nom_rol } = Rol;
  this.db.executeSql('UPDATE vehiculo SET Rol = ?, id = ?, nom_rol = ? WHERE id = ?',
    [id, nom_rol])
    .then(() => {
      console.log('Rol modificado con éxito');
      this.loadDataRol(); // Recargar datos después de la modificación
    })
    .catch(error => {
      console.error('Error al modificar Rol: ' + JSON.stringify(error));
    });
}

//--------------------------------------------------

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

  getDataPreguntasec(): Observable<Tpreguntas[]> {
    return this.datosPregunta.asObservable();
  }


//-------------------------------------------------------------

// Función para cargar datos de la tabla "vehiculo"
loadDataVehiculo() {
  this.db.executeSql('SELECT * FROM vehiculo', []).then(data => {
    let items = [];
    for (let i = 0; i < data.rows.length; i++) {
      items.push(data.rows.item(i));
    }
    this.datosVehiculo.next(items);
  }).catch(error => {
    console.error('Error al obtener datos de vehiculo: ' + JSON.stringify(error));
  });
}

// Función para obtener datos de la tabla "vehiculo" como Observable
getDataVehiculo(): Observable<Vehiculo[]> {
  return this.datosVehiculo.asObservable();
}

// Función para agregar un vehículo a la tabla "vehiculo"
agregarVehiculo(vehiculo: Vehiculo) {
  const { patente, usuario, asientos } = vehiculo;
  this.db.executeSql('INSERT INTO vehiculo (patente, usuario, asientos) VALUES (?, ?, ?)',
    [patente, usuario, asientos])
    .then(() => {
      console.log('Vehículo agregado con éxito');
      this.loadDataVehiculo(); // Recargar datos después de la inserción
    })
    .catch(error => {
      console.error('Error al agregar vehículo: ' + JSON.stringify(error));
    });
}

// Función para modificar un vehículo en la tabla "vehiculo"
modificarVehiculo(vehiculo: Vehiculo) {
  const { idvehiculo, patente, usuario, asientos } = vehiculo;
  this.db.executeSql('UPDATE vehiculo SET patente = ?, usuario = ?, asientos = ? WHERE idvehiculo = ?',
    [patente, usuario, asientos, idvehiculo])
    .then(() => {
      console.log('Vehículo modificado con éxito');
      this.loadDataVehiculo(); // Recargar datos después de la modificación
    })
    .catch(error => {
      console.error('Error al modificar vehículo: ' + JSON.stringify(error));
    });
}


//-------------------------------------------------------------
loadDataViaje(){
  this.db.executeSql('SELECT * FROM viaje', []).then(data =>{
    let items = [];
    for (let i = 0; i < data.rows.length; i++){
      items.push(data.rows.items(i));
    }
    this.datosPregunta.next(items);
  }).catch(error =>{
    console.error('Error al obtener datos: ' + JSON.stringify(error));
  });
}

getDataViaje(): Observable<Viaje[]>{
  return this.datosViaje.asObservable();
}

loadDataSede(){
  this.db.executeSql('SELECT * FROM sede', []).then(data =>{
    let items = [];
    for (let i = 0; i < data.rows.length; i++){
      items.push(data.rows.items(i));
    }
    this.datosPregunta.next(items);
  }).catch(error =>{
    console.error('Error al obtener datos: ' + JSON.stringify(error));
  });
}

getDataSede(){}


  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });
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
  
        //ejecutar la creación de tablas
        await this.db.executeSql(this.tablarol,[]);
        //ejecuto los registros
        await this.db.executeSql(this.registrorol,[]);
  
        //ejecutar las variables de creacion de tablas
        await this.db.executeSql('CREATE TABLE IF NOT EXISTS usuario (usuarioid INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR (30), apellido VARCHAR (30), correo VARCHAR(50), contrasena VARCHAR(10), idpreguntas INTEGER, respuesta VARCHAR(50), rolid INTEGER, imagenperfil BLOB, FOREIGN KEY (idpreguntas) REFERENCES tpreguntas(idpregunta), FOREIGN KEY (rolid) REFERENCES rol(rolid))', []).then(() => {
          console.log('Tabla usuario creada con éxito')
        }).catch(error => {
          console.error('Error al crear la tabla: ' + JSON.stringify(error));
        });
  
        await this.db.executeSql('CREATE TABLE IF NOT EXIST tpreguntas (idpreguntas INTEGER PRIMARY KEY AUTOINCREMENT, pregunta VARCHAR(50))', []).then(()=>{
          console.log('Tabla tpreguntas creada con exito')
        }).catch(error=>{
          console.error('Error al crear la tabla: ' + JSON.stringify(error));
        })
  
        await this.db.executeSql('CREATE TABLE IF NOT EXIST vehiculo (autoid INTEGER PRIMARY KEY AUTOINCREMENT, patente VARCHAR(6), FOREIGN KEY (userid) REFERENCES (usuario(usuarioid)),asientos NUMBER(10))', []).then(()=>{
          console.log('Tabla vehiculo creada con exito')
        }).catch(error =>{
          console.error('Error al crear la tabla: '+ JSON.stringify(error));
        }); 
  
        await this.db.executeSql('CREATE TABLE IF NOT EXIST viaje (idviaje INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY (autoid) REFERENCES(vehiculo(autoid)), ppartida VARCHAR(50), pdestino VARCHAR(50))',[]).then(()=>{
          console.log('Tabla VIAJE creada con exito')
        }).catch(error=>{
          console.error('Error al crear la tabla: ' + JSON.stringify(error));
        })
  
        await this.db.executeSql('CREATE TABLE IF NOT EXIST sede (idsede INTEGER PRIMARY KEY AUTOINCREMENT, nomsede VARCHAR(50), locacion VARCHAR(100))',[]).then(()=>{
          console.log('Tabla SEDE creada con exito')
        }).catch(error=>{
          console.error('Error al crear la tabla: ' + JSON.stringify(error));
        })
  
        await this.db.executeSql('CREATE TABLE IF NOT EXIST detalle (iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY (idviaje) REFERENCES(viaje(idviaje)), FOREIGN KEY (usuarioid) REFERENCES(usuario(usuarioid)))',[]).then(()=>{
          console.log('Tabla [nombre de la tabla] creada con exito')
        }).catch(error=>{
          console.error('Error al crear la tabla: ' + JSON.stringify(error));
        })
  
        //ejecutar los insert iniciales
          
        
          //insert de preguntas de seguridad
        await this.db.executeSql('INSERT INTO tpreguntas (pregunta) VALUES (\'¿Cuál es el nombre de tu primer mascota?\')')
        await this.db.executeSql('INSERT INTO tpreguntas (pregunta) VALUES (\'¿En qué ciudad naciste?\')')
        await this.db.executeSql('INSERT INTO tpreguntas (pregunta) VALUES (\'¿Cuál es tu comida favorita?\')')
          //insert del usuario Administrador
          await this.db.executeSql('INSERT INTO usuarios (nombre, correo, contrasena, idpregunta, respuesta, rol_id) VALUES (\'Administrador\', \'admin@example.com\', \'contrasena_segura\', 1, \'ValorFirulais\', 1)');
        
        
  
            // Insertar datos pre-registrados en la tabla de vehículos
            await this.db.executeSql('INSERT INTO vehiculo (patente, userid, asientos) VALUES (?, ?, ?)', ['ABC123', 1, 4]);
            await this.db.executeSql('INSERT INTO vehiculo (patente, userid, asientos) VALUES (?, ?, ?)', ['XYZ789', 2, 2]);
            // Agrega más inserciones según sea necesario
          
        //manipular el observable
        this.isDBReady.next(true);
        this.loadDataRol();
  
      }catch(e) {
        this.presentAlert("ERROR AL CREAR TABLA" + e);
      }
    }
}