//1)logInForm
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";   
const USERNAME_KEY = "username";                        //<-- "username"를 USERNAME_KEY로 교체(오타방지)

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;                   //<--- username 대신에 usernameThatTheUserWrote 이런식으로 하면 코드 가독성이 좀더 좋아짐(다른 개발자가 보기에도 이해가 쉬워짐) --- 이것은 유저가 input에 입력한 유저명이다.(이걸 localStorage에 저장하고 있고)
    localStorage.setItem(USERNAME_KEY, username);
    //greeting.innerText = `Hello ${username}`;
    //greeting.classList.remove(HIDDEN_CLASSNAME);
    paintGreetings(username);
}

function paintGreetings(username) {                         //<--반복해서 나오는 코드는 함수로 만들어서 재사용성을 높여준다.
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);           // show the form
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    //greeting.innerText = `Hello ${savedUsername}`;          <--지금은 username가 savedUsername변수로 지정되었으니까 savedUsername사용.
    //greeting.classList.remove(HIDDEN_CLASSNAME);            // show the greetings
    paintGreetings(savedUsername);
}


//2)Clock
const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock()
setInterval(getClock, 1000);


//3)Quotes
const quotes = [{quote:"삶이 있는 한 희망은 있다.", author:"-키케로-",},
{quote:"하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.", author:"-사무엘존슨-"},
{quote:"언제나 현재에 집중할수 있다면 행복할것이다.", author:"-파울로 코엘료-"},
{quote:"진정으로 웃으려면 고통을 참아야하며, 나아가 고통을 즐길 줄 알아야 해.", author:"-찰리 채플린-"},
{quote:"신은 용기있는자를 결코 버리지 않는다.", author:"-켄러-"},
{quote:"행복의 문이 하나 닫히면 다른 문이 열린다 그러나 우리는 종종 닫힌 문을 멍하니 바라보다가우리를 향해 열린 문을 보지 못하게 된다.", author:"-헬렌켈러-"},
{quote:"피할수 없으면 즐겨라.", author:"-로버트 엘리엇-"},
{quote:"한번의 실패와 영원한 실패를 혼동하지 마라.", author:"-F.스콧 핏제랄드-"},
{quote:"좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하지 않으면 안 된다.", author:"-단테-"},
{quote:"평생 살 것처럼 꿈을 꾸어라.그리고 내일 죽을 것처럼 오늘을 살아라.", author:"-제임스 딘-"}];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

//Math.random()      <-- 0부터 1사이의 무작위적인 숫자를 준다. cf)  Math.random() * 10  <--0부터10사이의 무작위적인 숫자를 얻을수있다
//Math.round(Number) <-- 숫자를 반올림 시켜준다.
//Math.ceil(Number)  <-- 숫자를 올림 시켜준다.      ex) Math.ceil(1.1);   -> 2    cf) ceil meaning=천장
//Math.floor(Number) <-- 숫자를 올림 시켜준다.      ex) Math.floor(1.9);  -> 1    cf) floor meaning=바닥

//console.log(quote[Math.floor(Math.random() * quotes.length)]);    <-- 10대신 quotes.length를 사용하면 명언을 추가해도 잘 동작한다.

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;


//4)BackgroundImg

const images = ["0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");     // <--img태그를 만들었다. 

bgImage.src = `img/${chosenImage}`;                // <--아직까지는 html의 어딘가에 있지않음  <--img태그의 src속성값으로 랜덤한 이미지를 넣었다.

document.body.appendChild(bgImage);

const Images = document.querySelector("img");

const AURL = Images.src;
//console.log(AURL);

Images.addEventListener("click", ClickBackground);

function ClickBackground() {
    //console.log(event);   url
    Images.style.display = 'none';
    console.log("url(" + AURL + ")");
    document.body.style.backgroundImage = "url(" + AURL + ")";
}

//5)To Do List
const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");

const TODOS_KEY = "todos";

let toDos = [];           

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;            //<--1) 클릭한 버튼의 부모요소는 li이다.
    //console.log(li.id);
    li.remove();
    // 2) toDos = toDos.filter(toDo => toDo.id !== li.id);
    // 3) ↑--toDos라는 배열에 각item들을 toDo라는 인자로 받아와서 그item의 id속성이 클릭된 버튼의 부모요소인 li의 id값과 다른것만 남긴다. 그리고 변경된 새로운 Array를 toDos배열에 넣는다.
    // 4) console.log(typeof li.id);        //<--**결과는 String이다!  li.id는 String이고 toDos.id는 Number이다!**
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));      // 5) <-- parseInt(String) 는 String을 Number로 바꿔준다!
    saveToDos();            // 6) <-- localStorage에 저장을 해야지 Array의 list의 업데이트가 일어난다.
}

function paitToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);             
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    const newToDoObj = {
        text:newTodo,
        id: Date.now(),
    }
    toDoInput.value = "";
    toDos.push(newToDoObj);
    paitToDo(newToDoObj);
    saveToDos();            
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(item) {
    //console.log("hello");
    console.log("This is the turn of", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paitToDo);
}