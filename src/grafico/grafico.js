import { volverArrastrable } from './movimiento';

// CLASES

export class Grafico {
	divHTML;
    ventanaHTML;
	puntos = [];

	constructor() {
		this.divHTML = document.querySelector('.grafico');
        this.ventanaHTML = document.querySelector('.ventana');
        volverArrastrable( this.divHTML, this.ventanaHTML );
	}
	agregarPunto( punto ) {
		punto.divHTML.style.top  = `${ (punto.y / this.divHTML.offsetHeight ) * 100 }%`;
		punto.divHTML.style.left = `${ (punto.x / this.divHTML.offsetWidth ) * 100 }%`;
		this.divHTML.append( punto.divHTML );
		this.puntos.push( punto );
	}
	agregarLinea() {

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

}

// FIN CLASES