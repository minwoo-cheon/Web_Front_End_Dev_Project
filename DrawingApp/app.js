const saveBtn = document.getElementById("save");        //1)save버튼을 자바스크립트에 불러오기.
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const resetBtn = document.getElementById("reset-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textWidth = document.getElementById("text-width");
let textSize = textWidth.value;

const CANVAS_WIDTH = 800;       //자주 나오는 값들은 변수를 활용한다.
const CANVAS_HEIGHT = 800;      //자주 나오는 값들은 변수를 활용한다.

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
    isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
}
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}
function onClorChange(event) {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
}
function onColorClick(event) {
    const colorValue = event.target.dataset.color
    ctx.fillStyle = colorValue;
    ctx.strokeStyle = colorValue;
    color.value = colorValue;
}
function onModeClick() {
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}
function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onResetClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    color.value = "white";
}
function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
    color.value = "white";
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
    }
}
function onDoubleClick(event) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `bold ${textSize}px serif`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}
function onSaveClick() {
    //console.log(canvas.toDataURL());      //3)canvas.toDataURL()가 뭔지보자.{base64로 인코딩 되있다.내가 그린 이미지가 URL로 인코딩 되어있다.}
    const url = canvas.toDataURL();         //4)상수url로 받아서 a태그로 만들고 그안에 url을 넣고 a태그의 속성인 download를 이용할것이다.
    const a = document.createElement("a");  //5)a태그를 만든다.
    a.href = url;                           //6)a태그의 href로 상수url을 준다.(내가 만든 이미지를 a태그의 href로준다.)
    a.download = "myDrawing.png";           //7)download속성을 이용하여 해당 이미지를 해당이름,확장자명으로 다운로드한다.(jpg로 해도됨.)
    a.click();                              //8)해당 a태그를 클릭한다.-->다운받아진다.
}
function onTextWidthChange(event) {
    //console.log(event.target.value);
    textSize = event.target.value;
}


canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
textWidth.addEventListener("change", onTextWidthChange);
color.addEventListener("change", onClorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);















































































