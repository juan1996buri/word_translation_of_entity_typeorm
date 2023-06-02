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
  const rutaArchivo = "./CatTipopago.ts";
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
    const palabrasAIgnorar = ["schema:", "type:", "name:"];

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

    async function translateWords() {
      for (const palabra of palabras) {
        if (
          palabra != palabrasAIgnorar[0] &&
          palabra != palabrasAIgnorar[1] &&
          palabra != palabrasAIgnorar[2]
        ) {
          if (palabra.includes(":")) {
            palabraDetectada = palabra.replace(":", "");
            const palabraEnIngles = await quickStart(palabraDetectada);

            var palabraSeparadas = palabraEnIngles.split(/(?=[A-Z])/);
            let palabraModificada = [];
            palabraSeparadas.map((item, index) => {
              palabrasIngles.map((ingles, position) => {
                if (item.includes(ingles.actual)) {
                  if (item.charAt(0) == item.charAt(0).toUpperCase()) {
                    let mayuscula =
                      ingles.traducido.charAt(0).toUpperCase() +
                      ingles.traducido.slice(1);

                    console.log(mayuscula);

                    palabraModificada.push(mayuscula);
                  } else {
                    palabraModificada.push(ingles.traducido);
                  }
                }
              });
            });

            if (palabraModificada.length != 0) {
              nuevoArchivo.push(palabraModificada.join("") + ":");
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
