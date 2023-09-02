import { agregarZoom, volverArrastrable } from './movimiento';
import { lagrange, polinomio } from '../metodos/lagrange';
import { minimosCuadrados } from '../metodos/minimos_cuadrados';
import { splinesCubicos, polinomioSpline } from '../metodos/splines_cubicos';

// CLASES

export class Grafico {
	divHTML;
    ventanaHTML;
	btnAgregarPuntosAct = false;
	puntos  = [];
	puntosX = [];
	puntosY = [];

	constructor() {
		this.divHTML = document.querySelector('.grafico');
        this.ventanaHTML = document.querySelector('.ventana');
        volverArrastrable( this.divHTML, this.ventanaHTML );
		agregarZoom( this.divHTML );
		this.divHTML.addEventListener( 'click', (e) => {
			if( this.btnAgregarPuntosAct ) {
				const posX = e.clientX - this.divHTML.offsetLeft,
					  posY = e.clientY - this.divHTML.offsetTop,
					  nuevoPunto = new Punto( posX, posY );
				this.agregarPunto( nuevoPunto );
				this.puntos.push( nuevoPunto );
				this.puntosX.push( nuevoPunto.x );
				this.puntosY.push( nuevoPunto.y);
			}
		} );
	}
	agregarPunto( punto ) {
		punto.divHTML.style.top  = `${ (punto.y / this.divHTML.offsetHeight ) * 100 }%`;
		punto.divHTML.style.left = `${ (punto.x / this.divHTML.offsetWidth ) * 100 }%`;
		this.divHTML.append( punto.divHTML );
	}
	agregarLinea( linea ) {
		linea.divHTML.style.width = `${ (linea.largo / this.divHTML.offsetWidth) * 100 }%`;
		this.divHTML.append( linea.divHTML );
	}
	graficarFuncion( f ) {
		const h = 5.;
		let x = 0., y;
		while( x < this.divHTML.offsetWidth ) {
			y = f( x );
			if( y < this.divHTML.offsetHeight )
				this.agregarPunto( new Punto( x, y ) );
			x += h;
		}
	}
	borrarTodo() {
		this.divHTML.replaceChildren('');
		this.puntos  = [];
		this.puntosX = [];
		this.puntosY = [];
	}
	toggleBtnAgregarPuntos() {
		this.btnAgregarPuntosAct = !this.btnAgregarPuntosAct;
	}
	obtenerCoefLagrange() { 
		return lagrange( this.puntosX, this.puntosY ); 
	}
	obtenerCoefMinimosCuadrados( numTerminos ) {
		return minimosCuadrados( this.puntosX, this.puntosY, numTerminos );
	}
	obtenerCoefSplinesCubicos() {
		return splinesCubicos( this.puntosX, this.puntosY );
	}
	graficarPolinomio( coef ) {
		this.graficarFuncion( ( x ) => polinomio(x, coef) );
	}
	graficarSplinesCubicos() {
		const h = 1;
		let coef = this.obtenerCoefSplinesCubicos(),
			x = this.puntosX[0];
		for( let i = 0; i < this.puntosX.length - 1; i++ ) {
			while( x < this.puntosX[i+1] ) {
				this.agregarPunto( new Punto( x, polinomioSpline(x, coef[i], this.puntosX[i]) ) );
				x += h;
			}
		}
	}
	
}

export class Punto {
	x;
	y;
	divHTML;
	constructor( x, y ) {
		this.x = x;
		this.y = y;
		this.divHTML = document.createElement('div');
		this.divHTML.className  = 'punto';
	}
}

export class Linea {
	pto1;
	pto2;
	largo;
	divHTML;
	constructor( pto1, pto2 ) {
		const deltaY = pto2.y - pto1.y,
			  deltaX = pto2.x - pto1.x;
		this.pto1 = pto1;
		this.pto2 = pto2;
		this.divHTML = document.createElement('div');
		this.divHTML.className = 'linea';
		this.largo = Math.sqrt( deltaX ** 2. + deltaY ** 2. );
		this.divHTML.style.transform = `rotate(${ Math.atan2( deltaY, deltaX ) }rad)`;
		this.divHTML.style.top  = pto1.divHTML.style.top;
		this.divHTML.style.left = pto1.divHTML.style.left;
	}
}

// FIN CLASES