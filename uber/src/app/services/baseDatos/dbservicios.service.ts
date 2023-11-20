import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DbserviciosService {

  //constructor
  constructor(public sqlite: SQLite, private platform: Platform, private alertController: AlertController) {}

  //crear la base de datos
  crearDB() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default',
    })
    
  }

  createTable() {
    return this.crearDB().then((db: SQLiteObject) => {
      // Crea la tabla 'rol'
      db.executeSql("CREATE TABLE IF NOT EXISTS rol (id INTEGER PRIMARY KEY AUTOINCREMENT, nomrol VARCHAR(30) NOT NULL);", [])
        .then(() => console.log('Tabla rol creada'))
        .catch(error => console.error('Error al crear la tabla rol', error));

      // Crea la tabla 'sede'
      db.executeSql("CREATE TABLE IF NOT EXISTS sede (idsede INTEGER PRIMARY KEY AUTOINCREMENT, nomsede VARCHAR(50), locacion VARCHAR(100));", [])
      .then(() => console.log('Tabla sede creada'))
      .catch(error => console.error('Error al crear la tabla sede', error));

      // Crea la tabla 'tpreguntas'
      db.executeSql("CREATE TABLE IF NOT EXISTS tpreguntas (idpreguntas INTEGER PRIMARY KEY AUTOINCREMENT, pregunta VARCHAR(50));", [])
        .then(() => console.log('Tabla tpreguntas creada'))
        .catch(error => console.error('Error al crear la tabla tpreguntas', error));

      // Crea la tabla 'usuario' clave
      db.executeSql("CREATE TABLE IF NOT EXISTS usuario (usuarioid INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR (30), apellido VARCHAR (30), correo VARCHAR(50), contrasena VARCHAR(10), idpreguntas INTEGER, respuesta VARCHAR(50), rolid INTEGER, FOREIGN KEY (idpreguntas) REFERENCES tpreguntas(idpregunta), FOREIGN KEY (rolid) REFERENCES rol(rolid));", [])
        .then(() => console.log('Tabla usuario creada'))
        .catch(error => console.error('Error al crear la tabla usuario', error));

      // Crea la tabla 'vehiculo' clave
      db.executeSql("CREATE TABLE IF NOT EXISTS vehiculo (autoid INTEGER PRIMARY KEY AUTOINCREMENT, patente VARCHAR(6), userid INTEGER, asientos INTEGER, FOREIGN KEY (userid) REFERENCES usuario(usuarioid));", [])
        .then(() => console.log('Tabla vehiculo creada'))
        .catch(error => console.error('Error al crear la tabla vehiculo', error));

      // Crea la tabla 'viaje' clave de clave 
      db.executeSql("CREATE TABLE IF NOT EXISTS viaje (idviaje INTEGER PRIMARY KEY AUTOINCREMENT, autoid INTEGER, ppartida VARCHAR(50), pdestino VARCHAR(50), FOREIGN KEY (autoid) REFERENCES vehiculo(autoid));", [])
        .then(() => console.log('Tabla viaje creada'))
        .catch(error => console.error('Error al crear la tabla viaje', error));

      // Crea la tabla 'detalle' ultima clave
      db.executeSql("CREATE TABLE IF NOT EXISTS detalle (iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, idviaje INTEGER, usuarioid INTEGER, FOREIGN KEY (idviaje) REFERENCES viaje(idviaje), FOREIGN KEY (usuarioid) REFERENCES usuario(usuarioid));", [])
        .then(() => console.log('Tabla detalle creada'))
        .catch(error => console.error('Error al crear la tabla detalle', error));
    });
  }

  insertData() {
    return this.crearDB().then((db: SQLiteObject) => {
      // Inserta datos en la tabla 'rol'
      db.executeSql("INSERT OR IGNORE INTO rol (id, nomrol) VALUES (1, 'Administrador');", [])
        .then(() => console.log('Datos insertados en la tabla rol'))
        .catch(error => console.error('Error al insertar datos en la tabla rol', error));

      db.executeSql("INSERT OR IGNORE INTO rol (id, nomrol) VALUES (2, 'Alumno');", [])
        .then(() => console.log('Datos insertados en la tabla rol'))
        .catch(error => console.error('Error al insertar datos en la tabla rol', error));

      // Inserta datos en la tabla 'tpreguntas'
      db.executeSql("INSERT OR IGNORE INTO tpreguntas (pregunta) VALUES ('¿Cuál es el nombre de tu primer mascota?');", [])
        .then(() => console.log('Datos insertados en la tabla tpreguntas'))
        .catch(error => console.error('Error al insertar datos en la tabla tpreguntas', error));
      
      db.executeSql("INSERT OR IGNORE INTO tpreguntas (pregunta) VALUES ('¿En qué ciudad naciste?');", [])
        .then(() => console.log('Datos insertados en la tabla tpreguntas'))
        .catch(error => console.error('Error al insertar datos en la tabla tpreguntas', error));
        
      db.executeSql("INSERT OR IGNORE INTO tpreguntas (pregunta) VALUES ('¿Cuál es tu comida favorita?');", [])
        .then(() => console.log('Datos insertados en la tabla tpreguntas'))
        .catch(error => console.error('Error al insertar datos en la tabla tpreguntas', error));

      // Inserta datos en la tabla 'usuarios'
      db.executeSql("INSERT OR IGNORE INTO usuario (nombre, correo, contrasena, idpreguntas, respuesta, rolid) VALUES ('Administrador','admin@example.com','contrasena_segura',1,'ValorFirulais',1);", [])
        .then(() => console.log('Datos insertados en la tabla usuarios'))
        .catch(error => console.error('Error al insertar datos en la tabla usuarios', error));

      // Inserta datos en la tabla 'vehiculo'
      db.executeSql("INSERT OR IGNORE INTO vehiculo (patente, userid, asientos) VALUES ('ABC123',(SELECT usuarioid FROM usuario WHERE nombre = 'Administrador'),4);", [])
        .then(() => console.log('Datos insertados en la tabla vehiculo'))
        .catch(error => console.error('Error al insertar datos en la tabla vehiculo', error));

      db.executeSql("INSERT OR IGNORE INTO vehiculo (patente, userid, asientos) VALUES ('XYZ789',2,2);", [])
        .then(() => console.log('Datos insertados en la tabla vehiculo'))
        .catch(error => console.error('Error al insertar datos en la tabla vehiculo', error));
    });
  }


  //observable para las tablas

