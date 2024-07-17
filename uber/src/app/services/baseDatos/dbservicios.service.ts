import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DbserviciosService {

  private db: SQLiteObject; // Almacena la conexión a la base de datos

  private isDatabaseInitialized: boolean = false;

  //constructor
  constructor(public sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.initDatabase();
   }

   // Método para inicializar la base de datos
   initDatabase(): Promise<void> { // Asegúrate de que initDatabase() devuelva una promesa
    if (this.isDatabaseInitialized) {
      console.log('Database already initialized. Skipping initialization.');
      return Promise.resolve();
    }
    
    return this.createTable().then(() => {
      console.log('Tables created successfully.');
      return this.insertData();
    }).then(() => {
      console.log('Data inserted successfully.');
      this.isDatabaseInitialized = true;
    }).catch(error => {
      console.error('Error during database initialization:', error);
      throw error; // Lanza el error para que pueda ser capturado por la función que llama a initDatabase()
    });
  }

  //crear la base de datos
  crearDB() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default',
    })

  }



  createTable() {
    return this.crearDB().then((db: SQLiteObject) => {

      /*
      db.executeSql("DROP TABLE IF EXISTS usuario;")
      db.executeSql("DROP TABLE IF EXISTS rol;")
      db.executeSql("DROP TABLE IF EXISTS sede;")
      db.executeSql("DROP TABLE IF EXISTS tpreguntas;")
      db.executeSql("DROP TABLE IF EXISTS vehiculo;")
      db.executeSql("DROP TABLE IF EXISTS viaje;")
      db.executeSql("DROP TABLE IF EXISTS detalle;")
      db.executeSql("DROP TABLE IF EXISTS imagenes;")
      */

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
      db.executeSql("CREATE TABLE IF NOT EXISTS viaje (idviaje INTEGER PRIMARY KEY AUTOINCREMENT, autoid INTEGER, ppartida VARCHAR(50), pdestino VARCHAR(50),valorViaje INTEGER, cantAsientos INTEGER, disponible BOOLEAN DEFAULT 1, FOREIGN KEY (autoid) REFERENCES vehiculo(autoid));", [])
        .then(() => console.log('Tabla viaje creada'))
        .catch(error => console.error('Error al crear la tabla viaje', error));

      // Crea la tabla 'detalle' ultima clave
      db.executeSql("CREATE TABLE IF NOT EXISTS detalle (iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, idviaje INTEGER, usuarioid INTEGER, FOREIGN KEY (idviaje) REFERENCES viaje(idviaje), FOREIGN KEY (usuarioid) REFERENCES usuario(usuarioid));", [])
        .then(() => console.log('Tabla detalle creada'))
        .catch(error => console.error('Error al crear la tabla detalle', error));
      // Crea la tabla 'imagenes'
      db.executeSql("CREATE TABLE IF NOT EXIST imagenes (idimagen INTEGER PRIMARY KEY AUTOINCREMENT, imagen BLOB, usuarioid INTEGER, FOREIGN KEY (usuarioid) REFERENCES usuario(usuarioid));",[])
        .then(() => console.log('Tabla detalle imagen'))
        .catch(error => console.error('Error al crear la tabla imagen', error));

      //tabla pasajeros
      db.executeSql("CREATE TABLE IF NOT EXISTS pasajeros ( pasajerosid INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, viajeid INTEGER, FOREIGN KEY (userid) REFERENCES usuario(userid), FOREIGN KEY (viajeid) REFERENCES viaje(idviaje));",[])
        .then(() => console.log('Tabla pasajeros creada'))
        .catch(error => console.error('Error al crear la tabla pasajeros', error));

      //  This method creates a table named 'historialcliente' to store user information
      db.executeSql("CREATE TABLE IF NOT EXISTS historialcliente (idhistorial INTEGER PRIMARY KEY AUTOINCREMENT, usuarioid INTEGER, saldoagregado REAL, tipotransaccion TEXT, fechahora DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (usuarioid) REFERENCES usuario(usuarioid));", [])
        .then(() => console.log('Tabla historialcliente creada'))
        .catch(error => console.error('Error al crear la tabla historialcliente', error));

      db.close();
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

      db.executeSql("INSERT OR IGNORE INTO rol (id, nomrol) VALUES (3, 'Conductor');", [])
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
      db.executeSql("INSERT OR IGNORE INTO usuario (nombre, correo, contrasena, idpreguntas, respuesta, rolid) VALUES ('Administrador','admin@admin.com','1234',1,'ValorFirulais',1);", [])
        .then(() => console.log('Datos insertados en la tabla usuarios'))
        .catch(error => console.error('Error al insertar datos en la tabla usuarios', error));

      // Inserta datos en la tabla 'vehiculo'
      db.executeSql("INSERT OR IGNORE INTO vehiculo (patente, userid, asientos) VALUES ('ABC123',(SELECT usuarioid FROM usuario WHERE nombre = 'Administrador'),4);", [])
        .then(() => console.log('Datos insertados en la tabla vehiculo'))
        .catch(error => console.error('Error al insertar datos en la tabla vehiculo', error));

      db.close();
    });
  }

  // Método para inicializar la base de datos (llama a createTable e insertData en secuencia)
  
  //observable para las tablas
  // Función para cargar datos de la tabla "historialcliente"
   // Insertar un historial cliente
   insertarHistorialCliente(usuarioid: number, saldoagregado: number, tipotransaccion: string) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("INSERT INTO historialcliente (usuarioid, saldoagregado, tipotransaccion) VALUES (?, ?, ?)", [usuarioid, saldoagregado, tipotransaccion]);
    });
  }

  async obtenerHistorialClientePorUsuario(usuarioid: number): Promise<any[]> {
    try {
      const result = await this.crearDB().then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM historialcliente WHERE usuarioid = ?', [usuarioid]);
      });
  
      if (result.rows.length > 0) {
        const historialsaldo = [];
        for (let i = 0; i < result.rows.length; i++) {
          historialsaldo.push(result.rows.item(i));
        }
        return historialsaldo;
      }
  
      return [];
    } catch (error) {
      console.error('Error al obtener historial de saldos del cliente:', error);
      throw error;
    }
  }

  async obtenerHistorialClientePorsaldoscliente(): Promise<any[]> {
    try {
      const result = await this.crearDB().then((db: SQLiteObject) => {
        return db.executeSql('SELECT usuario.usuarioid, usuario.nombre, usuario.apellido, usuario.rolid, SUM(historialcliente.saldoagregado) AS saldo FROM usuario JOIN historialcliente ON usuario.usuarioid = historialcliente.usuarioid WHERE usuario.rolid = 2 GROUP BY usuario.usuarioid, usuario.nombre, usuario.apellido ', []);
      });
  
      if (result.rows.length > 0) {
        const historialsaldo = [];
        for (let i = 0; i < result.rows.length; i++) {
          historialsaldo.push(result.rows.item(i));
        }
        return historialsaldo;
      }
  
      return [];
    } catch (error) {
      console.error('Error al obtener historial de saldos del cliente:', error);
      throw error;
    }
  }

  async obtenerHistorialClientePorsaldosconductor(): Promise<any[]> {
    try {
      const result = await this.crearDB().then((db: SQLiteObject) => {
        return db.executeSql('SELECT usuario.usuarioid, usuario.nombre, usuario.apellido, usuario.rolid, SUM(historialcliente.saldoagregado) AS saldo FROM usuario JOIN historialcliente ON usuario.usuarioid = historialcliente.usuarioid WHERE usuario.rolid = 3 GROUP BY usuario.usuarioid, usuario.nombre, usuario.apellido ', []);
      });
  
      if (result.rows.length > 0) {
        const historialsaldo = [];
        for (let i = 0; i < result.rows.length; i++) {
          historialsaldo.push(result.rows.item(i));
        }
        return historialsaldo;
      }
  
      return [];
    } catch (error) {
      console.error('Error al obtener historial de saldos del cliente:', error);
      throw error;
    }
  }
  
