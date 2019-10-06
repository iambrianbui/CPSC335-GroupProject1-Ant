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

// ===================================================== move_ant ====
function move_ant(ctx, drawCoord, cellArray, coordArray){
  var nextX = drawCoord[0];
  var nextY = drawCoord[1];
  var nextOrientation = drawCoord[2];
  var currentCoord = [drawCoord[0], drawCoord[1]];

  //  check current orientation
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

  nextCoord = [nextX, nextY];
  nextIndex = return_array_index(nextCoord, coordArray, cellArray);
  currentIndex = return_array_index(currentCoord, coordArray, cellArray);

  console.log(nextIndex);
  if (nextIndex == -1){
    add_to_arrays(nextCoord, coordArray, cellArray);
    nextIndex = (coordArray.length-1);
  }

  if (cellArray[currentIndex] === undefined){currentState = 0;}
  else {currentState = cellArray[currentIndex];}

  //  "Turning"
  //  var nextState = check_color(ctx, nextX, nextY);
  var turnText = " ";

  //  change the current color
  switch(currentState){
    case 0:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 1 );
    cellArray[currentIndex] = 1;
    break;
    case 1:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 2 );
    cellArray[currentIndex] = 2;
    break;
    case 2:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 3 );
    cellArray[currentIndex] = 3;
    break;
    case 3:  draw_rect( ctx, drawCoord[0], drawCoord[1], 'lightgrey', 0 );
    cellArray[currentIndex] = 0;
    break;
  }

  nextState = cellArray[nextIndex];
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

function return_array_index(coordinates, coordArray, cellArray){
  for (var i = 0; i < coordArray.length; i++){
    if (coordArray[i][0] == coordinates[0] && coordArray[i][1] == coordinates[1]){
      return i;
    }
  }
  return -1;
}

function add_to_arrays(coordinates, coordArray, cellArray){
  coordArray.push(coordinates);
  cellArray.push(0);
}

function change_cellArray(cellArray, index){
    switch (cellArray[index]) {
      case 0:
      cellArray[index] = 1;
      break;
      case 1:
      cellArray[index] = 2;
      break;
      case 2:
      cellArray[index] = 3;
      break;
      case 3:
      cellArray[index] = 0;
      break;
  }
}
