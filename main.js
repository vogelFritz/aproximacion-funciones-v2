import { Grafico, Punto, Linea } from './src/grafico/grafico';

const grafico = new Grafico();

// BOTONES

const btnLimpiar = document.querySelector('#btn-limpiar'),
      btnAgregarPuntos = document.querySelector('#btn-agregar-puntos'),
      btnLagrange = document.querySelector('#btn-lagrange'),
      btnSplinesCubicos = document.querySelector('#btn-splines-cubicos'),
      formMinimosCuadrados = document.querySelector('.form-min-cuadrados');
btnLimpiar.addEventListener('click', () => {
    grafico.borrarTodo();
});

btnAgregarPuntos.addEventListener('click', () => {
    grafico.toggleBtnAgregarPuntos();
});

btnLagrange.addEventListener( 'click', () => {
    grafico.graficarPolinomio( grafico.obtenerCoefLagrange() );
} );

// btnMinimosCuadrados.addEventListener('click', () => {
//     grafico.graficarPolinomio( grafico.obtenerCoefMinimosCuadrados(5) );
// });

btnSplinesCubicos.addEventListener( 'click', () => {
    grafico.graficarSplinesCubicos();
} );

formMinimosCuadrados.addEventListener( 'submit', (e) => {
    let grado;
    e.preventDefault();
    const formData = new FormData( formMinimosCuadrados );
    grado = formData.get( 'grado-minimos-cuadrados' );
    grafico.graficarPolinomio( grafico.obtenerCoefMinimosCuadrados(grado) );
} );

// FIN BOTONES
