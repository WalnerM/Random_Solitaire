function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let possibles = [];
let target = [0,0];
let sel = [0,0];

function doit(){
  // Cleaning and unhilighting the possibles
  for (let x of possibles){
    grid[sel[0]+2*x[0]][sel[1]+2*x[1]].possible = false;
  }
  possibles = [];

  if (target.length == 2){
    // Unhilighting the target cell
    grid[target[0]][target[1]].target = false;
  }

  if (sel.length == 2){
    // Unhilighting the selected cell
    grid[sel[0]][sel[1]].selected = false;
  }

  if (ActiveCells.length > 0){
    // Selecting a new cell randomly
    // sel = [floor(random(cols)),floor(random(rows))];
    sel = ActiveCells[floor(random(ActiveCells.length))];
    grid[sel[0]][sel[1]].selected = true;

    if (grid[sel[0]][sel[1]].occupied){
      // Setting the possible targets by the neighbours of the current selected cell
      possibles = neighbours(sel);
      for (let x of possibles){
        grid[sel[0]+2*x[0]][sel[1]+2*x[1]].possible = true;
      }

      // Choosing a possible cell randomly and setting it as the target
      if (possibles.length != 0){
        let s = floor(random(possibles.length));
        let x = possibles[s];
        grid[sel[0]][sel[1]].occupied = false;
        grid[sel[0]+x[0]][sel[1]+x[1]].occupied = false;
        grid[sel[0]+2*x[0]][sel[1]+2*x[1]].occupied = true;
        grid[sel[0]+2*x[0]][sel[1]+2*x[1]].target = true;
        target = [sel[0]+2*x[0],sel[1]+2*x[1]];

        // Checking/updating the active cells
        check(sel[0],sel[1],x[0],x[1]);

      }else{
        // This is unnecessary, though
        if (grid[sel[0]][sel[1]].active){
          count_active--;
        }
        grid[sel[0]][sel[1]].active = false;
      }
    }
    count_occupied--;
  }
  random_occupation();

  para1.html('Active cells (light blue): ' + count_active);
  para2.html('Proportion of active cells: ' + count_active/(cols*rows));
  para3.html('Occupied cells (blue ball): ' + count_occupied);
  para4.html('Proportion of occupied cells: ' + count_occupied/(cols*rows));

}

function random_occupation(){
  if (p>0){
    for (let i=0; i<cols; i++){
      for (let j=0; j<rows; j++){
        if (random() < p){
          if (!grid[i][j].occupied){
            count_occupied++;
            grid[i][j].sorted = true;
            setTimeout(function(){grid[i][j].sorted = false},300);
          }
          grid[i][j].occupied = true;

          check(i,j,0,+1);
          check(i,j,0,-1);
          check(i,j,+1,0);
          check(i,j,-1,0);
        }
      }
    }
  }
}

function neighbours(sel){
  let Neighbours = [];
  let X = [[0,+1],[0,-1],[+1,0],[-1,0]];

  if (!grid[sel[0]][sel[1]].occupied){
    return [];
  }

  for (let x of X){
    if (sel[0]+2*x[0] >= 0 && sel[0]+2*x[0] < dim[0] && sel[1]+2*x[1] >= 0 && sel[1]+2*x[1] < dim[1] && grid[sel[0]+x[0]][sel[1]+x[1]].occupied && !grid[sel[0]+2*x[0]][sel[1]+2*x[1]].occupied){
      Neighbours.push(x);
    }
  }
  return Neighbours;
}

// Chec will update the active state of the following cells:
//   XaXX
//   XaXX
// XXXXXXX
//   XaXX
//   XaXX
function check(i,j,x,y){
  let i_;
  let j_;
  for(let k = -2; k<5;k++){
    i_ = i + k*x;
    j_ = j + k*y;
    update_count_active(i_,j_);
  }

  for(let h = 1; h < 3; h++){
    for(let k = 0; k < 3; k++){
      i_ = i + h*y + k*x;
      j_ = j + h*x + k*y;
      update_count_active(i_,j_);

      i_ = i - h*y + k*x;
      j_ = j - h*x + k*y;
      update_count_active(i_,j_);
    }
  }
}

function update_count_active(i,j){
  if (i >= 0 && i < cols && j >= 0 && j < rows){
    let Neighbours = neighbours([i,j]);
    if (Neighbours.length == 0){
      if (grid[i][j].active){
        count_active--;
        grid[i][j].active = false;
        let pos = pos_of([i,j],ActiveCells);
        ActiveCells.splice(pos,1);
      }
    }else{
      if (!grid[i][j].active){
        count_active++;
        grid[i][j].active = true;
        ActiveCells.push([i,j]);
      }
    }
  }
}

function pos_of([i,j],arr){
  for (let k = 0; k < arr.length; k++){
    if(arr[k][0] == i && arr[k][1] == j){
      return k;
    }
  }
  return -1;
}
