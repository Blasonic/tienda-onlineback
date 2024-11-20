const mysql = require('mysql');


const confConexion = mysql.createPool({
    conecctionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tiendaonline'

})
const tabla = "CREATE TABLE Usuario (id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT," +
    "nombre VARCHAR(100) DEFAULT NULL," +
    "apellido VARCHAR(100) DEFAULT NULL," +
    "correo VARCHAR(100) UNIQUE," +
    "telefono VARCHAR(15) DEFAULT NULL," +
    "tipo_usuario VARCHAR(50)" 
    


//const insertarRegistro = 'INSERT INTO empleados (nombre, apellido, sueldo) VALUE (?,?,?)';
//const consultarDatos='SELECT * FROM empleados'
//const actualizarSueldo = 'UPDATE empleados SET sueldo=? WHERE nombre=? AND apellido=?';
//const borrarRegistro='DELETE FROM empleados WHERE nombre=? AND apellido=?'
const borrarTabla = 'DROP TABLE empleados';


//establecer conexion

confConexion.getConnection(function (error, conexion) {

    //conexion.query(tabla, function (error) {
        //conexion.query(insertarRegistro, ['pepito','salomon', 2400],function (error) {
          //  conexion.query(consultarDatos, ['pepito','salomon', 2400],function (error) {
          //  conexion.query(actualizarSueldo, [3000,'pepito','salomon'],function (error) {
           // conexion.query(borrarRegistro, ['pepito','salomon'],function (error) {
            conexion.query(borrarTabla,function (error) {

        if (error) throw error;
        else {
           // console.log("Tabla creada con exito");
           //console.log("Registro insertado con exito");
           //console.log("Consulta con exito");
           //console.log("Actualizado con exito");
           //console.log("Borrado con exito");
           console.log("Borrada con exito");
        }
    })
    conexion.release();
})