//-------------------------------------------------------------

// Función para cargar datos de la tabla "rol"
// Insertar un rol
insertarRol(nomrol: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO rol (nomrol) VALUES (?)", [nomrol]);
  });
}

// Obtener todos los roles
obtenerRoles() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM rol", []).then(data => {
      let roles = [];
      for (let i = 0; i < data.rows.length; i++) {
        roles.push(data.rows.item(i));
      }
      return roles;
    });
  });
}

// Actualizar un rol
actualizarRol(id: number, nuevoNomrol: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE rol SET nomrol = ? WHERE id = ?", [nuevoNomrol, id]);
  });
}

// Eliminar un rol
eliminarRol(id: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM rol WHERE id = ?", [id]);
  });
}

//-------------------------------------------------------------

// Función para cargar datos de la tabla "Preguntas"
// Insertar una pregunta
insertarPregunta(pregunta: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO tpreguntas (pregunta) VALUES (?)", [pregunta]);
  });
}

// Obtener todas las preguntas
obtenerPreguntas() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM tpreguntas", []).then(data => {
      let preguntas = [];
      for (let i = 0; i < data.rows.length; i++) {
        preguntas.push(data.rows.item(i));
      }
      return preguntas;
    });
  });
}

// Actualizar una pregunta
actualizarPregunta(idpreguntas: number, nuevaPregunta: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE tpreguntas SET pregunta = ? WHERE idpreguntas = ?", [nuevaPregunta, idpreguntas]);
  });
}

// Eliminar una pregunta
eliminarPregunta(idpreguntas: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM tpreguntas WHERE idpreguntas = ?", [idpreguntas]);
  });
}
//-------------------------------------------------------------
// Función para cargar datos de la tabla "sede"
// Insertar una sede
insertarSede(nomsede: string, locacion: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO sede (nomsede, locacion) VALUES (?, ?)", [nomsede, locacion]);
  });
}

// Obtener todas las sedes
obtenerSedes() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM sede", []).then(data => {
      let sedes = [];
      for (let i = 0; i < data.rows.length; i++) {
        sedes.push(data.rows.item(i));
      }
      return sedes;
    });
  });
}

// Actualizar una sede
actualizarSede(idsede: number, nuevoNomsede: string, nuevaLocacion: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE sede SET nomsede = ?, locacion = ? WHERE idsede = ?", [nuevoNomsede, nuevaLocacion, idsede]);
  });
}

// Eliminar una sede
eliminarSede(idsede: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM sede WHERE idsede = ?", [idsede]);
  });
}

//--------------------------------------------------

//tabla usuarios
// Insertar un usuario
insertarUsuario(nombre: string, apellido: string, correo: string, contrasena: string, idpreguntas: number, respuesta: string, rolid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO usuario (nombre, apellido, correo, contrasena, idpreguntas, respuesta, rolid) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, correo, contrasena, idpreguntas, respuesta, rolid]);
  });
}

