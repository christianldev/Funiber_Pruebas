const Cancionero = require('./Classes/Cancionero');

// Crear instancia de Cancionero
const cancionero = new Cancionero();

// Pruebas
console.log(cancionero.obtenerSonidosRestantes("brr"));     // Debería imprimir ['fiu', 'cric-cric', 'brrah']
console.log(cancionero.obtenerSonidosRestantes("birip"));   // Debería imprimir ['trri-trri', 'croac']
console.log(cancionero.obtenerSonidosRestantes("plop"));    // Debería imprimir ['cric-cric', 'brrah']
console.log(cancionero.obtenerSonidosRestantes("croac"));   // Debería imprimir []
console.log(cancionero.obtenerSonidosRestantes("brrah"));   // Debería imprimir []

// Ejemplos adicionales
console.log(cancionero.obtenerSonidosRestantes("pep"));     // Debería imprimir ['birip', 'trri-trri', 'croac']
console.log(cancionero.obtenerSonidosRestantes("bri-bri")); // Debería imprimir ['plop', 'cric-cric', 'brrah']