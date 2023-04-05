Por el momento el docker compose solo lanza la base de datos, pero en un futuro se lanzarán los servicios de la aplicación.

En localhost:5050 se puede acceder a pgadmin para ver la base de datos.
El usuario es root@example.com y la contraseña es root.
He escogido Postgres porque es el que más me gusta, pero se puede cambiar por otro.
Una vez dentro de pgadmin hay que ir a la pestaña de servers y crear un nuevo servidor.
Los datos de conexión son:
- Nombre de la conexion corazon_virtual
- Hostname: postgres
- Username: root
- Password: root

En un futuro se añadira persistencia para que no sea necesario volver a configurar cada vez que se levante el contenedor.

En el back se ha añadido un dockerfile que levanta una imagen de docker con .net pero aun no se ha añadido al docker compose.
Para lanzar el back teneis las instrucciones en el readme del back.

En el front aun no se ha añadido docker, pero se añadirá en un futuro.
De momento se puede lanzar con npm run dev.


No es necesario utilizar Postman para probar la api, tenemos una documentacion interactiva en localhost:8000/swagger/index.html


##Comandos para ejecutar las migraciones de la base de datos
dotnet ef migrations add InitialCreate
dotnet ef database update