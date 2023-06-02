const { Translate } = require("@google-cloud/translate").v2;
const fs = require("fs");
const translate = new Translate({
  key: "AIzaSyBgTt5hphWOtSN38NP5hA4VOBZ8nylatmg",
});

async function quickStart(text) {
  const target = "en"; //idiomas
  const [translation] = await translate.translate(text, target);
  return translation;
}

try {
  // coloca el archivo en la raiz del proyecto en donde esta package.json ejemplo ./CatTipopago.ts
  const rutaArchivo = "./CatPuntoVenta.ts";
  const nuevoNombre = rutaArchivo.replace("./", "").replace(".", "_Traducido.");
  let archivoEnTexto = "";

  fs.readFile(rutaArchivo, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contenidoArchivo = data;

    archivoEnTexto = contenidoArchivo;
    const palabras = archivoEnTexto.split(" ");
    let palabraDetectada = "";

    let nuevoArchivo = [];

    //palabra que seran ignoradas en la ejecucion
    const palabrasAIgnorar = [
      "schema:",
      "type:",
      "name:",
      "onDelete:",
      "onUpdate:",
      "referencedColumnName:",
    ];

    //palabras especificas que quieres modificar, dejarlos en minuscula
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
    ];

    console.log("espere............");

    async function translateWords() {
      for (const palabra of palabras) {
        if (
          palabra != palabrasAIgnorar[0] &&
          palabra != palabrasAIgnorar[1] &&
          palabra != palabrasAIgnorar[2] &&
          palabra != palabrasAIgnorar[3] &&
          palabra != palabrasAIgnorar[4] &&
          palabra != palabrasAIgnorar[5]
        ) {
          if (palabra.includes(":")) {
            palabraDetectada = palabra.replace(":", "");
            const palabraEnIngles = await quickStart(palabraDetectada);

            var palabraSeparadas = palabraEnIngles.split(/(?=[A-Z])/);

            let palabraModificada = [];

            palabraSeparadas.map((item, index) => {
              let palabraEncontrada = palabrasIngles?.find((ingles, index) => {
                return ingles.actual
                  .toLocaleLowerCase()
                  .includes(item.toLocaleLowerCase());
              });
              if (palabraEncontrada) {
                if (item.charAt(0) == item.charAt(0).toUpperCase()) {
                  let mayuscula =
                    palabraEncontrada.traducido.charAt(0).toUpperCase() +
                    palabraEncontrada.traducido.slice(1);

                  palabraModificada.push(mayuscula);
                } else {
                  palabraModificada.push(palabraEncontrada.traducido);
                }
              } else {
                palabraModificada.push(item);
              }
            });

            if (palabraModificada.length != 0) {
              let palabraUnida = palabraModificada.join("");
              nuevoArchivo.push(palabraUnida + ":");
            } else {
              nuevoArchivo.push(palabraEnIngles + ":");
            }
          } else {
            nuevoArchivo.push(palabra);
          }
        } else {
          nuevoArchivo.push(palabra);
        }
      }
      let resultado = nuevoArchivo.join(" ");
      fs.writeFile(nuevoNombre, resultado, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("El archivo se ha generado exitosamente.");
      });
    }

    translateWords();
  });
} catch (error) {
  console.log(error);
}
