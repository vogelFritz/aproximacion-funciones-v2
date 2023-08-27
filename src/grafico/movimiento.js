
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


export const agregarZoom = ( elemHTML ) => {
    const aspectRatio = elemHTML.offsetWidth / elemHTML.offsetHeight,
          growRate    = 0.1;
    elemHTML.addEventListener( 'wheel', (e) => {
        const deltaWidth   = e.deltaY * aspectRatio * growRate,
              deltaHeight  = e.deltaY * growRate,
              posRelativaX = ( e.clientX - elemHTML.offsetLeft ) / elemHTML.offsetWidth,
              posRelativaY = ( e.clientY - elemHTML.offsetTop ) / elemHTML.offsetHeight;
        elemHTML.style.width  = `${ elemHTML.offsetWidth + deltaWidth }px`;
        elemHTML.style.height = `${ elemHTML.offsetHeight + deltaHeight }px`;
        elemHTML.style.left   = `${ elemHTML.offsetLeft - deltaWidth * posRelativaX }px`;
        elemHTML.style.top    = `${ elemHTML.offsetTop - deltaHeight * posRelativaY }px`;
    } );
}
