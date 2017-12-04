/*
The Four Emotions by dan tramte
2d-interpolating between the haha, wow, sad, & angry facebook reactions
© Dan Tramte
*/

let hahaMouth = [];
let wowMouth = [];
let sadMouth = [];
let angryMouth = [];

let hLEye = [];
let wLEye = [];
let sLEye = [];
let aLEye = [];
let hREye = [];
let wREye = [];
let sREye = [];
let aREye = [];

let hLBrow = [];
let wLBrow = [];
let sLBrow = [];
let aLBrow = [];
let hRBrow = [];
let wRBrow = [];
let sRBrow = [];
let aRBrow = [];

let hTong = [];
let wTong = [];
let sTong = [];
let aTong = [];

let hTear = [];
let wTear = [];
let sTear = [];
let aTear = [];

let cell = 10;

// let hotHead;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //vvv ideally, we could store the angry emote background in buffer vvv
  /*
  noCursor();
  hotHead = createGraphics(400, 400);
  hotHead.background(255);
  hotHead.noStroke();
  for (let i = 0; i < 400; i++) {
    hotHead.fill(255, map(i, 0, 400, 255, 50), 70);
    hotHead.arc(width/2 - 400*0.5, 400*0.5-height/2, 400, 400, map(i, 0, 400, 90, 270), map(i, 0, 400, 450, 270), CHORD);
  }
  */

  //manually create arrays of bezier coordinates for the teardrop
  hTear = [{x: 96, y: -60}, {x: 96, y: -60}, {x: 96, y: -60}, {x: 96, y: -60}];
  wTear = [{x: 96, y: -60}, {x: 96, y: -60}, {x: 96, y: -60}, {x: 96, y: -60}];
  sTear = [{x: 96, y: 150}, {x: 50, y: 210}, {x: 142, y: 210}, {x: 96, y: 150}];
  aTear = [{x: 96, y: 20}, {x: 96, y: 20}, {x: 96, y: 20}, {x: 96, y: 20}];

  //programmatically generate mouth, eyes, & eyebrows; store 2d vector coordinates into arrays
  let radius = 100;
  for (let a = 0; a < 360; a += cell) {
    let wmPath = fakePolToCar(radius, a, 0.7, 1, 0, 60, 0);
    let amPath = fakePolToCar(radius, a, 0.7, 0.05, 0, 110, 0);

    let wtPath = fakePolToCar(radius, a, 0.7, 1, 0, 60, 0);
    let atPath = fakePolToCar(radius, a, 0.7, 0.05, 0, 110, 0);

    let hLEyePath = fakePolToCar(radius*0.4, a, 1, 0.05, -90, -60, 0);
    let wLEyePath = fakePolToCar(radius*0.3, a, 0.7, 1, -80, -80, 10);
    let sLEyePath = fakePolToCar(radius*0.15, a, 1, 1, -80, 30, 0);
    let aLEyePath = fakePolToCar(radius*0.15, a, 1, 1, -80, 20, 0);
    let hREyePath = fakePolToCar(radius*0.4, a, 1, 0.05, 90, -60, 0);
    let wREyePath = fakePolToCar(radius*0.3, a, 0.7, 1, 80, -80, -10);
    let sREyePath = fakePolToCar(radius*0.15, a, 1, 1, 80, 30, 0);
    let aREyePath = fakePolToCar(radius*0.15, a, 1, 1, 80, 20, 0);

    let hLBrowPath = createVector(lerp(-120, -50, a/360),lerp(-100, -64, a/360));
    let wLBrowPath = fakePolToCar(radius*0.5, a/5+230, 0.8, 0.9, -80, -120, 0);
    let sLBrowPath = fakePolToCar(radius*0.5, a/4+190, 1, 1, -80, 20, 0);
    let aRBrowPath = fakePolToCar(radius*1.5, a/6+30, 1, 0.5, 10, -60, 0);

    wowMouth.push(wmPath);
    angryMouth.push(amPath);

    wTong.push(wtPath);
    aTong.push(atPath);

    hLEye.push(hLEyePath);
    wLEye.push(wLEyePath);
    sLEye.push(sLEyePath);
    aLEye.push(aLEyePath);
    hREye.push(hREyePath);
    wREye.push(wREyePath);
    sREye.push(sREyePath);
    aREye.push(aREyePath);

    hLBrow.push(hLBrowPath);
    wLBrow.push(wLBrowPath);
    sLBrow.push(sLBrowPath);
    aRBrow.push(aRBrowPath);

    //if statements divide the mouth into four segments
    if (a >= 180) {
      hmPath = fakePolToCar(radius*1.4, a, 1, 0.001, 0, 0, 0);
      smPath = fakePolToCar(radius, a, 0.6, 0.35, 0, 120, 0);

      htPath = fakePolToCar(radius*1.4, a, 1, 0.001, 0, 0, 0);
      stPath = fakePolToCar(radius, a, 0.6, 0.35, 0, 120, 0);

      hahaMouth.push(hmPath);
      sadMouth.push(smPath);

      hTong.push(htPath);
      sTong.push(smPath);
    } else if (a > 150) {
      hmPath = fakePolToCar(radius*1.4, a, 1, 1, 0, 0, 0);
      smPath = fakePolToCar(radius, a, 0.6, -0.3, 0, 120, 0);

      htPath = fakePolToCar(radius*1.4, a, 1, 1, 0, 0, 0);
      stPath = fakePolToCar(radius, a, 0.6, -0.3, 0, 120, 0);

      hahaMouth.push(hmPath);
      sadMouth.push(smPath);

      hTong.push(htPath);
      sTong.push(stPath);
    } else if (a >= 30) {
      hmPath = fakePolToCar(radius*1.4, a, 1, -0.3, 0, 90, 0);
      smPath = fakePolToCar(radius, a, 0.6, -0.3, 0, 120, 0);

      htPath = fakePolToCar(radius*1.4, a, 1, 1, 0, 0, 0);
      stPath = fakePolToCar(radius, a, 0.6, -0.3, 0, 120, 0);

      hahaMouth.push(hmPath);
      sadMouth.push(smPath);

      hTong.push(htPath);
      sTong.push(stPath);
    } else {
      hmPath = fakePolToCar(radius*1.4, a, 1, 1, 0, 0, 0);
      smPath = fakePolToCar(radius, a, 0.6, -0.3, 0, 120, 0);

      htPath = fakePolToCar(radius*1.4, a, 1, 1, 0, 0, 0);
      stPath = fakePolToCar(radius, a, 0.6, -0.3, 0, 120, 0);

      hahaMouth.push(hmPath);
      sadMouth.push(smPath);

      hTong.push(htPath);
      sTong.push(stPath);
    }
  }

  //populate arrays backwards so that eyebrows do not twist when morphing
  for (let a = 360; a > 0; a -= cell) {
    let aLBrowPath = fakePolToCar(radius*1.5, a/6+90, 1, 0.5, -10, -60, 0);
    let hRBrowPath = createVector(lerp(50, 120, a/360),lerp(-64, -100, a/360));
    let wRBrowPath = fakePolToCar(radius*0.5, a/5-120, 0.8, 0.9, 80, -120, 0);
    let sRBrowPath = fakePolToCar(radius*0.5, a/4-100, 1, 1, 80, 20, 0);

    aLBrow.push(aLBrowPath);
    hRBrow.push(hRBrowPath);
    wRBrow.push(wRBrowPath);
    sRBrow.push(sRBrowPath);
  }
}