// Obtener todos los historiales clientes
  async obtenerHistorialesClientes(): Promise<any[]> {
    try {
      const result = await this.crearDB().then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM historialcliente', []);
      });
  
      if (result.rows.length > 0) {
        const historiales = [];
        for (let i = 0; i < result.rows.length; i++) {
          historiales.push(result.rows.item(i));
        }
        return historiales;
      }
  
      return [];
    } catch (error) {
      console.error('Error al obtener historial de saldos del cliente:', error);
      throw error;
    }
  }


  // Función para obtener el saldo actual del cliente
obtenerSaldoActual(usuarioid: number): Promise<number> {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT SUM(saldoagregado) AS saldo_actual FROM historialcliente WHERE usuarioid = ?", [usuarioid])
      .then(data => {
        if (data.rows.length > 0 && data.rows.item(0).saldo_actual != null) {
          return data.rows.item(0).saldo_actual;
        } else {
          return 0; // Si no hay saldo, retorna 0
        }
      })
      .catch(error => {
        console.error('Error al obtener el saldo actual:', error);
        throw error;
      });
  });
}

  // Actualizar un historial cliente
  actualizarHistorialCliente(idhistorial: number, nuevoSaldoAgregado: number, nuevoTipoTransaccion: string) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("UPDATE historialcliente SET saldoagregado = ?, tipotransaccion = ? WHERE idhistorial = ?", [nuevoSaldoAgregado, nuevoTipoTransaccion, idhistorial]);
    });
  }

 // Actualizar un historial cliente por usuario id
 actualizarHistorialClientePorUsuarioId(usuarioid: number, nuevoSaldoAgregado: number, nuevoTipoTransaccion: string) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE historialcliente SET saldoagregado = ?, tipotransaccion = ? WHERE usuarioid = ?", [nuevoSaldoAgregado, nuevoTipoTransaccion, usuarioid]);
  });
}


  // Eliminar un historial cliente
  eliminarHistorialCliente(idhistorial: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("DELETE FROM historialcliente WHERE idhistorial = ?", [idhistorial]);
    });
  }

  // Eliminar un historial cliente por usuarioid
  eliminarHistorialClientePorUsuarioId(usuarioid: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("DELETE FROM historialcliente WHERE usuarioid = ?", [usuarioid]);
    });
  }

  // Obtener historial cliente por usuarioid
  obtenerHistorialClientePorUsuarioId(usuarioid: number): Promise<any> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM historialcliente WHERE usuarioid = ?", [usuarioid])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0); // Devuelve la información del historial cliente
          } else {
            return null;
          }
        })
        .catch(error => {
          console.error('Error al obtener historial cliente por usuario:', error);
          throw error;
        });
    });
  }


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
    
      return this.db.executeSql("SELECT * FROM sede", []).then(data => {
        let sedes = [];
        for (let i = 0; i < data.rows.length; i++) {
          sedes.push(data.rows.item(i));
        }
        return sedes;
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

  actualizarRolUsuario(usuarioid: number, nuevoRolId: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("UPDATE usuario SET rolid = ? WHERE usuarioid = ?", [nuevoRolId, usuarioid]);

    });
  }

  actualizarNombreUsuario(usuarioid: number, nuevoNombre: string) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("UPDATE usuario SET nombre = ? WHERE usuarioid = ?", [nuevoNombre, usuarioid])
        .then(() => {
          console.log('cambiooo :D');
        })
        .catch(error => {
          console.error('Error al actualizar el nombre del usuario:', error);
          throw error;
        });
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

  // Obtener vehículo por usuario
  obtenerVehiculoPorAutoid(autoid: number): Promise<any> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM vehiculo WHERE autoid = ?", [autoid])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0); // Devuelve la información del vehículo
          } else {
            return null;
          }
        })
        .catch(error => {
          console.error('Error al obtener vehículo por autoid:', error);
          throw error;
        });
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
        db.close();
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

  // Eliminar un vehículo por su userid
  eliminarVehiculoporuserid(userid: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("DELETE FROM vehiculo WHERE userid = ?", [userid]);
    });
  }

  async registrarVehiculo(vehiculo: any): Promise<void> {
    try {
      const db = await this.crearDB();
      const query = 'INSERT INTO vehiculo (patente, userid, asientos) VALUES (?, ?, ?)';
      const params = [vehiculo.patente, vehiculo.userid, vehiculo.asientos];

      await db.executeSql(query, params);
    } catch (error) {
      console.error('Error al registrar vehículo en la base de datos:', error);
      throw error;
    }
  }

   // Obtener vehículo por usuario
   obtenerVehiculoPorUsuario(usuarioid: number): Promise<any> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM vehiculo WHERE userid = ?", [usuarioid])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0); // Devuelve la información del vehículo
          } else {
            return null;
          }
        })
        .catch(error => {
          console.error('Error al obtener vehículo por usuario:', error);
          throw error;
        });
    });
  }

  verificarVehiculoRegistrado(userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.crearDB().then((db: SQLiteObject) => {
        const query = 'SELECT COUNT(*) as count FROM vehiculo WHERE userid = ?';
        const params = [userId];

        db.executeSql(query, params).then((result) => {
          const count = result.rows.item(0).count;
          resolve(count > 0); // Retorna true si hay al menos un vehículo registrado para el usuario
        }).catch(error => {
          console.error('Error al ver vehículo en la base de datos:', error);
          throw error;
        });
      }).catch(error => {
        console.error('Error al ver vehículo en la base de datos:', error);
        throw error;
      });
    });
  }

  //-------------------------------------------------------------

  // Insertar un viaje
  insertarViaje(autoid: number, ppartida: string, pdestino: string, valorViaje: number, cantAsientos: number): Promise<any> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("INSERT INTO viaje (autoid, ppartida, pdestino, valorViaje, cantAsientos) VALUES (?, ?, ?, ?, ?)", [autoid, ppartida, pdestino, valorViaje, cantAsientos]);
    });
  }

  async obtenerDatosViaje(idviaje: number): Promise<any> {
    try {
      const db = await this.crearDB();
      const query = 'SELECT * FROM viaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid JOIN usuario ON vehiculo.userid = usuario.usuarioid WHERE idviaje = ?';
      const result = await db.executeSql(query, [idviaje]);

      if (result.rows.length > 0) {
        // Si hay resultados, devolver la primera fila (asumiendo que idviaje es único)
        return result.rows.item(0);
      } else {
        // No se encontró ningún viaje con el id proporcionado
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del viaje:', error);
      throw error;
    }
  }

  // Obtener todos los viajes
  obtenerViajes(): Promise<any[]> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM viaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid JOIN usuario ON vehiculo.userid = usuario.usuarioid  ", []).then(data => {
        let viajes = [];
        for (let i = 0; i < data.rows.length; i++) {
          viajes.push(data.rows.item(i));
        }
        return viajes;
      });
    });
  }

  // Actualizar un viaje
  actualizarViaje(idviaje: number, nuevoAutoid: number, nuevaPpartida: string, nuevaPdestino: string, nuevoValorViaje: number, nuevaCantAsientos: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("UPDATE viaje SET autoid = ?, ppartida = ?, pdestino = ?, valorViaje = ?, cantAsientos = ? WHERE idviaje = ?", [nuevoAutoid, nuevaPpartida, nuevaPdestino, nuevoValorViaje, nuevaCantAsientos, idviaje]);
    });
  }

  // Eliminar un viaje
  eliminarViaje(idviaje: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("DELETE FROM viaje WHERE idviaje = ?", [idviaje]);
    });
  }

  
  obtenerViajesPorAutoid(autoid: number): Promise<any> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM viaje WHERE autoid = ?", [autoid])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0); // Devuelve la información del vehículo
          } else {
            return null;
          }
        })
        .catch(error => {
          console.error('Error al obtener viaje por autoid:', error);
          throw error;
        });
    });
  }

 

  obtenerUltimoIdViaje(): Promise<number> {
    return this.crearDB().then((db: SQLiteObject) => {
      const consultaSQL = 'SELECT MAX(idviaje) AS ultimoId FROM viaje';
  
      return db.executeSql(consultaSQL, []).then((resultado) => {
        if (resultado.rows.length > 0) {
          const ultimoId = resultado.rows.item(0).ultimoId;
          return ultimoId || 0; // Si es nulo, devuelve 0
        } else {
          return 0; // Si no hay resultados, devuelve 0
        }
      });
    });
  }

  async obtenerTodosViajesConConductores(): Promise<any[]> {
    try {
      const db = await this.crearDB();
      // Realiza una consulta que incluya la información del conductor
      const query = `
        SELECT idviaje, pdestino, valorViaje 
        FROM viaje`;

      const result = await db.executeSql(query);

      return result.rows;
    } catch (error) {
      console.error('Error al obtener viajes con conductores:', error);
      throw error;
    }
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

  // Obtener detalles por idviaje
  obtenerDetallesPorViaje(idviaje: number): Promise<any[]> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM detalle WHERE idviaje = ?", [idviaje])
        .then(data => {
          let detalles = [];
          for (let i = 0; i < data.rows.length; i++) {
            detalles.push(data.rows.item(i));
          }
          return detalles;
        });
    });
  }
  //-------------------------------------------------------------
  // Función para cargar datos de la tabla "imagenes"
  // Insertar una imagen
  insertarImagen2(imagen: Blob, usuarioid: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("INSERT INTO imagenes (imagen, usuarioid) VALUES (?, ?)", [imagen, usuarioid]);
    });
  }

  insertarImagen(usuarioId: number, imagen: Blob) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("INSERT INTO imagenes (usuarioid, imagen) VALUES (?, ?)", [usuarioId, imagen]);
    });
  }

  // Obtener todas las imágenes para un usuario específico
  obtenerImagenesPorUsuario(usuarioid: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM imagenes WHERE usuarioid = ?", [usuarioid]).then(data => {
        let imagenes = [];
        for (let i = 0; i < data.rows.length; i++) {
          imagenes.push(data.rows.item(i));
        }
        return imagenes;
      });
    });
  }

  // Actualizar una imagen
  actualizarImagen(idimagen: number, nuevaImagen: Blob) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("UPDATE imagenes SET imagen = ? WHERE idimagen = ?", [nuevaImagen, idimagen]);
    });
  }

  // Eliminar una imagen
  eliminarImagen(idimagen: number) {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("DELETE FROM imagenes WHERE idimagen = ?", [idimagen]);
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


  buscarUsuarioPorId(iduser: number): Promise<string> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM usuario WHERE usuarioid = ?", [iduser])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0); // Devuelve el primer usuario encontrado
          } else {
            return null;
          }
        }).catch(error => {
          console.error('Error al obtener usuario por credenciales:', error);
          return null;
        });
    })
  }
  buscarusuarioPorCorreo(correo: string): Promise<string> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM usuario WHERE correo = ?", [correo])
        .then(usr => {
          if (usr.rows.length > 0) {
            return usr.rows.item(0);
          } else {
            return null;
          }
        }).catch(error => {
          console.error('Error al obtener usuario por correo:', error);
          return null;
        });
    });
  }
  buscarUsuariosPorRol(rolid: number): Promise<any[]> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM usuario WHERE rolid = ?", [rolid])
        .then(data => {
          const usuarios: any[] = [];
          for (let i = 0; i < data.rows.length; i++) {
            usuarios.push(data.rows.item(i));
          }
          return usuarios; // Devuelve un array con todos los usuarios encontrados
        }).catch(error => {
          console.error('Error al obtener usuarios por rol:', error);
          return []; // Devuelve un array vacío en caso de error
        });
    });
  }
  buscarPregunta(id: number): Promise<string> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM tpreguntas WHERE idpreguntas = ?", [id])
        .then(data => {
          if (data.rows.length > 0) {
            return data.rows.item(0).pregunta; // Devuelve solo el texto de la pregunta
          } else {
            return null;
          }
        }).catch(error => {
          console.error('Error al obtener la pregunta de seguridad por id:', error);
          return null;
        });
    });
  }
  //Vehiculo
  buscarConductorPorRol(idRol: number): Promise<any[]> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT usuario.nombre, usuario.apellido, vehiculo.patente FROM usuario INNER JOIN vehiculo ON usuario.usuarioid = vehiculo.userid WHERE usuario.rolid = ?", [idRol])
        .then(data => {
          const usuarios: any[] = [];
          for (let i = 0; i < data.rows.length; i++) {
            usuarios.push(data.rows.item(i));
          }
          return usuarios; // Devuelve un array con los datos de los usuarios encontrados
        }).catch(error => {
          console.error('Error al obtener usuarios por rol:', error);
          return []; // Devuelve un array vacío en caso de error
        });
    });
  }
  // Dentro de DbserviciosService

  verificarCorreoExistente(correo: string): Promise<boolean> {
    return this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT COUNT(*) AS count FROM usuario WHERE correo = ?", [correo])
        .then((result) => {
          const count = result.rows.item(0).count;
          return count > 0;
        })
        .catch(error => {
          console.error('Error al verificar correo existente:', error);
          throw error; // Puedes manejar el error según tus necesidades
        });
    });
  }

  //=======================================================

  // Insertar un pasajero
