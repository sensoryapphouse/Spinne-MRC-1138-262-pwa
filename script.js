/*
left and right arrow:         
        numt = 1000, // PB 500 number of points: 200, 500, 1000, 1500
        Button 1:   LineWidth: 1, 2, 4, 8      
        Button 2: target.x += target.errx / 60; // PB speed :  60, 120, 180, 240 ,300
        button 3: n = 20, //PB  30 number of joints in leg: 1, 2, 3, 5, 30
        Button 4: colours - change hue (canvas) and invert (body and canvas) + ghosting
 */
var splash;
var button;
var button1;
var button2;
var button3;
var buttonl;
var buttonr;
var crosshairs;
var canvas;
var bdy;

var huecount = 0;
var hueInvert = false;

var linewidth = 3;
var speed = .01;
var numJoints = 20;
var numt = 1000; // PB 500 number of points: 200, 500, 1000, 1500
var ghosting = false;
window.onload = function () {
    initialise();
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
    splash = document.querySelector('splash');
    splash.onmousedown = function (e) {
        e.stopPropagation();
        splash.hidden = true;
    }
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');
    buttonl = document.querySelector('buttonl');
    buttonr = document.querySelector('buttonr');
    bdy = document.getElementById('body');
    button.onmousedown = function (e) {
        e.stopPropagation();
        Action(1);
    }
    button1.onmousedown = function (e) {
        e.stopPropagation();
        Action(2);
    }
    button2.onmousedown = function (e) {
        e.stopPropagation();
        Action(3);
    }
    button3.onmousedown = function (e) {
        e.stopPropagation();
        Action(4);
    }
    buttonl.onmousedown = function (e) {
        e.stopPropagation();
        Action(5);
    }
    buttonr.onmousedown = function (e) {
        e.stopPropagation();
        Action(6);
    }

    crosshairs = document.querySelector('crosshairs');
    crosshairs.hidden = true;
}


window.onkeypress = function (e) {
    if (!splash.hidden) {
        splash.hidden = true;
        return;
    }

    if (e.repeat)
        return;
    switch (e.keyCode) {
        case 32:
        case 49:
            Action(1);
            break;
        case 50:
            Action(2);
            break;
        case 51:
        case 13:
            Action(3);
            break;
        case 52:
            Action(4);
            break;
        case 53:
            toggleButtons();
            break;
        case 189: // +
            Action(5);
            break;
        case 187: // -
            Action(6);
            break;
    }
}

function toggleButtons() {
    button.hidden = !button.hidden;
    button1.hidden = !button1.hidden;
    button2.hidden = !button2.hidden;
    button3.hidden = !button3.hidden;
    buttonl.hidden = !buttonl.hidden;
    buttonr.hidden = !buttonr.hidden;
}

var player;
var player1;
var player2;
var player3;

function PlaySound(i) {
    try {
        switch (i) {
            case 1:
                if (player == undefined) {
                    player = document.getElementById('audio');
                    player.loop = false;
                }
                player.load();
                player.play();
                break;
            case 2:
                if (player1 == undefined) {
                    player1 = document.getElementById('audio1');
                }
                player1.load();
                player1.play();
                break;
            case 3:
                if (player2 == undefined) {
                    player2 = document.getElementById('audio2');
                }
                player2.load();
                player2.play();
                break;
            case 4:
                if (player3 == undefined) {
                    player3 = document.getElementById('audio3');
                }
                player3.load();
                player3.play();
                break;
        }
    } catch (e) {};
}


//    Button 4: colours - change hue(canvas) and invert(body and canvas) + ghosting