//////////////////////////////////////
      //————ANIMATION————//
//////////////////////////////////////

function draw() {
  background(255);
  noStroke();
  strokeJoin(ROUND);
  //mouse scaled to 0-1
  let xamt = map(constrain(mouseX, 0, width), 0, width, 0, 1);
  let yamt = map(constrain(mouseY, 0, height), 0, height, 0, 1);

  translate(width / 2, height / 2);
  //create angry ellipse background by layering CHORD-mode arcs with gradient shadings of yellow/red
  noStroke();
  for (i = 0; i < 400; i++) {
    fill(255, map(i, 0, 400, 255, 50), 70);
    arc(width/2 - 400*0.5, 400*0.5-height/2, 400, 400, map(i, 0, 400, 90, 270), map(i, 0, 400, 450, 270), CHORD);
  }
  //simple map alpha of yellow ellipse with the angry ellipse in bottom right corner
  fill(255, 210, 70, map(dist(width, height, mouseX, mouseY), 0, width, 0, 255));
  ellipse(0, 0, width);

  //DRAW FACIAL EXPRESSIONS//
  drawTongue(xamt, yamt);
  stroke(0);
  fill(0);
  drawMouth(xamt, yamt);

  drawTear(xamt, yamt);
  stroke(0);
  fill(0);
  drawLeftEye(xamt, yamt);
  drawRightEye(xamt, yamt);

  noFill();
  strokeWeight(14);
  drawLeftEyeBrow(xamt, yamt);
  drawRightEyeBrow(xamt, yamt);

  //vvv for debugging vvv
  // print(mouseX + " " + mouseY);
  // noLoop();
}