insertarPasajero(userid: number, viajeid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("INSERT INTO pasajeros (userid, viajeid) VALUES (?, ?)", [userid, viajeid]);
  });
}

// Obtener todos los pasajeros
obtenerPasajeros() {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM pasajeros", []).then(data => {
      let pasajeros = [];
      for (let i = 0; i < data.rows.length; i++) {
        pasajeros.push(data.rows.item(i));
      }
      return pasajeros;
    });
  });
}

// Actualizar un pasajero
actualizarPasajero(pasajerosid: number, nuevoUserid: number, nuevoViajeid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE pasajeros SET userid = ?, viajeid = ? WHERE pasajerosid = ?", [nuevoUserid, nuevoViajeid, pasajerosid]);
  });
}

// Eliminar un pasajero
eliminarPasajero(pasajerosid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("DELETE FROM pasajeros WHERE pasajerosid = ?", [pasajerosid]);
  });
}

// Obtener pasajeros por userid
obtenerPasajerosPorUsuario(userid: number): Promise<any[]> {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM pasajeros WHERE userid = ?", [userid])
      .then(data => {
        let pasajeros = [];
        for (let i = 0; i < data.rows.length; i++) {
          pasajeros.push(data.rows.item(i));
        }
        return pasajeros;
      });
  });
}

