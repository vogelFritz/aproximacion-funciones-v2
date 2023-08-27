import { Grafico, Punto, Linea } from './src/grafico/grafico';


const grafico = new Grafico();

// TESTEO

grafico.agregarPunto( new Punto( 500, 500 ) )

const funcion1 = ( x ) => 2 * x;

grafico.graficarFuncion( funcion1 );

// FIN TESTEO