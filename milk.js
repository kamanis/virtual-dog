class Milk {
    constructor(x) {
      this.x = x;
      this.y = 200;
      this.width = 50;
      this.height = 50;
      this.image = loadImage("Milk.png")
    }
    display() {
      push();
      image(this.image, this.x, this.y, this.width, this.height);
      pop();
    }
  }