// Obtener pasajeros por viajeid
obtenerPasajerosPorViaje(viajeid: number): Promise<any[]> {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM pasajeros WHERE viajeid = ?", [viajeid])
      .then(data => {
        let pasajeros = [];
        for (let i = 0; i < data.rows.length; i++) {
          pasajeros.push(data.rows.item(i));
        }
        return pasajeros;
      });
  });
}

async obtenerPasajerosPorViajeId(idviaje: number): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await this.crearDB();
      // Ejecuta la consulta SQL con un JOIN para obtener el nombre del usuario
      const result = await db.executeSql(
        'SELECT usuario.nombre AS usuarioNombre FROM pasajeros  JOIN usuario  ON pasajeros.userid = usuario.usuarioid WHERE pasajeros.viajeid = ?',
        [idviaje]
      );

      return result.rows;

    } catch (error) {
      // Rechaza la promesa en caso de error
      reject(error);
    }
  });
}

obtenerPasajerosalviaje(viajeid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM pasajeros JOIN usuario on pasajeros.userid = usuario.usuarioid WHERE pasajeros.viajeid = ?", [viajeid]).then(data => {
      let prueba = [];
      for (let i = 0; i < data.rows.length; i++) {
        prueba.push(data.rows.item(i));
      }
      return prueba;
    });
  });
}

