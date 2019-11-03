var sim;
var popul = [];
var basePop = 200;
var islR = 300;
var baseT = 30;
var islandEnv;
var countPlant;

var control;
var tempSlider, predSlider, plantSlider, plantRegSlider,diseaseSlider,disastSlider;
function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  sim = createGraphics(window.innerWidth*3/4,window.innerHeight);
  control = createGraphics(window.innerWidth/4,window.innerHeight);
  sim.translate(sim.width/2,sim.height/2);
  angleMode(DEGREES);
  for(i=0;i<basePop;i++){
    popul.push(new Member(islR));
  }

  islandEnv = new Environment();
  countPlant = Math.round(islandEnv.fertility);

  tempSlider = createSlider(0,140,97);
  tempSlider.position(window.innerWidth*3/4+5,45);
  tempSlider.style('width','200px');

  predSlider = createSlider(0,40,20);
  predSlider.position(window.innerWidth*3/4+5,80);
  predSlider.style('width','200px');

  plantSlider = createSlider(0,200,100);
  plantSlider.position(window.innerWidth*3/4+5,115);
  plantSlider.style('width','200px');

  plantRegSlider = createSlider(0,100);
  plantRegSlider.position(window.innerWidth*3/4+5,150);
  plantRegSlider.style('width','200px');

  diseaseSlider = createSlider(0,70,20);
  diseaseSlider.position(window.innerWidth*3/4+5,185);
  diseaseSlider.style('width','200px');

  disastSlider = createSlider(0,25,1);
  disastSlider.position(window.innerWidth*3/4+5,220);
  disastSlider.style('width','200px');

  //noLoop();
}

var avgSize = 0, avgCamo = 0, avgImmune = 0, avgMeta = 0, avgStrength = 0, avgSpeed = 0, avgLife = 0, avgTemp = 0, avgEva = 0;

function draw(){
  control.background(230);
  updateSlider();
  drawPanel();
  drawIsland();
  drawPop();

  updatePop();
  plantRepop();

  if(disastTransparency>0){
    sim.push();
    sim.noStroke();
    sim.fill(255,0,0,disastTransparency);
    sim.rect(-sim.width/2,-sim.height/2,sim.width,sim.height);
    disastTransparency-=5;
    sim.pop();
  }

  image(sim,0,0);
  image(control,window.innerWidth*3/4,0);
}

function updateSlider(){
  islandEnv.temperature = tempSlider.value();
  islandEnv.predators = predSlider.value()/100.0;
  islandEnv.fertility = plantSlider.value();
  islandEnv.plantReg = plantRegSlider.value()/100.0;
  islandEnv.disease = diseaseSlider.value()/100.0;
  islandEnv.disaster = disastSlider.value()/100.0;
}

function drawPanel(){
  control.push();
  control.textSize(20);
  control.noStroke();
  control.fill(0);
  control.text("Environment",5,20);
  control.textSize(12);
  control.text("Temperature: " + islandEnv.temperature,5,40);
  control.text("Predator Chance: " + islandEnv.predators,5,75);
  control.text("Max Plants: " + Math.round(islandEnv.fertility),5,75+35);
  control.text("Plant Regen %: " + islandEnv.plantReg,5,75+70);
  control.text("Disease Chance: " + islandEnv.disease,5,75+105);
  control.text("Disaster Chance: " + islandEnv.disaster,5,75+105+35);

  control.textSize(20);
  control.text("Average of Population (" + popul.length + ")", 5,275);
  control.textSize(12);
  control.text("Average Size: " + avgSize.toFixed(3),5,275+20);
  control.text("Average Camo: " + avgCamo.toFixed(3),5,275+35);
  control.text("Average Immunity: " + avgImmune.toFixed(3),5,275+50);
  control.text("Average Metabolism: " + avgMeta.toFixed(3),5,275+65);
  control.text("Average Strength: " + avgStrength.toFixed(3),5,275+80);
  control.text("Average Speed: " + avgSpeed.toFixed(3),5,275+95);
  control.text("Average Life: " + avgLife.toFixed(3),5,275+110);
  control.text("Average Temperature Regulation: " + avgTemp.toFixed(3),5,275+125);
  control.text("Average Evasion: " + avgEva.toFixed(3),5,275+140);

  control.textSize(20);
  control.text("Death Rates", 5,475);
  control.textSize(12);
  control.text("By disaster: " + disastDeath,5,475+20);
  control.text("By predators: " + predDeath,5,475+35);
  control.text("By temperature: " + tempDeath,5,475+50);
  control.text("By disease: " + diseaseDeath,5,475+65);
  control.text("By starvation: " + foodDeath,5,475+80);
  control.text("By age: " + oldDeath,5,475+95);

  control.pop();
}
var disastDeath = 0;
var predDeath = 0;
var tempDeath = 0;
var diseaseDeath = 0;
var foodDeath = 0;
var oldDeath = 0;

