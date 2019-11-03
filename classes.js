class Member{

  constructor(islR){
    this.immune = Math.random();
    this.size = Math.random();
    this.camo = Math.random() / 10;

    this.metabolism = Math.random() * 0.25 + 0.75 * this.size;
    this.strength = Math.random() * 0.25 + 0.75 * this.size;
    this.speed = Math.random() * 0.5 + 0.5 * (1-this.size);
    this.life = Math.random() * 0.15 + 0.85 * this.size;
    this.tempReg = Math.random();

    this.evasion = 0.75 * this.speed + 0.25 * this.strength;

    this.bodyTemp = 97;
    this.age = 0;
    this.hp = this.life;
    this.ill = 0;
    this.lastAte = 1;

    this.r = Math.random()*360;
    var d = Math.random()*(islR-10);
    this.x = d*cos(this.r);
    this.y = d*sin(this.r);
  }

  child(memb1,memb2){
    this.immune = randn_bm(((memb1.immune + memb2.immune)/2)*0.5, limit(((memb1.immune + memb2.immune)/2)*1.5), 1);
    this.size = randn_bm(((memb1.size + memb2.size)/2)*0.5, limit(((memb1.size + memb2.size)/2)*1.5), 1);
    this.camo = randn_bm(((memb1.camo + memb2.camo)/2)*0.5, limit(((memb1.camo + memb2.camo)/2)*1.5), 1);

    this.metabolism = randn_bm(((memb1.metabolism + memb2.metabolism)/2)*0.5, limit(((memb1.metabolism + memb2.metabolism)/2)*1.5), 1)*0.25 + 0.75*this.size;
    this.strength = randn_bm(((memb1.strength + memb2.strength)/2)*0.5, limit(((memb1.strength + memb2.strength)/2)*1.5), 1);
    this.speed = randn_bm(((memb1.speed + memb2.speed)/2)*0.5, limit(((memb1.speed + memb2.speed)/2)*1.5), 1)*0.5 + 0.5 * this.size;
    this.life = randn_bm(((memb1.life + memb2.life)/2)*0.5, limit(((memb1.life + memb2.life)/2)*1.5), 1)*0.15 + 0.85*this.size;
    this.tempReg = randn_bm(((memb1.tempReg + memb2.tempReg)/2)*0.5, limit(((memb1.tempReg + memb2.tempReg)/2)*1.5), 1)*0.1 + 0.9*(1-this.size);

    this.evasion = 0.75 * this.speed + 0.25 * this.strength;
    this.hp = this.life;
    this.ill = 0;
  }


}

function limit(x){
  return Math.max(Math.min(1,x),0);
}

function randn_bm(min, max, skew) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

class Environment{

  constructor(){
    this.temperature = Math.random()*140;
    this.predators = Math.random()*0.5 + 0.2;
    this.fertility = Math.random()*50 + 25; //number of plants that can exist
    this.plantReg = Math.random()*0.5+0.25; // speed of plant regen
    this.disease = Math.random()*0.1;
    this.disaster = Math.random()*0.0001;

  }
}