async obtenerAsientosDisponiblesEnViaje(viajeId: number): Promise<number> {
  try {
    const db = await this.crearDB();
    const result = await db.executeSql("SELECT cantAsientos FROM viaje WHERE idviaje = ?", [viajeId]);

    if (result.rows.length > 0) {
      const cantAsientos = result.rows.item(0).cantAsientos;
      const pasajerosEnViaje = await this.obtenerCantidadPasajerosEnViaje(viajeId); // Debes implementar esta función

      const asientosDisponibles = cantAsientos - pasajerosEnViaje;
      return Math.max(asientosDisponibles, 0); // Asegura que no haya asientos negativos
    } else {
      console.error('No se encontró el viaje con ID:', viajeId);
      return 0; // Si no se encuentra el viaje, se considera que no hay asientos disponibles
    }
  } catch (error) {
    console.error('Error al obtener asientos disponibles en el viaje:', error);
    throw error;
  }
}

async obtenerViajePorId(viajeId: number): Promise<any | null> {
  try {
    const result = await this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql("SELECT * FROM viaje WHERE idviaje = ?", [viajeId]);
    });

    if (result.rows.length > 0) {
      return result.rows.item(0);
    }

    return null;
  } catch (error) {
    console.error('Error al obtener el viaje por ID:', error);
    return null;
  }
}

