import { Grafico, Punto, Linea } from './src/grafico/grafico';


const grafico = new Grafico();

// TESTEO
const pto1 = new Punto(500, 500),
      pto2 = new Punto(700, 700);

grafico.agregarPunto( pto1 );
grafico.agregarPunto( pto2 );
grafico.agregarPunto( new Punto(800, 1200) );
grafico.agregarLinea( new Linea( pto1, pto2 ) );
grafico.graficarPolinomio( grafico.obtenerCoefMinimosCuadrados(5) );

const funcion1 = ( x ) => 2 * x;

grafico.graficarFuncion( funcion1 );

// FIN TESTEO