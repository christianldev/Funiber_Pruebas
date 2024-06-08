class Cancion {
    constructor(notas) {
      this.notas = notas;
    }
  
    sonidosRestantes(sonido) {
      const index = this.notas.indexOf(sonido);
      if (index !== -1) {
        if (sonido === "brrah" || sonido === "croac") {
          return [];
        }
        return this.notas.slice(index + 1);
      }
      return [];
    }
  }
  
  module.exports = Cancion;