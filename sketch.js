
// CREATE GLOBAL VARIABLES
// For Engine, World, Bodies and any other that you have in mind to make your coding life easier.
// remember to create an array of boxes.
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
function setup() {
    createCanvas(400, 400);

    // Create an instance of Engine, World
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    // A slider is already created for you here. This slider will dictate the gravity of the world
    gSlider = createSlider(0, 100, 50);
    gSlider.position(135, 350);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
 
    // Create a ground rectangle that would hold all the boxes and add it to the world.

    ground = new Ground(200,335,400,20);

    console.log(boxes);
}
 
function mousePressed() {
   if (mouseY < 335) {

        // Every time a mouse press occures create a new box.
        var b =  new Box(mouseX,mouseY,30,30); 
        boxes.push(b);
    }
}
 
function draw() {
    // Draw all the elements including the slider that 

    background(51);
    textSize(19);
    // This is the value of your gravity. You can optionally show it to the viewer.
    var fVal = gSlider.value();
    text("Gravity: "+fVal,152,390);
   // console.log(fVal);
    console.log(engine.world.gravity);

    fill(255);
    text(mouseX+","+mouseY,10,15);
 
    ground.display();
    

    // Use a for loop to show all the boxes
    for(var i = 0 ; i<boxes.length ; i++){ 
        boxes[i].display();
    }



}
 

// You can either create a f ile for the class Box or build a simple function that creates one box at a time.
// I have gone for the second option.
function Box(x, y, w, h,options) {

    // add options such as friction and restitution. Experiment with the values

    var options={
        friction: 0.05,
        restitution:0.4
    }


       this.body = Bodies.rectangle(x,y,w,h,options);
    
 
    // create your box using the function arguments
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;

   World.add(world,this.body);

    // Create a show method which will draw the box every time it is called inside the draw method.
    // remember to push and pop.

    this.display = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();

        translate(pos.x, pos.y);
        rotate(angle);

        strokeWeight(4);
        stroke(0);
        fill(255);

        rectMode(CENTER);
        rect(0, 0, this.w, this.h);

        pop();
    }
}