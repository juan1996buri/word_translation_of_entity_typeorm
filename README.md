# word_translation_of_entity_typeorm

#este proyecto ayuda a traducir a varios idiomas  los nombres de las variables, solo funciona para entidades echas en Tyeorm

ejemplo:

#archivo a traducir:
@Entity("cat_notificaciones_correo", { schema: "integration" })
export class CatNotificacionesCorreo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
  @Column("int", { name: "tipo", unsigned: true, default: () => "'0'" })
  tipo: number;
  @Column("text", { name: "nombre_tipo" })
  nombreTipo: string;
  @Column("text", { name: "correo_envio" })
  correoEnvio: string;
}


#archivo a traducido:

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("cat_notificaciones_correo", { schema: "integration" })
export class CatNotificacionesCorreo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
  @Column("int", { name: "tipo", unsigned: true, default: () => "'0'" })
  type: number;
  @Column("text", { name: "nombre_tipo" })
  nameType: string;
  @Column("text", { name: "correo_envio" })
  mailShipping: string;
}
#tener en cuenta, si el programa no traduce algunas palabras  como, diaMundual
 puedes aumentarlos en el array de palabrasIngles que esta acontinuacion

# si algunas traducciones no estan de acuerdo a tus preferenias los puedes modificar aqui, debe estar en minuscula la traducción
 const palabrasIngles = [
      {
        actual: "tipo",
        traducido: "type",
      },
      {
        actual: "fecha",
        traducido: "date",
      },
      {
        actual: "orden",
        traducido: "order",
      },
      {
        actual: "dia",
        traducido: "day",
      },
      {
        actual: "mundial",
        traducido: "world",
      },
    ];

# Importante
- tener instalado node.js
asegurate que el archivo este en la raiz del proyecto
const rutaArchivo = "./CatNotificacionesCorreo.ts";
# ejecucion
npm run start

#ejecutar

