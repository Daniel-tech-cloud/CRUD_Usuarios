CREATE DATABASE Usuario;
USE Usuario;

/*Create*/
CREATE TABLE DatosUsuario
(
	id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nombre VARCHAR(25) NOT NULL,
    apPaterno VARCHAR(25) NOT NULL,
    apMaterno VARCHAR(25) NOT NULL
);

CREATE TABLE Usuario
(
	id INT NOT NULL ,
	pass VARCHAR(23) NOT NULL,
	FOREIGN KEY (id) REFERENCES DatosUsuario(id)
);


/*Insert*/

INSERT INTO DatosUsuario (nombre, apPaterno, apMaterno)
VALUES("","","");

INSERT INTO Usuario (id, pass)
VALUES("","");


/* Read */
SELECT * 
FROM Usuario
WHERE id = ;

SELECT * FROM DatosUsuario
WHERE id = ;

/* Update */
UPDATE DatosUsuario
SET nombre = "", apPaterno = "", apMaterno = ""
WHERE id = ;

UPDATE Usuario
SET pass = "" WHERE pass = "" AND id = ;

/* Delete */
DELETE FROM DatosUsuario
WHERE id =;

DELETE FROM Usuario
WHERE id =;










