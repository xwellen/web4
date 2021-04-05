import $ from "jquery";
import {useSelector} from "react-redux";
import {selectPoints, sendPoint} from "../Components/Main/MainSlice";

let nowPoints = [];

export function getNowPoints(){
    return nowPoints;
}

export const drawBase = (points, dispatch) => {
    const canvas = $("#graphicCanvas")[0];

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    let width = canvas.width;
    let height = canvas.height;
    let centerX = width / 2;
    let centerY = height / 2;
    let r = height / 3;

    //CLEAR
    //let gradient = ctx.createLinearGradient(200,0, 900,0);

    // Add three color stops
    //gradient.addColorStop(0, 'violet');
    //gradient.addColorStop(.5, 'cyan');
    //gradient.addColorStop(1, 'green');

    //ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.rect(0, 0, 900, 450);
    ctx.fillStyle = 'transparent';
    ctx.fill()

    ctx.fillStyle = 'orange';
    //TRIANGLE
    ctx.beginPath()
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + r / 2);
    ctx.lineTo(centerX - r, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();

    //rect
    ctx.beginPath();
    ctx.fillRect(centerX, centerY, r, r);
    ctx.closePath();

    //circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, r / 2, Math.PI, Math.PI * 3 / 2);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();

    //AXIS
    ctx.fillStyle = 'black';

    //X
    ctx.beginPath();
    ctx.moveTo(centerX - centerY * 1.5, centerY);
    ctx.lineTo(centerX + centerY * 1.5, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + centerY * 1.5, centerY);
    ctx.lineTo(centerX + centerY * 1.5 - 10, centerY - 10);
    ctx.lineTo(centerX + centerY * 1.5 - 10, centerY + 10);
    ctx.closePath();
    ctx.fill();

    //Y
    ctx.moveTo(centerX, height);
    ctx.lineTo(centerX, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX - 10, 10);
    ctx.lineTo(centerX + 10, 10);
    ctx.closePath();
    ctx.fill();

    drawDots(points);
}

function drawDots(points) {
    points.map(point => drawDot(point));
}


export function processCanvasClick(e) {
    let r = document.querySelector('.rinput').value;
    if (Number(r) > 0 || Number(r) < 3){
        let humanX = getHumanXFromPhysical(e.clientX);
        let humanY = getHumanYFromPhysical(e.clientY);
        drawDot(makeDot(humanX, humanY, r));
        return {
            x: round(humanX),
            y: round(humanY),
            r: round(r)
        }
    }
    else {
        window.alert("R must be greater than 0 and less than 3");
        return false;
    }

}

const round = (x) => {
    return Math.round(x * 100) / 100;
}

function getHumanXFromPhysical(clientX) {
    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const form = $("#form")[0];

    let r = document.querySelector('.rinput').value;
    return r * (clientX - rect.left - width / 2) / (height / 3);
}

function getHumanYFromPhysical(clientY) {
    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;

    let r = document.querySelector('.rinput').value;
    return -r * (clientY - rect.top - height / 2) / (height / 3);
}


function drawDot(point) {

    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    let ctx = canvas.getContext('2d');

    let r = document.querySelector('.rinput').value;


    let x = point.x * (point.r / r)
    let y = point.y * (point.r / r);
    let drawableX = (x * height / 3 + r * rect.left + r * width / 2) / r;
    let drawableY = rect.bottom + rect.top - (y * height / 3 + r * rect.top + r * height / 2) / r;


    if (checkIfHit(x, y, r)) ctx.fillStyle = "green";
    else ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(drawableX - rect.left, drawableY - rect.top, 5, 0, Math.PI * 2, true);
    ctx.fill();
    nowPoints.push(point);
}

function makeDot(humanX, humanY, r) {
    let isHit = checkIfHit(humanX, humanY, r);
    return {x: humanX, y: humanY, r: r, result: isHit};
}




function putADot(clientX, clientY) {
    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const form = $("#form")[0];

    let ctx = canvas.getContext('2d');

    let actualX = getHumanXFromPhysical(clientX);
    let actualY = getHumanYFromPhysical(clientY);
    let r = form.elements["form:r"].value;
    ctx.fillStyle = checkIfHit(actualX, actualY, r);

    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

function checkIfHit(x, y, r) {
    if (x > 0 && y > 0) return false;
    if (x <= 0 && y >= 0 && x*x+y*y<r*r/4) return true;
    else if (x < 0 && y < 0 && y > -0.5*x - r*0.5) return true;
    else if (x > 0 && y < 0 && y > -r && x < r) return true;
    else return false;
}

function sendThisShit(humanX, humanY, dispatch) {
    let point = {
        x: humanX,
        y: humanY
    }
    dispatch(sendPoint(point));
}

// document.querySelector(".rinput").onchange = function () {
//     drawBase(nowPoints);
// }


