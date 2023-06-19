El despliegue de la aplicación se realiza con el siguiente comando
```console
docker-compose up --build
```

<h2>Base de datos</h2>

En <http://localhost:5050> se puede acceder a pgadmin para ver la base de datos.<br>
- usuario: root@example.com
- contraseña: root

Una vez dentro de pgadmin hay que ir a la pestaña de servers y crear un nuevo servidor.<br>
Los datos de conexión son:
- Nombre de la conexion corazon_virtual
- Hostname: postgres
- Username: root
- Password: root


<h3>Backend</h3>

No es necesario utilizar Postman para probar la api, tenemos una documentacion interactiva en <http://localhost:8000/swagger/index.html>

> <h3>Imagenes</h3>
> Las imágenes que se quieran tener disponibles desde el inicio de la aplicación deeberán ir alojadas en la carpeta public.
> Si no existen las correspondientes subcarpetas deberán ser creadas para poder acceder a dichar archivos.
>
>> **images** : sera la carpeta en la que se deberan alojar los archivos *.png/.jpg/.jpeg*.
>
>> **images3d** : sera la carpeta donde se deberán alojar los archvivos de modelos 3d *.fbx*

<h3>Comandos para ejecutar las migraciones de la base de datos</h3>

Para aplicar la migracion a la base de datos se utiliza el comando
```console
dotnet ef database update
```
Para que el comando funcione es necesario cambiar la dirección de la base de datos en la línea 15 de Program.cs, debe sustituirse postgres por localhost.
