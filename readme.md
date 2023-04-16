Por el momento el docker compose solo lanza la base de datos, pero en un futuro se lanzarán los servicios de la aplicación.

<h2>Base de datos</h2>

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

<h2>Backend</h2>

Para lanzar el back de momento no utiliceis docker, ya que no esta configurado para ello y falla la conexion a la base de datos.
El back se puede lanzar con
```console
dotnet run
```

No es necesario utilizar Postman para probar la api, tenemos una documentacion interactiva en localhost:8000/swagger/index.html

<h3>Comandos para ejecutar las migraciones de la base de datos</h3>
Cuando creeis un modelo la migracion se genera automaticamente con el comando
```console
dotnet ef migrations add InitialCreate
```
Sustituyendo InitialCreate por el nombre que querais darle a la migracion.

Para aplicar la migracion a la base de datos se utiliza el comando
```console
dotnet ef database update
```

<h2>Frontend</h2>
En el front aun no se ha añadido docker, pero se añadirá en un futuro.

De momento se puede lanzar con
```console
npm run dev
```
