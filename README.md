# VoizAlarm Web

Proyecto Angular Web con Carbon Design System

Este proyecto es una aplicación web desarrollada en Angular que utiliza Carbon Design System para proporcionar una interfaz de usuario moderna y accesible.

## Estudiante

| Nombre                   | Correo                         |
| ------------------------ | ------------------------------ |
| Wilder López             | w.lopezm@uniandes.edu.co       |
| Sergio Mena Zamora       | s.menaz@uniandes.edu.co        |


## Tabla de Contenidos

- [Introducción](#introducción)
  - [Prerrequisitos](#prerrequisitos)
  - [Configuración del Proyecto](#configuración-del-proyecto)
  - [Clonación del Repositorio](#clonación-del-repositorio)
- [Estructura del Proyecto](#estructura-del-proyecto)
  - [Descripción de los Módulos](#descripción-de-los-módulos)
- [Uso](#uso)
  - [Ejecutar la Aplicación en Desarrollo](#ejecutar-la-aplicación-en-desarrollo)
  - [Construcción para Producción](#construcción-para-producción)

---

## Introducción

Esta aplicación web permite a los usuarios interactuar con un la gestión de sus alarmbas los componentes grafico están basados en carbon design system.

### Prerrequisitos

- **Node.js (versión recomendada: LTS)**: Se recomienda instalar la versión LTS de Node.js. Para verificar:
  ```bash
  node -v
  ```
- **Angular CLI**: Herramienta de línea de comandos para Angular.
  ```bash
  npm install -g @angular/cli
  ```
- **Dependencias del Proyecto**: Asegúrate de instalar todas las dependencias necesarias con:
  ```bash
  npm install
  ```

### Clonación del Repositorio

```bash
git clone https://github.com/smenaz/VoizAlarm
cd VoizAlarm
```

## Estructura del Proyecto

El proyecto sigue una estructura modular que facilita la escalabilidad y el mantenimiento del código.

### Descripción de los Módulos

- **src/app/components/**: Contiene los componentes reutilizables de la interfaz.
- **src/app/services/**: Servicios para la comunicación con la API.
- **src/app/pages/**: Vistas principales de la aplicación.
- **src/assets/**: Contiene imágenes y archivos estáticos.

## Uso

### Ejecutar la Aplicación en Desarrollo

Para iniciar el servidor de desarrollo:
```bash
ng serve
```
Esto iniciará la aplicación en `http://localhost:4200/`.

### Construcción para Producción
Para generar una versión optimizada para producción:
```bash
ng build --prod
```
Los archivos resultantes se encontrarán en `dist/` y pueden ser desplegados en cualquier servidor web.

---

### URL del Repositorio

[Repositorio en GitHub](https://github.com/usuario/proyecto-angular-carbon)

