# Bunker DB Challenge

## Como ejecutar el proyecto

```
docker-compose up
```

Esto crea un container de NestJs en el puerto` 3000`

Se mostrara en los logs la URL para acceder al Swagger que tiene los endpoints implementados

## Explicacion de logica
Se establece e infiere que una empresa puede crear multiples campañas de Marketing en distintas plataformas a las cuales
ofrecemos integración. Cada una de estas plataformas tendrá sus propias reglas de interacción: por ejemplo, si fuese una red social
tendríamos como interacciones la opción de poner 'me gusta', 'comentar', 'compartir', etc. 
Cada campaña puede estar en más de una Plataforma a la vez. 
Para tener un control total de la cantidad de interacciones, y así, 'relevancia' de nuestras campañas, se crea un conglomerado
de interacciones por cada plataforma a la cual esa campaña esté desplegada. Esta tabla en la base de datos tendrá, para cada tipo de interacción
disponible en una plataforma, la cantidad de veces que se interactuó de determinada manera.

Las interacciones serán guardadas en una tabla de Dynamo con el objetivo de que esos registros se guarden para su uso en post-procesamiento. Por ejemplo,
al guardar la información de los usuarios, se podrían elaborar informes estadísticos en los cuales podríamos observar información de relevancia. Por ejemplo, 
podríamos ver la diferencia entre la forma de interacción de personas de distinto sexo para una misma campaña.

Las interacciones vendrán a través de un endpoint que disponibilizaremos el cual se infiere que se implementará como Webhook para disponibilizarlo
en las plataformas que querramos.

En base a esto, se infiere que hay un frontend que permite al usuario cargar una campaña de marketing y disponibilizarla en las plataformas que el quiera
siempre y cuando nosotros tengamos disponible su procesamiento en nuestro sistema para poder registrar las interacciones que correspondan.

## Lógica de procesamiento de Interacciones
Las interacciones, como mencionamos antes, vendrían a través de un Webhook. Para la simplificación del challenge se tomó en cuenta
el caso en el que todas las interacciones vienen de la misma manera independientemente de la plataforma en la cual haya surgido esa interacción.

Lo ideal para este caso sería que, al registrar en nuestro sistema las plataformas, podramos tener mapeadas las configuraciones
de cada una de estas plataformas para poder saber como interactuar con estos eventos. Esta configuración podría guardarse en base de datos, e incluso
se podría tener un middleware que reciba los eventos y los mapee al formato desarrollado para el endpoint /interactions de este servidor.

Una vez recibida la interacción se procede a aumentarle la cantidad de interacciones de ese tipo para esa plataforma, se guarda en la base 
de datos no relacional(DynamoDB) y se envía un evento al sistema de mensajeria correspondiente.

Acá para hacer una salvedad está implementado solamente con una queue de Rabbit pero lo ideal, para tener una arquitectura mas limpia, sería poder publicarlo en
un Tópico y suscribir los recursos correspondientes a ese tópico para no depender exclusivamente de una Queue y poder hacer la arquitectura más escalable. Así 
el día de mañana puedo cambiar la suscripción con mayor facilidad para poder procesar los eventos.

Además podríamos cargar reglas en base de datos personalizadas según la empresa que las crea para que al momento de llegar a una cantidad X
de interacciones, aumentar el presupuesto, bajarlo, aumentar el presupuesto en una plataforma exitosa mientras lo bajamos en una un poco menos.


## Arquitectura del proyecto a nivel repositorio
Trabajar con NestJS supuso un desafío a nivel modular. Se trató de implementar algo similar a una arquitectura hexagonal en donde dejamos los puntos de entrada
y salida de la aplicación ajenos a la lógica de procesamiento e interfaseados en todo momento para poder reemplazarlos según el caso. 