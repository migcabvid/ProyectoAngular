# Documentación del Proyecto Angular

## 1. Descripción
Este es un proyecto cuyo objetivo es aprender a utilizar **Angular** para el frontend y **Quarkus** para el backend, con **MySQL** como base de datos.

## 2. Estructura del Proyecto (Monorepo)
```
/ProyectoAngular
│── /angularProyect  (Aplicación Angular)
│── /quarkusBackend   (Aplicación Quarkus)
│── README.md
```

## 3. Tecnologías y Versiones Utilizadas
- **Angular CLI:**  19.1.8       
- **Node:** 22.14.0
- **Package Manager:** npm 11.1.0
- **OS:** win32 x64
- **Quarkus:** 3.18.3
- **Base de datos:** MySQL

## 4. Backend - Quarkus
### 4.1 Instalación y Configuración
Requisitos previos:
- Tener **Maven** instalado. (Recomendado: Apache Maven 3.9.9)
- Tener **Java 17+** instalado. (Recomendado: JDK 21.0.6)

#### Pasos para ejecutar el backend:
1. Ingresar a la carpeta `quarkusBackend`:
   ```sh
   cd quarkusBackend
   ```
2. Ejecutar Quarkus en modo desarrollo:
   ```sh
   mvn quarkus:dev
   ```
3. El backend se ejecuta por defecto en: `http://localhost:8080`

### 4.2 Configuración de Base de Datos (MySQL)

Requisitos previos:
- Tener un Usuario en Xamp con Username: **usuario** y Contraseña: **usuario** o editarlo.


Editar el archivo `application.properties` dentro de `src/main/resources`:
```properties
quarkus.datasource.db-kind=mysql
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/proyecto_angular_quarkus
quarkus.datasource.username=usuario
quarkus.datasource.password=usuario
quarkus.hibernate-orm.database.generation=update
```

- Si se utiliza xamp deberas descomentar la linea 8 del archivo `application.properties` dentro de `src/main/resources`

## 5. Frontend - Angular
### 5.1 Instalación y Ejecución
Requisitos previos:
- Tener **Node.js** instalado
- Tener **Angular CLI** instalado (`npm install -g @angular/cli`)

#### Pasos para ejecutar el frontend:
1. Ingresar a la carpeta `angularProyect`:
   ```sh
   cd angularProyect
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar el proyecto:
   ```sh
   ng serve
   ```
4. La aplicación estará disponible en `http://localhost:4200`

## 6. Como desplegar el proyecto
En el directorio **`quarkusBackend`**:
- Ingresar comando en la terminal: `mvn quarkus:dev`

En el directorio **`angularProyect`**:
- Ingresar comando enla terminal: `ng serve`
