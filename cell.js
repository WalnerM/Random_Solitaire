class Cell {
  constructor(i,j) {
    this.i = i;
    this.j = j;
    this.w = cell_width;
    this.x = this.i*this.w;
    this.y = this.j*this.w;
    this.occupied = false;
    this.target = false;
    this.selected = false;
    this.possible = false;
    this.active = false;
    this.sorted = false;
  }

  show(){
    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(this.x,this.y,this.w,this.w);
    if (this.goal){
      fill(240,200,140);
      rect(this.x,this.y,this.w,this.w);
    }

    if (this.selected){
      strokeWeight(2);
      fill(200,0,0);
      rect(this.x,this.y,this.w,this.w);
    }

    if (this.target){
      strokeWeight(2);
      fill(0,200,0);
      rect(this.x,this.y,this.w,this.w);
    }

    if (this.possible){
      strokeWeight(1);
      fill(255,255,0,100);
      rect(this.x,this.y,this.w,this.w);
    }

    if (this.active){
      strokeWeight(1);
      fill(0,255,255,100);
      rect(this.x,this.y,this.w,this.w);
    }

    if (this.sorted){
      strokeWeight(1);
      fill(255,0,255,100);
      rect(this.x,this.y,this.w,this.w);
    }

    if (this.occupied){
        fill(0,0,200);
        ellipse(this.x + this.w/2, this.y + this.w/2, this.w * 0.5);
    }

  }
}