// Obtener todos los usuarios
obtenerUsuarios() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM usuario", []).then(data => {
      let usuarios = [];
      for (let i = 0; i < data.rows.length; i++) {
        usuarios.push(data.rows.item(i));
      }
      return usuarios;
    });
  });
}

// Actualizar un usuario
actualizarUsuario(usuarioid: number, nuevoNombre: string, nuevoApellido: string, nuevoCorreo: string, nuevaContrasena: string, nuevoIdPreguntas: number, nuevaRespuesta: string, nuevoRolId: number, nuevaImagenPerfil: Blob) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, idpreguntas = ?, respuesta = ?, rolid = ? WHERE usuarioid = ?", [nuevoNombre, nuevoApellido, nuevoCorreo, nuevaContrasena, nuevoIdPreguntas, nuevaRespuesta, nuevoRolId, usuarioid]);
  });
}

// Eliminar un usuario
eliminarUsuario(usuarioid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM usuario WHERE usuarioid = ?", [usuarioid]);
  });
}


//-------------------------------------------------------------
// Función para cargar datos de la tabla "vehiculo"
// Insertar un vehículo
insertarVehiculo(patente: string, userid: number, asientos: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO vehiculo (patente, userid, asientos) VALUES (?, ?, ?)", [patente, userid, asientos]);
  });
}

// Obtener todos los vehículos
obtenerVehiculos() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM vehiculo", []).then(data => {
      let vehiculos = [];
      for (let i = 0; i < data.rows.length; i++) {
        vehiculos.push(data.rows.item(i));
      }
      return vehiculos;
    });
  });
}

// Actualizar un vehículo
actualizarVehiculo(autoid: number, nuevaPatente: string, nuevoUserid: number, nuevosAsientos: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE vehiculo SET patente = ?, userid = ?, asientos = ? WHERE autoid = ?", [nuevaPatente, nuevoUserid, nuevosAsientos, autoid]);
  });
}

// Eliminar un vehículo
eliminarVehiculo(autoid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM vehiculo WHERE autoid = ?", [autoid]);
  });
}


//-------------------------------------------------------------


// Función para cargar datos de la tabla "viaje"
// Insertar un viaje
insertarViaje(autoid: number, ppartida: string, pdestino: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO viaje (autoid, ppartida, pdestino) VALUES (?, ?, ?)", [autoid, ppartida, pdestino]);
  });
}

// Obtener todos los viajes
obtenerViajes() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM viaje", []).then(data => {
      let viajes = [];
      for (let i = 0; i < data.rows.length; i++) {
        viajes.push(data.rows.item(i));
      }
      return viajes;
    });
  });
}

// Actualizar un viaje
actualizarViaje(idviaje: number, nuevoAutoid: number, nuevaPpartida: string, nuevaPdestino: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE viaje SET autoid = ?, ppartida = ?, pdestino = ? WHERE idviaje = ?", [nuevoAutoid, nuevaPpartida, nuevaPdestino, idviaje]);
  });
}

// Eliminar un viaje
eliminarViaje(idviaje: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM viaje WHERE idviaje = ?", [idviaje]);
  });
}


//-------------------------------------------------------------
// Función para cargar datos de la tabla "detalle"
// Insertar un detalle
insertarDetalle(idviaje: number, usuarioid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO detalle (idviaje, usuarioid) VALUES (?, ?)", [idviaje, usuarioid]);
  });
}

// Obtener todos los detalles
obtenerDetalles() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM detalle", []).then(data => {
      let detalles = [];
      for (let i = 0; i < data.rows.length; i++) {
        detalles.push(data.rows.item(i));
      }
      return detalles;
    });
  });
}

// Actualizar un detalle
actualizarDetalle(iddetalle: number, nuevoIdviaje: number, nuevoUsuarioid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE detalle SET idviaje = ?, usuarioid = ? WHERE iddetalle = ?", [nuevoIdviaje, nuevoUsuarioid, iddetalle]);
  });
}

// Eliminar un detalle
eliminarDetalle(iddetalle: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM detalle WHERE iddetalle = ?", [iddetalle]);
  });
}

//-------------------------------------------------------------



  //login de usuario

  loginUsuario(correo: string, contrasena: string): Promise<any> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM usuario WHERE correo = ? AND contrasena = ?", [correo, contrasena])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0); // Devuelve el primer usuario encontrado
          } else {
            return null; // Devuelve nulo si no se encuentra ningún usuario con esas credenciales
          }
        })
        .catch(error => {
          console.error('Error al obtener usuario por credenciales:', error);
          return null;
        });
    });
  }


}