//////////////////////////////////////
      //————FUNCTIONS————//
//////////////////////////////////////

function fakePolToCar(r, angle, xmod, ymod, xoff, yoff, rphase) {
  return createVector(r * cos(angle+rphase)*xmod + xoff, r * sin(angle)*ymod + yoff);
}

function drawTongue(xamt, yamt) {
  //vvvTONGUEvvv//
  let tblend = map(dist(0, 0, mouseX, mouseY), 0, width, 255, 0);
  fill(tblend, 0, 0);
  stroke(tblend, 0, 0);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < wowMouth.length; i++) {

    let hahat = hTong[i];
    let wowt = wTong[i];
    let sadt = sTong[i];
    let angryt = aTong[i];
    //LERP ACROSS X
    let tt = lerp(hahat.x, wowt.x, xamt);
    let ut = lerp(hahat.y, wowt.y, xamt);
    let vt = lerp(sadt.x, angryt.x, xamt);
    let wt = lerp(sadt.y, angryt.y, xamt);

    let longitude = createVector(tt, ut);
    let latitude = createVector(vt, wt);
    //LERP X-LERPS ACROSS Y
    let xt = lerp(longitude.x, latitude.x, yamt);
    let yt = lerp(longitude.y, latitude.y, yamt);

    vertex(xt, yt);
  }
  endShape(CLOSE);
  //^^^TONGUE^^^//
}

function drawMouth(xamt, yamt) {
  //vvvMOUTHvvv//
  beginShape();
  for (let i = 0; i < wowMouth.length; i++) {

    let haham = hahaMouth[i];
    let wowm = wowMouth[i];
    let sadm = sadMouth[i];
    let angrym = angryMouth[i];
    //LERP ACROSS X
    let tm = lerp(haham.x, wowm.x, xamt);
    let um = lerp(haham.y, wowm.y, xamt);
    let vm = lerp(sadm.x, angrym.x, xamt);
    let wm = lerp(sadm.y, angrym.y, xamt);

    let longitude = createVector(tm, um);
    let latitude = createVector(vm, wm);
    //LERP X-LERPS ACROSS Y
    let xm = lerp(longitude.x, latitude.x, yamt);
    let ym = lerp(longitude.y, latitude.y, yamt);

    vertex(xm, ym);
  }
  endShape(CLOSE);
  //^^^MOUTH^^^//
}

function drawTear(xamt, yamt) {
  //vvvTEARDROPvvv//
  noStroke();
  fill(75, 100, 255);
  for (let i = 0; i < hTear.length; i++) {

    let hahatear = hTear[i];
    let wowtear = wTear[i];
    let sadtear = sTear[i];
    let angrytear = aTear[i];
    //LERP ACROSS X
    let ttear = lerp(hahatear.x, wowtear.x, xamt);
    let utear = lerp(hahatear.y, wowtear.y, xamt);
    let vtear = lerp(sadtear.x, angrytear.x, xamt);
    let wtear = lerp(sadtear.y, angrytear.y, xamt);

    let longitude = createVector(ttear, utear);
    let latitude = createVector(vtear, wtear);
    //LERP X-LERPS ACROSS Y
    let xtear = lerp(longitude.x, latitude.x, yamt);
    let ytear = lerp(longitude.y, latitude.y, yamt);

    noStroke();
    fill(75, 100, 255);
    //there is CERTAINLY a much more efficient way to do set individual bezier coordinates...
    if (i == 0) {
    var firstpointx = xtear;
    var firstpointy = ytear;
  } else if (i == 1) {
    var secondpointx = xtear;
    var secondpointy = ytear;
  } else if (i == 2) {
    var thirdpointx = xtear;
    var thirdpointy = ytear;
  } else if (i == 3) {
    var fourthpointx = xtear;
    var fourthpointy = ytear;
  }
  }
  bezier(firstpointx, firstpointy, secondpointx, secondpointy, thirdpointx, thirdpointy, fourthpointx, fourthpointy);
  //^^^TEARDROP^^^//
}