function Action(i) {
    console.log(i);
    switch (i) {
        case 1:
            switch (linewidth) {
                case 1:
                    linewidth = 3;
                    break;
                case 3:
                    linewidth = 5;
                    break;
                case 5:
                    linewidth = 10;
                    break;
                case 10:
                    linewidth = 1;
            }
            PlaySound(1);
            break;
        case 2:
            switch (speed) {
                case .01:
                    speed = .005;
                    break;
                case .005:
                    speed = .0025;
                    break;
                case .0025:
                    speed = .001;
                    break;
                case .001:
                    speed = .02;
                    break;
                case .02:
                    speed = .01;
                    break;
            }
            PlaySound(2);
            break;
        case 3:
            switch (numt) {
                case 1000:
                    numt = 1500;
                    break;
                case 500:
                    numt = 1000;
                    break;
                case 200:
                    numt = 500;
                    break;
                case 1500:
                    numt = 200;
                    break;
            }
            PlaySound(3);
            break;
        case 4: //   hue shift/colours
            var s = "";
            huecount++;
            if (huecount > 5) {
                huecount = 0;
                hueInvert = !hueInvert;
                if (hueInvert)
                    ghosting = !ghosting;
            }
            if (hueInvert) {
                s = "invert(100%) ";
            }
            bdy.style.filter = s;
            button.style.filter = button1.style.filter = button2.style.filter = button3.style.filter =
                buttonl.style.filter = buttonr.style.filter = s;
            canvas.style.filter = "hue-rotate(" + (huecount * 60) + "deg)";
            crosshairs.style.filter = "hue-rotate(" + (huecount * 60) + "deg)";
            PlaySound(4);
            break;
        case 5: // previous set
            switch (numJoints) {
                case 20:
                    numJoints = 1;
                    break;
                case 5:
                    numJoints = 20;
                    break;
                case 3:
                    numJoints = 5;
                    break;
                case 2:
                    numJoints = 3;
                    break;
                case 1:
                    numJoints = 2;
                    break;
            }
            deleteTargets();
            makeTargets();
            break;
        case 6: // next set
            switch (numJoints) {
                case 20:
                    numJoints = 5;
                    break;
                case 5:
                    numJoints = 3;
                    break;
                case 3:
                    numJoints = 2;
                    break;
                case 2:
                    numJoints = 1;
                    break;
                case 1:
                    numJoints = 20;
                    break;
            }
            deleteTargets();
            makeTargets();
            break;
        case 7: // toggle buttons
            toggleButtons();
            break;
    }
}

var tent = [];

function changeJoints() {
    for (let i = 0; i < 1500; i++) {
        tent[i].n = numJoints;
    }
}

var tmr;

function mouseOff() {
    clearTimeout(tmr);
    tmr = setTimeout(function () {
        mouse.x = false;
        mouse.y = false;
    }, 2000);
}

function dist(p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
}

class segment {
    constructor(parent, l, a, first) {
        this.first = first;
        if (first) {
            this.pos = {
                x: parent.x,
                y: parent.y
            };
        } else {
            this.pos = {
                x: parent.nextPos.x,
                y: parent.nextPos.y
            };
        }
        this.l = l;
        this.ang = a;
        this.nextPos = {
            x: this.pos.x + this.l * Math.cos(this.ang),
            y: this.pos.y + this.l * Math.sin(this.ang)
        };
    }
    update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
    fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
    show() {
        c.lineTo(this.nextPos.x, this.nextPos.y);
    }
}

class tentacle {
    constructor(x, y, l, n, a) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.makeSegments();
    }
    makeSegments() {
        this.segments = [new segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) {
            this.segments.push(
                new segment(this.segments[i - 1], this.l / this.n, 0, false)
            );
        }
    }
    deleteSegments() {
        for (let tmp = this.segments.length; tmp > 0; tmp--) {
            this.segments.pop();
        }
    }
    move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
            x: target.x - 0.8 * this.dt * Math.cos(this.angle),
            y: target.y - 0.8 * this.dt * Math.sin(this.angle)
        };
        if (this.t.x) {
            this.segments[this.n - 1].update(this.t);
        } else {
            this.segments[this.n - 1].update(target);
        }
        for (let i = this.n - 2; i >= 0; i--) {
            this.segments[i].update(this.segments[i + 1].pos);
        }
        if (
            dist(this.x, this.y, target.x, target.y) <=
            this.l + dist(last_target.x, last_target.y, target.x, target.y)
        ) {
            this.segments[0].fallback({
                x: this.x,
                y: this.y
            });
            for (let i = 1; i < this.n; i++) {
                this.segments[i].fallback(this.segments[i - 1].nextPos);
            }
        }
    }
    show(target) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
            c.globalCompositeOperation = "color-dodge";
            c.beginPath();

            c.lineTo(this.x, this.y);
            for (let i = 0; i < this.n; i++) {
                this.segments[i].show();
            }
            c.strokeStyle = "hsl(" + (this.rand * 60 + 180) + ",100%," + (this.rand * 60 + 25) + "%)";
            c.lineWidth = (this.rand * linewidth) + 1;
            c.lineCap = "round";
            c.lineJoin = "round";
            c.stroke();
            c.globalCompositeOperation = "source-over";
        }
    }
    show2(target) {
        c.beginPath();
        //            c.shadowBlur = 1; // PB
        //            c.shadowColor = "white"; // PB
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
            c.arc(this.x, this.y, 3 * this.rand + 1, 0, 2 * Math.PI);
            c.fillStyle = "white";
        } else {
            c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
            c.fillStyle = "DimGrey";
        }
        c.fill();
    }
}

