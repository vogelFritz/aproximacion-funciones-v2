import { Grafico, Punto, Linea } from './src/grafico/grafico';

const grafico = new Grafico();

// BOTONES

const btnLimpiar = document.querySelector('#btn-limpiar'),
      btnAgregarPuntos = document.querySelector('#btn-agregar-puntos'),
      btnLagrange = document.querySelector('#btn-lagrange'),
      btnMinimosCuadrados = document.querySelector('#btn-min-cuadrados'),
      btnSplinesCubicos = document.querySelector('#btn-splines-cubicos');
btnLimpiar.addEventListener('click', () => {
    grafico.borrarTodo();
});

btnAgregarPuntos.addEventListener('click', () => {
    grafico.toggleBtnAgregarPuntos();
});

btnLagrange.addEventListener( 'click', () => {
    grafico.graficarPolinomio( grafico.obtenerCoefLagrange() );
} );

btnMinimosCuadrados.addEventListener('click', () => {
    grafico.graficarPolinomio( grafico.obtenerCoefMinimosCuadrados(5) );
});

btnSplinesCubicos.addEventListener( 'click', () => {
    grafico.graficarSplinesCubicos();
} );

// FIN BOTONES
