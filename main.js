import { Grafico, Punto, Linea } from './src/grafico/grafico';

const grafico = new Grafico();

// BOTONES

const btnLimpiar = document.querySelector('#btn-limpiar'),
      btnAgregarPuntos = document.querySelector('#btn-agregar-puntos'),
      btnLagrange = document.querySelector('#btn-lagrange');
btnLimpiar.addEventListener('click', () => {
    grafico.borrarTodo();
});

btnAgregarPuntos.addEventListener('click', () => {
    grafico.toggleBtnAgregarPuntos();
});

btnLagrange.addEventListener( 'click', () => {
    grafico.graficarPolinomio( grafico.obtenerCoefLagrange() );
} );


// FIN BOTONES
