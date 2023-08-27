
const intervalo = ( a, x, b ) => (x < a) ? a :
                                 (x < b) ? x : b;

export const volverArrastrable = ( elemHTML, ventanaHTML ) => {
    let excesoX, excesoY;
    elemHTML.addEventListener( 'dragstart', (e) => {
        const divVacio = document.createElement('div');
        excesoX = e.clientX - elemHTML.offsetLeft;
        excesoY = e.clientY - elemHTML.offsetTop;
        e.dataTransfer.setDragImage(divVacio,0,0);
    } );
    const ajustarPosicion = (e) => {
        const top = e.clientY - excesoY,
              left = e.clientX - excesoX,
              limSup = ventanaHTML.offsetTop + ventanaHTML.offsetHeight - elemHTML.offsetHeight,
              limInf = ventanaHTML.offsetTop,
              limIzq = ventanaHTML.offsetLeft + ventanaHTML.offsetWidth - elemHTML.offsetWidth,
              limDer = ventanaHTML.offsetLeft;
        elemHTML.style.top  = `${ intervalo( limSup, top, limInf ) }px`;
        elemHTML.style.left = `${ intervalo( limIzq, left, limDer ) }px`;
    }
    elemHTML.addEventListener( 'drag', (e) => {
        ajustarPosicion(e);
    } );
    elemHTML.addEventListener( 'dragend', (e) => {
        ajustarPosicion(e);
    } );
}
