El despliegue de la aplicación se realiza con el siguiente comando
```console
docker-compose up --build
```

<h2>Base de datos</h2>

En <http://localhost:5050> se puede acceder a pgadmin para ver la base de datos.<br>
- usuario: root@example.com
- contraseña: root

He escogido Postgres porque es el que más me gusta, pero se puede cambiar por otro.<br>
Una vez dentro de pgadmin hay que ir a la pestaña de servers y crear un nuevo servidor.<br>
Los datos de conexión son:
- Nombre de la conexion corazon_virtual
- Hostname: postgres
- Username: root
- Password: root

En un futuro se añadira persistencia para que no sea necesario volver a configurar cada vez que se levante el contenedor.

<h2>Backend</h2>

No es necesario utilizar Postman para probar la api, tenemos una documentacion interactiva en <http://localhost:8000/swagger/index.html>

<h3>Comandos para ejecutar las migraciones de la base de datos</h3>

Para aplicar la migracion a la base de datos se utiliza el comando
```console
dotnet ef database update
```
Para que el comando funcione es necesario cambiar la dirección de la base de datos en la línea 15 de Program.cs, debe sustituirse postgres por localhost.