function drawIsland(){
  sim.background(173,216,230);
  sim.push();
  //sand
  sim.ellipseMode(CENTER);
  sim.fill(237, 201, 175);
  sim.noStroke();
  sim.circle(0,0,islR + 20);

  //land
  sim.fill(126, 191, 129);
  sim.circle(0,0,islR);

  //Trees
  sim.fill(100, 140, 100);
  sim.circle(0 + 50,0 - 50,baseT);

  sim.fill(100, 140, 100);
  sim.noStroke();
  sim.circle(0 - 100,50,baseT + 10);

  sim.fill(100, 140, 100);
  sim.circle(100,100,baseT - 5);

  sim.fill(100, 140, 100);
  sim.circle(0,30,baseT - 5);

  sim.fill(100, 140, 100);
  sim.circle(0 - 25,150,baseT + 10);

  sim.fill(100, 140, 100);
  sim.circle(-25,120,baseT + 15);

  sim.fill(100, 140, 100);
  sim.circle(0,-200,baseT + 10);

  sim.fill(100, 140, 100);
  sim.circle(-150,-170,baseT);

  sim.fill(100, 140, 100);
  sim.circle(- 150,0 - 200,baseT - 10);

  sim.fill(100, 140, 100);
  sim.circle(150,0,baseT + 10);

  sim.fill(100, 140, 100);
  sim.circle(-150,200,baseT);

  sim.fill(100, 140, 100);
  sim.circle(-200,-20,baseT);

  //Wuhu Island Volcano except its not even on the island

  sim.fill(70);
  sim.circle(-380,-380,120);

  sim.fill(120);
  sim.circle(-380,-380,80);

  sim.fill(150);
  sim.circle(-380,-380,60);

  sim.fill(70);
  sim.circle(-380,-380,50);

  sim.fill(220,10,10);
  sim.circle(-380,-380,30);

  sim.pop();
  //sim.line(0,0,sim.width,0);
}
//Drawing the people
function drawPop(){
  sim.push();
  sim.noStroke();
  sim.fill(100);
  sim.angleMode(DEGREES);
  sim.ellipseMode(CENTER);
  for(i = 0;i<popul.length;i++){
    sim.circle(popul[i].x,popul[i].y,map(popul[i].size,0,1,1,10));
    updatePos(popul[i]);
  }
  sim.pop();
}
//move the people
function updatePos(memb){
  speed = map(memb.speed,0,1,2,4);
  memb.x += speed*cos(memb.r);
  memb.y += speed*sin(memb.r);

  //update turn
  do{
    memb.r += Math.random()*50 - 25;
  }
  while(dist(memb.x + cos(memb.r)*speed,memb.y + sin(memb.r)*speed,0,0)>islR);

}

