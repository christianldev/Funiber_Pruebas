const Cancion = require('./Cancion');

class Cancionero {
  constructor() {
    this.canciones = [
      new Cancion(["brr", "fiu", "cric-cric", "brrah"]),
      new Cancion(["pep", "birip", "trri-trri", "croac"]),
      new Cancion(["bri-bri", "plop", "cric-cric", "brrah"])
    ];
  }

  obtenerSonidosRestantes(sonido) {
    for (let cancion of this.canciones) {
      const sonidos = cancion.sonidosRestantes(sonido);
      if (sonidos.length > 0 || (sonido === "brrah" || sonido === "croac")) {
        return sonidos;
      }
    }
    return [];
  }
}

module.exports = Cancionero;