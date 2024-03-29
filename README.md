# Filtro-Promiedos

Este código Javascript permite filtrar ligas y partidos dentro de la página [**PROMIEDOS**](https://www.promiedos.com.ar).
Debe ser ejecutado a través de extensiones del navegador que permitan correr código Javascript, como [**TamperMonkey**](https://www.tampermonkey.net/).

## Filtrar ligas
Permite ocultar ligas por completo, o solo parcialmente.
Por ejemplo, si de la liga **MLS** sólo me interesan los partidos del **Inter Miami**, entonces en el array **leaguesToHide**, agrego un objeto de las siguientes características:

```
{name: "MLS", show: ["Inter Miami"]}
```

De ésta manera, la liga **MLS** permanecerá oculta, excepto cuando haya un partido del **Inter Miami**.

## Filtrar menúes
También permite el ocultamiento de items en el menú lateral de la web. Para configurar esto, en la variable **hideMenues** hay que agregar un objeto con el atributo **menu** y el 
nombre de la sección del menú, y un atributo **hide**, que será un array con los elementos que serán ocultados.
Vamos al ejemplo de querer filtrar el submenú "Ligas". Así luce por defecto:

![Captura de pantalla de 2024-03-29 07-46-38](https://github.com/Laureano194/Filtro-Promiedos/assets/67939198/64642c27-3c17-409b-93a0-b4e72de50cba)

Le agregamos al array **hideMenues** el siguiente objeto:

```
{
  menu: "Ligas",
  hide: ["Chile", "Liga MX", "Leagues", "Paraguay", "Uruguay", "Colombia", "Eredivisie"]
}
```

Así va a mostrarse el menú en la siguiente recarga:

![Captura de pantalla de 2024-03-29 07-50-33](https://github.com/Laureano194/Filtro-Promiedos/assets/67939198/9d726192-5560-4671-8c03-95734cd43b13)

## Implementacion
En este caso, vamos a hacerlo mediante la extensión **TamperMonkey**.
1. Instalar la extensión [**TamperMonkey**](https://www.tampermonkey.net/) en el navegador.
2. Dentro de la misma, hacer click en **"Agregar nuevo script"**.
   
   ![Captura de pantalla de 2024-03-29 07-57-24](https://github.com/Laureano194/Filtro-Promiedos/assets/67939198/7f00ec50-ae57-4b65-9ad4-784590d34105)
  
3. Te mostrará el siguiente editor:

   ![Captura de pantalla de 2024-03-29 07-59-13](https://github.com/Laureano194/Filtro-Promiedos/assets/67939198/5a992462-cb3c-4635-9d08-52b194d844b7)

  Tenés que reemplazar el contenido del mismo con el de **promiedosFilter.js**.
4. Alterá qué ligas y menúes querés ocultar de acuerdo a lo explicado previamente.
5. Click en **Archivo**, luego en **Guardar** y listo! Si refrescás la página [**Promiedos**](https://www.promiedos.com.ar). ya debería mostrarla con el filtro aplicado.