function makeTargets() {
    for (let i = 0; i < 1500; i++) {
        tent.push(
            new tentacle(
                Math.random() * w,
                Math.random() * h,
                Math.random() * (maxl - minl) + minl,
                numJoints,
                Math.random() * 2 * Math.PI
            )
        );
    }
}

function deleteTargets() {
    for (let i = 0; i < 1500; i++) {
        tent.pop();
    }
}

let maxl = 150, // PB 300 longest leg(100): 
    minl = 50, // PB  50 shortest leg
    n = 20, //PB  30 number of joints in leg: 1, 2, 3, 5, 30
    clicked = false,
    target = {
        x: 0,
        y: 0
    },
    last_target = {},
    t = 0,
    q = 10;

var c;
var last_mouse = {};

function initialise() {
    c = init("canvas").c,
        canvas = init("canvas").canvas,
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        mouse = {
            x: false,
            y: false
        },


        window.requestAnimFrame = (function () {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback);
                }
            );
        });

    makeTargets();

    function draw() {
        if (mouse.x) {
            target.errx = mouse.x - target.x;
            target.erry = mouse.y - target.y;
        } else {
            target.errx =
                w / 2 +
                (h / 2 - q) *
                2 * //Math.sqrt(2) *
                Math.cos(t) /
                (Math.pow(Math.sin(t), 2) + 1) -
                target.x;
            target.erry =
                h / 2 +
                (h / 2 - q) *
                2 * //Math.sqrt(2) *
                Math.cos(t) *
                Math.sin(t) /
                (Math.pow(Math.sin(t), 2) + 1) -
                target.y;
        }

        target.x += target.errx / 60; // PB speed :  60, 120, 180, 240 ,300
        target.y += target.erry / 60;

        t += speed; //0.001;

        c.beginPath();
        var reduceBody = 5;
        c.arc(target.x, target.y, dist(last_target.x, last_target.y, target.x, target.y) / reduceBody + 5, 0, 2 * Math.PI); // PB radius of body
        c.fillStyle = "hsl(210,100%,80%)";
        c.fill();

        for (i = 0; i < numt; i++) {
            tent[i].move(last_target, target);
            tent[i].show2(target);
        }
        for (i = 0; i < numt; i++) {
            tent[i].show(target);
        }
        last_target.x = target.x;
        last_target.y = target.y;
    }

    canvas.addEventListener("mousemove", function (e) {
        mouse.x = e.pageX - this.offsetLeft; // PB make static mouse pointer still have effect
        mouse.y = e.pageY - this.offsetTop;
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouseOff();
    }, false);
    canvas.addEventListener("mouseleave", function (e) {
        mouse.x = false;
        mouse.y = false;
    });
    canvas.addEventListener("mousedown", function (e) {
        clicked = true;
        mouse.x = e.pageX - this.offsetLeft; // PB make static mouse pointer still have effect
        mouse.y = e.pageY - this.offsetTop;
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouseOff();
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        clicked = false;
    }, false);

    canvas.addEventListener("touchstart", function (e) {
        clicked = true;
        mouse.x = e.touches[0].pageX - this.offsetLeft;
        mouse.y = e.touches[0].pageY - this.offsetTop;
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouseOff();
    }, false);
    canvas.addEventListener("touchmove", function (e) {
        mouse.x = e.touches[0].pageX - this.offsetLeft;
        mouse.y = e.touches[0].pageY - this.offsetTop;
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouseOff();
    }, false);
    canvas.addEventListener("touchend", function (e) {
        clicked = false;
    }, false);

    function loop() {
        window.requestAnimFrame(loop);
        if (ghosting) {
            c.fillStyle = "rgba(30,30,30,0.5)"; // PB ghosting
            c.fillRect(0, 0, w, h);
        } else
            c.clearRect(0, 0, w, h);
        draw();
    }

    window.addEventListener("resize", function () {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        //        changeTargets();
        deleteTargets();
        makeTargets();
        loop();
    });

    loop();
    setInterval(loop, 1000 / 60);
};

