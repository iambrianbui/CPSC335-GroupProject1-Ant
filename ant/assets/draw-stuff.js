//  This file is a resource to be called on by main.html.
//  The function is to draw on the canvas.


function draw_rect( ctx, drawX, drawY, stroke, state )
{
    //  check to see what color to paint
    switch(state){
      case 0:  fill = 'black';
      break;
      case 1:  fill = 'red';
      break;
      case 2:  fill = 'yellow';
      break;
      case 3:  fill = 'blue';
      break;
    }

    //  default values
    state = state || 0;
    stroke = stroke || 'lightgrey';                                     //  maybe consider deleting this because it's always grey
    drawX = drawX || 50
    drawY = drawY || 50

    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(drawX, drawY, canvas.width/50, canvas.height/50);          //  consider how big a cell is
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  )
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}
