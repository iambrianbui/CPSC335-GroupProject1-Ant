//  This file is a resource to be called on by main.html.
//  The function is to draw on the canvas.

function draw_huge_rect ( ctx )
{
    var fill = "#000000"
    var stroke = 'lightgrey';                                     //  maybe consider deleting this because it's always grey

    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 1;
    ctx.rect(0, 0, canvas.width, canvas.height);          //  consider how big a cell is
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}


function draw_rect( ctx, drawX, drawY, stroke, state )
{
    //  check to see what color to paint
    switch(state){
      case 0:  fill = "#000000";
      break;
      case 1:  fill = "#ff0000";
      break;
      case 2:  fill = "#ffff00";
      break;
      case 3:  fill = "#0000ff";
      break;
    }

    //  default values
    //  state = state || 0;
    stroke = stroke || 'lightgrey';                                     //  maybe consider deleting this because it's always grey
    //    drawX = drawX || 50
    //    drawY = drawY || 50z

    ctx.save( );
    ctx.beginPath();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 1;
    ctx.rect(drawX, drawY, canvas.width/50, canvas.height/50);          //  consider how big a cell is
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
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

// ===================================================== check_color ====
function check_color(ctx, x, y){
  var colorVal = ctx.getImageData(x, y, canvas.width/50, canvas.height/50).data;

  /*
    NOTE:
    0, 0, 0, 255 = BLACK
    255, 0, 0, 255 = RED
    255, 255, 0, 255 = YELLOW
    0, 0, 255, 255 = BLUE
  */
  var hexValue = "#" + ("000000" + rgb_to_hex(colorVal[0], colorVal[1], colorVal[2])).slice(-6);
  console.log(colorVal);
  if (colorVal[0] < 200 && colorVal[2] < 200){
    return 0;
  }
  else if (colorVal[0] > 220 && colorVal[1] < 200 && colorVal[2] < 200) {
    return 1;
  }
  else if (colorVal[0] > 200 && colorVal[1] > 200) {
    return 2;
  }
  else if (colorVal[3] > 200) {
    return 3;
  }
  else return 0;
}

// ===================================================== rgb_to_hex ====
function rgb_to_hex(r, g, b,){
  return ((r << 16) | (g << 8) | b).toString(16);
}

// ===================================================== draw_ant ====



// ===================================================== move_ant ====
function move_ant(ctx, drawCoord){
  var currentState = check_color(ctx, drawCoord[0], drawCoord[1]);
  var nextX = drawCoord[0];
  var nextY = drawCoord[1];
  var nextOrientation = drawCoord[2];


  //  change the current color
  switch(currentState){
    case 0:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 1 );
    break;
    case 1:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 2 );
    break;
    case 2:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 3 );
    break;
    case 3:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 0 );
    break;
  }

  //  check current orientation
  //  console.log(drawCoord);
  switch (drawCoord[2]%4) {
    //  move north
    case 0: nextY-=10;
    break;
    //  move east
    case 1: nextX+=10;
    break;
    //  move south
    case 2: nextY+=10;
    break;
    //  move west
    case 3: nextX-=10;
    break;
  }

  //  "Turning"
  var nextState = check_color(ctx, nextX, nextY);
  //  console.log(nextX + ", " + nextY);
  var turnText = " ";
  //  console.log(nextState);

  switch (nextState) {
    //  black and red turns right
    case 0:  nextOrientation+=1;
    turnText = "Black, Go right!";
    break;
    case 1:  nextOrientation+=1;
    turnText = "Red, Go right!";
    break;

    //  yellow and blue turns left
    case 2:  nextOrientation-=1;
    turnText = "Yellow, Go left!";
    break;
    case 3:  nextOrientation-=1;
    turnText = "Blue, Go left!";
    break;

  }

console.log(turnText);
return [nextX, nextY, nextOrientation];

}