async actualizarDisponibilidadViaje(viajeId: number): Promise<void> {
  try {
    // Obtén la información del viaje
    const viaje = await this.obtenerViajePorId(viajeId);

    if (viaje) {
      // Consulta la cantidad de pasajeros actuales en el viaje
      const pasajerosActuales = await this.obtenerCantidadPasajerosEnViaje(viajeId);

      // Verifica si hay asientos disponibles
      const asientosDisponibles = viaje.cantAsientos - pasajerosActuales;

      // Actualiza el valor de la columna 'disponible' en la tabla 'viaje'
      const disponible = asientosDisponibles > 0;
      //quizas acá el error aaaa



      await this.crearDB().then((db: SQLiteObject) => {
        return db.executeSql("UPDATE viaje SET disponible = ? WHERE idviaje = ?", [disponible ? 1 : 0, viajeId]);
      });

      console.log(`Disponibilidad del viaje ${viajeId} actualizada a ${disponible}`);
      
    } else {
      console.error(`No se encontró el viaje con ID ${viajeId}`);
    }
  } catch (error) {
    console.error('Error al actualizar la disponibilidad del viaje:', error);
    // Maneja el error según tus necesidades
  }
}

// Esta función auxiliar podría ser útil para obtener la cantidad de pasajeros en un viaje
async obtenerCantidadPasajerosEnViaje(viajeId: number): Promise<number> {
  try {
    const db = await this.crearDB();
    const result = await db.executeSql("SELECT COUNT(*) AS cantidad FROM pasajeros WHERE viajeid = ?", [viajeId]);

    if (result.rows.length > 0) {
      const cantidad = result.rows.item(0).cantidad;
      return cantidad !== null ? cantidad : 0;
    }

    return 0;
  } catch (error) {
    console.error('Error al obtener la cantidad de pasajeros en el viaje:', error);
    throw error;
  }
}