function drawLeftEye(xamt, yamt) {
  //vvvLEFTEYEvvv//
  beginShape();
  for (let i = 0; i < wowMouth.length; i++) {

    let hle = hLEye[i];
    let wle = wLEye[i];
    let sle = sLEye[i];
    let ale = aLEye[i];
    //LERP ACROSS X
    let tley = lerp(hle.x, wle.x, xamt);
    let uley = lerp(hle.y, wle.y, xamt);
    let vley = lerp(sle.x, ale.x, xamt);
    let wley = lerp(sle.y, ale.y, xamt);

    let longitude = createVector(tley, uley);
    let latitude = createVector(vley, wley);
    //LERP X-LERPS ACROSS Y
    let xley = lerp(longitude.x, latitude.x, yamt);
    let yley = lerp(longitude.y, latitude.y, yamt);

    vertex(xley, yley);
  }
  endShape(CLOSE);
  //^^^LEFTEYE^^^//
}

function drawRightEye(xamt, yamt) {
  //vvvRIGHTEYEvvv//
  beginShape();
  for (let i = 0; i < wowMouth.length; i++) {

    let hre = hREye[i];
    let wre = wREye[i];
    let sre = sREye[i];
    let are = aREye[i];
    //LERP ACROSS X
    let trey = lerp(hre.x, wre.x, xamt);
    let urey = lerp(hre.y, wre.y, xamt);
    let vrey = lerp(sre.x, are.x, xamt);
    let wrey = lerp(sre.y, are.y, xamt);

    let longitude = createVector(trey, urey);
    let latitude = createVector(vrey, wrey);
    //LERP X-LERPS ACROSS Y
    let xrey = lerp(longitude.x, latitude.x, yamt);
    let yrey = lerp(longitude.y, latitude.y, yamt);

    vertex(xrey, yrey);
  }
  endShape(CLOSE);
  //^^^RIGHTEYE^^^//
}

function drawLeftEyeBrow(xamt, yamt) {

  //vvvLEFTEYEBROWvvv//
  beginShape();
  for (let i = 0; i < wowMouth.length; i++) {

    let hlb = hLBrow[i];
    let wlb = wLBrow[i];
    let slb = sLBrow[i];
    let alb = aLBrow[i];
    //LERP ACROSS X
    let tleb = lerp(hlb.x, wlb.x, xamt);
    let uleb = lerp(hlb.y, wlb.y, xamt);
    let vleb = lerp(slb.x, alb.x, xamt);
    let wleb = lerp(slb.y, alb.y, xamt);

    let longitude = createVector(tleb, uleb);
    let latitude = createVector(vleb, wleb);
    //LERP X-LERPS ACROSS Y
    let xleb = lerp(longitude.x, latitude.x, yamt);
    let yleb = lerp(longitude.y, latitude.y, yamt);

    vertex(xleb, yleb);
  }
  endShape();
  //^^^LEFTEYEBROW^^^//

}

function drawRightEyeBrow(xamt, yamt) {
  //vvvRIGHTEYEBROWvvv//
  beginShape();
  for (let i = 0; i < wowMouth.length; i++) {

    let hrb = hRBrow[i];
    let wrb = wRBrow[i];
    let srb = sRBrow[i];
    let arb = aRBrow[i];
    //LERP ACROSS X
    let treb = lerp(hrb.x, wrb.x, xamt);
    let ureb = lerp(hrb.y, wrb.y, xamt);
    let vreb = lerp(srb.x, arb.x, xamt);
    let wreb = lerp(srb.y, arb.y, xamt);

    let longitude = createVector(treb, ureb);
    let latitude = createVector(vreb, wreb);
    //LERP X-LERPS ACROSS Y
    let xreb = lerp(longitude.x, latitude.x, yamt);
    let yreb = lerp(longitude.y, latitude.y, yamt);

    vertex(xreb, yreb);
  }
  endShape();
  //^^^RIGHTEYEBROW^^^//
}
