## Módulo 4: Ejercicio de evaluación final: Cocktails API

### 1. Descripción del proyecto

Se desarrolló una API REST para gestionar cocktails, pensando en que pudiese ser utilizada por una página 
que contenga un menú online.
Cada cocktail cuenta con la siguiente información:

- Nombre
- Ingredientes
- Autor
- Precio

La API permite:

- Listar los cocktails
- Guardar un cocktail
- Modificar un cocktail existente
- Buscar un cocktail por su nombre


### 2. Instrucciones para utilizar la API

A continuación se describe cada uno de los endpoints disponibles:


### Obtener todos los cócteles:

#### Método: GET
**URL**: http://localhost:3002/cocktails

*Descripción*: Este endpoint permite obtener la lista completa de cócteles disponibles.


### Obtener un cóctel específico:

#### Método: GET
URL: http://localhost:3002/cocktails/:id

*Descripción*: Este endpoint permite obtener los detalles de un cóctel específico utilizando su id.
Variables de ruta: id (el identificador del cóctel)


### Eliminar un cóctel:

#### Método: DELETE
URL: http://localhost:3002/cocktails/:id

*Descripción*: Este endpoint permite eliminar un cóctel específico utilizando su id.
Variables de ruta: id (el identificador del cóctel)

### Crear un nuevo cóctel:

#### Método: POST
URL: http://localhost:3002/cocktails

*Descripción*: Este endpoint permite crear un nuevo cóctel proporcionando los datos necesarios en el cuerpo de la solicitud.
Cuerpo de la solicitud (ejemplo en formato JSON):
```
{
"nombre": "cocktail name",
"ingredientes": "ingrediente1,ingrediente2,ingrediente3",
"autor": "nombre autor",
"precio": 10
}
```

### Modificar un cóctel existente:

#### Método: PUT
URL: http://localhost:3002/cocktails/1

*Descripción*: Este endpoint permite actualizar los datos de un cóctel existente proporcionando los nuevos datos en el cuerpo de la solicitud.
Cuerpo de la solicitud (ejemplo en formato JSON):

```
{
"nombre": "new name",
"ingredientes": "new ingredients",
"autor": "new autor",
"precio": 11
}
```


<br />
María Francisca Espinoza