async obtenerViajesConDisponibilidad(): Promise<any[]> {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM viaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid JOIN usuario ON vehiculo.userid = usuario.usuarioid WHERE disponible = 1", []).then(data => {
      let viajes = [];
      for (let i = 0; i < data.rows.length; i++) {
        viajes.push(data.rows.item(i));
      }
      return viajes;
    });
  });
}

 // Nueva función para finalizar el viaje
 finalizarViaje(viajeId: number): Promise<void> {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("UPDATE viaje SET disponible = 0 WHERE idviaje = ?", [viajeId])
      .then(() => {
        this.mostrarAlerta('Exito','Viaje finalizado correctamente.');
      })
      .catch(error => {
        console.error('Error al finalizar el viaje:', error);
        throw error;
      });
  });
}



// Función para obtener la disponibilidad del viaje del conductor actual
async obtenerDisponibilidadViajeConductor(userId: number): Promise<boolean> {
  try {
    const result = await this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql('SELECT viaje.disponible FROM viaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid WHERE vehiculo.userid = ? ORDER BY idviaje DESC LIMIT 1', [userId]);
    });

    if (result.rows.length > 0) {
      const disponibilidad = result.rows.item(0).disponible;
      return disponibilidad === 1; // Devuelve true si la disponibilidad es 1 (true), de lo contrario, devuelve false
    }

    return false;
  } catch (error) {
    console.error('Error al obtener la disponibilidad del viaje del conductor:', error);
    return false;
  }
}

async obtenerHistorialViajes(autoid: number): Promise<any[]> {
  try {
    const result = await this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM viaje WHERE autoid = ? ORDER BY idviaje DESC', [autoid]);
    });

    if (result.rows.length > 0) {
      const historialViajes = [];
      for (let i = 0; i < result.rows.length; i++) {
        historialViajes.push(result.rows.item(i));
      }
      return historialViajes;
    }

    return [];
  } catch (error) {
    console.error('Error al obtener historial de viajes:', error);
    throw error;
  }
}

