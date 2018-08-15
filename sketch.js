let p = 0.004;
let n = 35;
// let canvas_size = 500;
// let cell_width = canvas_size/n;
// let canvas_width = canvas_size;
// let canvas_height = canvas_size;
let cols = n;
let rows = n;
let cell_width = 10;
let canvas_width = cols*cell_width;
let canvas_height = rows*cell_width;
let dim = [cols,rows];

let grid;
let count_active = 0;
let count_occupied = 0;
let ActiveCells = [];

let para1;

function setup() {
  createCanvas(canvas_width+1,canvas_height+1);
  para1 = createP('Active cells (light blue): ' + count_active);
  para2 = createP('Proportion of active cells: ' + count_active/(cols*rows));
  para3 = createP('Occupied cells (blue ball): ' + count_occupied);
  para4 = createP('Proportion of occupied cells: ' + count_occupied/(cols*rows));


  grid = make2DArray(cols,rows);
  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      grid[i][j] = new Cell(i,j);
      grid[i][j].occupied = true;
    }
  }

  // grid[floor(cols/2)][floor(rows/2)].occupied = false;
  // check(floor(cols/2),floor(rows/2),1,0);

  // grid[floor(cols/2)][0].occupied = false;
  // check(floor(cols/2),0,1,0);

  grid[0][0].occupied = false;
  check(0,0,1,0);

  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      if (grid[i][j].occupied){
        count_occupied++;
      }
    }
  }
}

function draw() {
  background(255);
  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      grid[i][j].show();
    }
  }

  if (count_active > 0){
    doit();
  }
}

function keyPressed(){
  if (count_active > -1){
    doit();
  }
}