var disastTransparency = 0;
//update statuses of people
function updatePop(){

  //Natural disaster
  var nuke = false;
  var disaster = Math.random() * 10;
  if (disaster < islandEnv.disaster){
    nuke = true;
    disastTransparency = 100;
  }


  var sumSize = 0;
  var sumImmune = 0;
  var sumMeta = 0;
  var sumStrength = 0;
  var sumSpeed = 0;
  var sumLife = 0;
  var sumTemp = 0;
  var sumEva = 0;
  var sumCamo = 0;

  for(i=0;i<popul.length;i++){
    var curr = popul[i];

    sumSize += curr.size;
    sumImmune += curr.immune;
    sumMeta += curr.metabolism;
    sumStrength += curr.strength;
    sumSpeed += curr.speed;
    sumLife += curr.life;
    sumTemp += curr.tempReg;
    sumEva += curr.evasion;
    sumCamo += curr.camo;

    if(nuke){
      if(Math.random() < 2/3){
        //console.log("death by disaster");
        disastDeath++;
        popul.splice(i,1);
        continue;
      }
    }

    //predator event
    var predEvent = islandEnv.predators - curr.camo - 0.2*curr.speed;
    //console.log(predEvent);
    if(predEvent>Math.random()*0.5){
      //console.log("attack");
      predAttack(curr);
      if(curr.hp<=0){
        predDeath++;
        //console.log("death by predator");
        popul.splice(i,1);
        continue;
      }
    }

    //body temp
    tempUpdate(curr);
    if(curr.bodyTemp>100 || curr.bodyTemp<95){

      //console.log(map(Math.abs(curr.bodyTemp-97),0,100,0,3));
      //console.log(curr.bodyTemp);
      //console.log("temp lost health");
      curr.hp -= map(Math.abs(curr.bodyTemp-97),0,100,0,3);
      if(curr.hp<=0){
        tempDeath++;
        popul.splice(i,1);
        continue;
      }
    }

    //disease
    if(curr.ill>0){
      //console.log("sick");
      curr.hp -= curr.ill*0.2;
      curr.ill -= curr.immune;
      if(curr.hp<=0){
        diseaseDeath++;
        popul.splice(i,1);
        continue;
      }
      if(curr.ill<=0){
        curr.ill = -1; //immunity to disease
      }
    }
    else if(Math.random()<islandEnv.disease){
      disease(curr);
    }


    //food/energy
    var ate = (countPlant - popul.length)*2 + (10*curr.speed);
    //console.log(ate);
    if(countPlant>0 && ate>-100){
      countPlant--;
      //console.log(countPlant);
      //console.log((1-curr.metabolism)*0.5);
      curr.hp = Math.max(curr.life,curr.hp+(1-curr.metabolism)*0.05);
      lastAte = 1;
    }
    else{
      //console.log("no food: " + countPlant);
      curr.lastAte++;
      curr.hp -= 0.01 + curr.metabolism*0.05*curr.lastAte;
      if(curr.hp<=0){
        foodDeath++;
        popul.splice(i,1);
        continue;
      }
    }

    //old age
    curr.age+=1;
    if(oldAge(curr)){
      //console.log("old");
      oldDeath++;
      popul.splice(i,1);
      continue;
    }


    //repopulate
    if(curr.age>20 && curr.age<60 && curr.hp>curr.life*0.5 && Math.random()<0.05){
      for(j=0;j<popul.length;j++){
        if(j==i) continue;
        if(popul[j].age>20 && Math.random()<0.1){
          reproduce(curr,popul[j]);
          break;
        }
      }
    }
  }

  if(popul.length>0){
    avgSize = sumSize/popul.length;
    avgImmune = sumImmune/popul.length;
    avgMeta = sumMeta/popul.length;
    avgStrength = sumStrength/popul.length;
    avgSpeed = sumSpeed/popul.length;
    avgLife = sumLife/popul.length;
    avgTemp = sumTemp/popul.length;
    avgEva = sumEva/popul.length;
    avgCamo = sumCamo/popul.length;
  }

}

function reproduce(memb1, memb2){
  //console.log("child");
  popul.push(new Member(islR));
  popul[popul.length - 1].child(memb1,memb2);
}

function tempUpdate(memb){
  var diffTemp = (Math.abs(memb.bodyTemp-islandEnv.temperature)/10);
  //console.log(diffTemp);
  if(islandEnv.temperature<memb.bodyTemp){
    memb.bodyTemp -= diffTemp;
    memb.bodyTemp += Math.min(memb.tempReg*2 + memb.size*3, Math.abs(97-memb.bodyTemp));
    //console.log(diffTemp + " " + (memb.tempReg*3 + memb.size*2));
    //console.log(memb.tempReg*5 + memb.size*3 + " " + Math.abs(97-memb.bodyTemp));
  }
  else{
    memb.bodyTemp += diffTemp;
    memb.bodyTemp -= Math.min(memb.tempReg*2 + (1-memb.size)*3, Math.abs(97-memb.bodyTemp));
    //console.log(memb.bodyTemp + " " + diffTemp + " " + memb.tempReg);
    //console.log((memb.tempReg*3 + (1-memb.size)) + " " + Math.abs(97-memb.bodyTemp));
  }
}

function plantRepop(){
  countPlant += Math.round(islandEnv.plantReg * islandEnv.fertility);
  if (countPlant > islandEnv.fertility){
    countPlant = Math.round(islandEnv.fertility);
  }
}

function disease(memb){
  memb.ill += Math.random();
}

function disaster(memb){
  var bruh = false;
  if (Math.random > (1/3)*islandEnv.disaster){
    bruh = true;
  }
  return bruh;
}

function oldAge(memb){
  var dead = false;
  var chance = exp(0.04 * memb.age)/120;
  //console.log(chance);
  var rand = Math.random()*100;
  if (rand < chance){
    //console.log(rand + " " +chance);
    dead = true;
  }
  return dead;
}

function predAttack(memb){
  var pred = (1 - (memb.life + memb.evasion))/8;
  //console.log(pred);
  var dmg = 0.05 + Math.random()*0.1;
  if(dmg*2>pred){
    memb.hp -= dmg*2;
  }


}

//