async obtenerHistorialViajesCliente(usuarioid: number): Promise<any[]> {
  try {
    const result = await this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM pasajeros JOIN usuario ON pasajeros.userid = usuario.usuarioid JOIN viaje ON pasajeros.viajeid = viaje.idviaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid WHERE pasajeros.userid = ?', [usuarioid]);
    });

    if (result.rows.length > 0) {
      const historialViajes = [];
      for (let i = 0; i < result.rows.length; i++) {
        historialViajes.push(result.rows.item(i));
      }
      return historialViajes;
    }

    return [];
  } catch (error) {
    console.error('Error al obtener historial de viajes del cliente:', error);
    throw error;
  }
}

async obtenerInfoViaje(viajeId: number): Promise<any | null> {
  try {
    const result = await this.crearDB().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM viaje WHERE idviaje = ?', [viajeId]);
    });

    if (result.rows.length > 0) {
      return result.rows.item(0);
    }

    return null;
  } catch (error) {
    console.error('Error al obtener información del viaje:', error);
    throw error;
  }
}


mostrarAlerta(header: string, message: string) {
  this.alertController.create({
    header: header,
    message: message,
    buttons: ['OK']
  }).then(alert => alert.present());
}
}

/* probar mezclar}

obtenerDisponibilidadViajeConductor(userId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this.crearDB().then((db: SQLiteObject) => {
      const query = 'SELECT viaje.disponible FROM viaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid WHERE vehiculo.userid = ? ORDER BY idviaje DESC LIMIT 1';
      const params = [userId];

      db.executeSql(query, params).then((result) => {
        if (result.rows.length > 0) {
          const disponibilidad = result.rows.item(0).disponible;
          return disponibilidad === 1; // Devuelve true si la disponibilidad es 1 (true), de lo contrario, devuelve false
        }
        return false;
      });
    }).catch(error => {
      console.error('Error al ver vehículo en la base de datos:', error);
      throw error;
    });
  });
}


verificarVehiculoRegistrado(userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.crearDB().then((db: SQLiteObject) => {
        const query = 'SELECT COUNT(*) as count FROM vehiculo WHERE userid = ?';
        const params = [userId];

        db.executeSql(query, params).then((result) => {
          const count = result.rows.item(0).count;
          resolve(count > 0); // Retorna true si hay al menos un vehículo registrado para el usuario
        }).catch(error => {
          console.error('Error al ver vehículo en la base de datos:', error);
          throw error;
        });
      }).catch(error => {
        console.error('Error al ver vehículo en la base de datos:', error);
        throw error;
      });
    });
  }




"SELECT * FROM viaje JOIN vehiculo ON viaje.autoid = vehiculo.autoid JOIN usuario ON vehiculo.userid = usuario.usuarioid  ", []


guarda
obtenerPasajerosalviaje(viajeid: number) {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT * FROM pasajeros WHERE viajeid = ?", [viajeid]).then(data => {
      let prueba = [];
      for (let i = 0; i < data.rows.length; i++) {
        prueba.push(data.rows.item(i));
      }
      return prueba;
    });
  });
}


obtenerPasajerosPorelviaje(viajeid: number): Promise<any[]> {
  return this.crearDB().then((db: SQLiteObject) => {
    return db.executeSql("SELECT userid AS usuario FROM pasajeros WHERE viajeid = ?", [viajeid])
      .then(data => {
        let pasajerose = [];
        for (let i = 0; i < data.rows.length; i++) {
          pasajerose.push(data.rows.item(i));
        }
        return pasajerose;
      });
  });
}


try {
      const db = await this.crearDB();
      const query = 'SELECT * FROM viaje WHERE idviaje = ?';
      const result = await db.executeSql(query, [idviaje]);

      if (result.rows.length > 0) {
        // Si hay resultados, devolver la primera fila (asumiendo que idviaje es único)
        return result.rows.item(0);
      } else {
        // No se encontró ningún viaje con el id proporcionado
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del viaje:', error);
      throw error;
    }
*/

/*
INNER JOIN vehiculo f on v.autoid = f.autoid
INNER JOIN usuario u ON f.userid = u.usuarioid;`; //cambiar a userid o usuarioid
*/