SHOW DATABASES;
CREATE DATABASE vehiculos;
ALTER DATABASE vehiculos CHARACTER SET utf8 COLLATE utf8_general_ci; -- Cambiar el conjunto de caracteres a utf8
use vehiculos;

CREATE TABLE marca(
    id_marca INT NOT NULL AUTO_INCREMENT,
    activa ENUM('si','no') NOT NULL DEFAULT 'si',
    descripcion VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_marca)
);

SHOW TABLES; -- Verificar si la tabla ha sido creada

CREATE TABLE linea(
    id_linea INT NOT NULL AUTO_INCREMENT,
    activa ENUM('si','no') NOT NULL DEFAULT 'si',
    descripcion VARCHAR(100) NOT NULL,
    id_marca INT NOT NULL,
    CONSTRAINT `pk_id_linea` PRIMARY KEY (id_linea),
    CONSTRAINT `fk_id_marca_linea` FOREIGN KEY (id_marca) REFERENCES marca(id_marca)
);

SHOW TABLES; -- Verificar si la tabla ha sido creada

CREATE TABLE vehiculo(
    placa VARCHAR(6) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    fv_seguro DATE NOT NULL,
    fv_tecnicomecanica DATE NOT NULL,
    id_linea INT NOT NULL,
    CONSTRAINT `pk_placa` PRIMARY KEY (placa),
    CONSTRAINT `fk_id_linea_vehiculo` FOREIGN KEY (id_linea) REFERENCES linea(id_linea)
);

SHOW TABLES; -- verificar si la tabla ha sido creada

ALTER TABLE marca ADD COLUMN nombre_marca VARCHAR(50) NOT NULL;
ALTER TABLE linea ADD COLUMN nombre_linea VARCHAR(100) NOT NULL;

-- Insertar valores iniciales
INSERT INTO marca (activa, descripcion, nombre_marca) VALUES ('si', 'confiable', 'chevrolet'); 
INSERT INTO linea (activa, descripcion, id_marca, nombre_linea) VALUES ('si', 'la mas bonita', 1, 'camaro');
INSERT INTO vehiculo (placa, modelo, fv_seguro, fv_tecnicomecanica, id_linea) VALUES ('PKC206', 'el de transformer', '2023-04-12', '2023-04-12', 1);

-- Eliminacion de un dato de la tabla vehiculo
DELETE FROM vehiculo WHERE placa = 'PKC206';

-- Alterar un dato de la tabla vehiculo
ALTER TABLE vehiculo MODIFY COLUMN modelo INT(4) NOT NULL;

-- Insertar un nuevo valor
INSERT INTO vehiculo (placa, modelo, fv_seguro, fv_tecnicomecanica, id_linea) VALUES ('PKC206', 2004, '2023-04-12', '2023-04-12', 1);

-- Trae el modelo maximo
SELECT MAX(modelo) Modelo_max  FROM vehiculo;
SELECT * FROM vehiculo WHERE modelo = 2019;

-- Trae el modelo minimo
SELECT MIN(modelo) FROM vehiculo;
SELECT * FROM vehiculo WHERE modelo = 2004;

-- Selecciona en un rango de vehiculos
SELECT * FROM vehiculo WHERE fv_seguro BETWEEN '2023-04-12' AND '2023-04-12';

-- Selecciona por el rango de modelos definido
SELECT * FROM vehiculo WHERE modelo BETWEEN 2004 AND 2008;

-- Suma los modelos
SELECT SUM(modelo) from vehiculo;

-- Promedia los modelos
SELECT AVG(modelo) FROM vehiculo;

-- Muestras cuantas lineas estan activas e inactiva
SELECT COUNT(*) FROM linea WHERE activa = 'si';
SELECT COUNT(*) FROM linea WHERE activa = 'no';

-- Renombrar columnas
ALTER TABLE linea RENAME COLUMN descripcion TO descripcion_linea;
ALTER TABLE marca RENAME COLUMN descripcion TO descripcion_marca;

-- Inner Join
SELECT placa, modelo, descripcion_linea, descripcion_marca FROM vehiculo INNER JOIN linea ON vehiculo.id_linea = linea.id_linea INNER JOIN marca ON linea.id_marca = marca.id_marca;

-- Traer todos los registro con el si
SELECT * FROM linea INNER JOIN vehiculo ON linea.id_linea = vehiculo.id_linea WHERE linea.activa = 'si';

-- Modelo Maximo
SELECT MAX(modelo) FROM vehiculo;

-- Modelo Minimo
SELECT MIN(modelo) FROM vehiculo;



