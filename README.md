# Examen de frontend usando Vite + React + Typescript

## Instalación

1. Clonar este repositorio
2. Escribir `yarn`, `npm install` o equivalente en la línea de comandos.
3. Correr usando el comando `dev`. Ej. `yarn dev`, `npm run dev`...

## Documentación

Todo el código que compone este examen se encuentra dentro de la carpeta /src. En la carpeta components se encuentran todos los componentes que conforman la aplicación, mas no la aplicación como tal.

La aplicación es un Single Page App, en el archivo main.tsx se encuentra el componente de la aplicación encapsulada dentro de un
BrowserRouter. La aplicación como tal está definida en el archivo App.tsx.

En el archivo App.tsx se encuentran los componentes requeridos para el Sidebar, Toaster y ruteo. El ruteo está hecho de forma que únicamente son válidos los enlaces que apuntan directamente a un ejercicio, de lo contrario; se redirigirá al ejercicio 1.

Cada uno de los ejercicios están incluidos en la carpeta components y están definidos completamente en un único archivo.

### Navegación

Al correr el servidor se presentará una página con un Sidebar de navegación y a su lado el contenido del ejercicio.

### Ejercicio 1

Contiene un botón que al presionarse cambia el texto que encapsula.

### Ejercicio 2

Contiene un contador con sus botones respectivos para incrementar y decrementar.

### Ejercicio 3

Contiene una lista de nombres estática.

### Ejercicio 4

Contiene un CRUD sencillo falso que hace peticiones a jsonplaceholder.