function init(elemid) {
    let canvas = document.getElementById(elemid),
        c = canvas.getContext("2d"),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return {
        c: c,
        canvas: canvas
    };
}

function MoveMouse(xm, ym) {
    crosshairs.hidden = false;
    try {
        mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
        mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
        //            console.log('Moving: ', xm, ym);
        mouseX += xm;
        mouseY += ym;
        if (mouseX < 10)
            mouseX = 10;
        if (mouseY < 10)
            mouseY = 10;
        if (mouseX >= window.innerWidth - 10)
            mouseX = window.innerWidth - 10;
        if (mouseY >= window.innerHeight - 10)
            mouseY = window.innerHeight - 10;
        console.log('MoveTo: ', mouseX, mouseY);
        crosshairs.style.left = mouseX - crosshairs.offsetWidth / 2 + "px";
        crosshairs.style.top = mouseY - crosshairs.offsetHeight / 2 + "px";
        mouse.x = mouseX;
        mouse.y = mouseY;
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        last_mouse.y = mouse.y;
        mouseOff();
    } catch {}
}

function JoystickMoveTo(jy, jx) {
    if (splash.hidden) {
        if (Math.abs(jx) < .1 && Math.abs(jy) < .1) {
            try {
                if (gpad.getButton(14).value > 0) // dpad left
                    MoveMouse(-7, 0);
                if (gpad.getButton(12).value > 0) // dup
                    MoveMouse(0, -5);
                if (gpad.getButton(13).value > 0) // ddown
                    MoveMouse(0, 5);
                if (gpad.getButton(15).value > 0) // dright
                    MoveMouse(7, 0);
            } catch {}
            return;
        }
        if (Math.abs(jx) < .1)
            jx = 0;
        if (Math.abs(jy) < .1)
            jy = 0;
        if (jx == 0 && jy == 0)
            return;
        MoveMouse(jx * 15, jy * 15);
    }
}

var currentButton = 0;


function MouseClick() {
    var s; //        
    var elements = document.elementsFromPoint(crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2, crosshairs.offsetTop + (crosshairs.offsetHeight) / 2);
    try {
        if (elements[0].id == "canvas") {
            mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
            mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
            mouse.x = mouseX;
            mouse.y = mouseY;
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            last_mouse.y = mouse.y;
            mouseOff();
        } else {
            elements[0].click();
            mouseState = 0;
        }
    } catch (e) {}
}

function showPressedButton(index) {
    //      console.log("Pressed: ", index);
    if (!splash.hidden) { // splash screen
        splash.hidden = true;
    } else {
        switch (index) {
            case 0: // A
                if (crosshairs.hidden) {
                    Action(1);
                } else {
                    MouseClick();
                }
                break;
            case 8:
                toggleButtons();
                break
            case 9:
                Action(5);
                break;
            case 1: // B - 
                Action(2);
                break;
            case 2: // X
                Action(3);
                break;
            case 3: // Y
                Action(4);
                break;
            case 4: // LT
            case 6: //
                Action(5);
                break;
            case 5: // RT
            case 7: //
                Action(6);
                break;
            case 10: // XBox
                break;
            case 12: // dpad handled by timer elsewhere
            case 13:
            case 14:
            case 15:
                break;
            default:
        }
    }
}

function removePressedButton(index) {
    mousedown = false;
    //        console.log("Releasd: ", index);
}

function moveJoystick(values, isLeft) {
    if (splash.hidden)
        JoystickMoveTo(values[1], values[0]);
}

var gpad;

function getAxes() {
    //       console.log('Axis', gpad.getAxis(0), gpad.getAxis(1), gpad.getButton(14).value);
    if (splash.hidden) {
        JoystickMoveTo(gpad.getAxis(1), gpad.getAxis(0));
        JoystickMoveTo(gpad.getAxis(3), gpad.getAxis(2));
    }
    setTimeout(function () {
        getAxes();
    }, 50);
}

gamepads.addEventListener('connect', e => {
    console.log('Gamepad connected:');
    console.log(e.gamepad);
    gpad = e.gamepad;
    e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
    e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
    //       e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
    //            StandardMapping.Axis.JOYSTICK_LEFT);
    //        e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
    //            StandardMapping.Axis.JOYSTICK_RIGHT);
    setTimeout(function () {
        getAxes();
    }, 50);
});

gamepads.addEventListener('disconnect', e => {
    console.log('Gamepad disconnected:');
    console.log(e.gamepad);
});

gamepads.start();
