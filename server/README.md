<!-- @format -->

# Prueba técnica de Xepelin

Parte 2: Backend
Tecnologías: Express o NestJS, Jest
Desarrolla una API con los siguientes endpoints:

1. POST /accounts: Crea una nueva cuenta bancaria. Este endpoint debería aceptar
   detalles de la cuenta como el nombre y el número de cuenta, y devolver un ID de
   cuenta.
2. POST /transactions: Realiza una transacción bancaria. Este endpoint debería
   aceptar detalles de la transacción como el ID de la cuenta, el tipo de transacción
   (depósito o retiro) y el monto de la transacción.
   Además, implementa un middleware que registre en la consola cada vez que se realiza un
   depósito de más de 10,000 US$.
   Implementa pruebas unitarias con Jest y asegúrate de que la cobertura de las pruebas sea
   completa. Incluye un archivo README que explique cómo ejecutar el código y las pruebas.

## Requisitos

- Node.js
- npm

## Configuración

1. Clona el repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
cd xepelin-challenge/server
```

## Iniciar el proyecto

1. Instala las dependencias:

```bash
npm install
```

2. Copiar variables de entorno del .env.example

Debes copiar las variables de entorno del archivo .env.example a un nuevo archivo .env y reemplazar los valores por los que correspondan.

3. Inicia el proyecto:

```bash
npm run build && npm start
```

El servidor se iniciará en [http://localhost:3000](http://localhost:3000) (o el puerto que definas en el .env)

## Ejecutar pruebas

```bash
npm run test
```

## Colección de POSTMAN

Se agregó al directorio el JSON de la colección de POSTMAN para probar los endpoints de la API.

<!-- server/Xepelin Challenge.postman_collection.json -->
