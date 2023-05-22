-- Crea el usuario systemas con permisos de root
-- Se puede cambiar el password por el que se desee
-- Solo se ejcuta al crear el contendor, aunque se reincie 
-- el contenedor no se vuelve a ejecutar.
-- Se puede ejecutar manualmente en el pgadmin, sin necesidad
-- de recrear el contenedor simplemente copias el comando
-- y lo ejecutas en el apartado de sql.
CREATE ROLE systemas WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'passwordAElegir';