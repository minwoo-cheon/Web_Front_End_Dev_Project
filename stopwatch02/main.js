// Global variables
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");

let seconds = 0;
let interval = null;

// Event listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);

// Update the timer
function timer () {
	seconds++;

	// Format our time
	let hrs = Math.floor(seconds / 3600);
	let mins = Math.floor((seconds - (hrs * 3600)) / 60);
	let secs = seconds % 60;

	if (secs < 10) secs = '0' + secs;
	if (mins < 10) mins = "0" + mins;
	if (hrs < 10) hrs = "0" + hrs;

	time_el.innerText = `${hrs}:${mins}:${secs}`;
}

function start () {
	if (interval) {
		return
	}

	interval = setInterval(timer, 1000);
}

function stop () {
	clearInterval(interval);
	interval = null;
}

function reset () {
	stop();
	seconds = 0;
	time_el.innerText = '00:00:00';
}


//color
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  // console.log(hexColor);
  document.body.style.backgroundColor = hexColor;
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}




//button
if (document.body.animate) {
	document
	  .querySelectorAll(".button")
	  .forEach((button) => button.addEventListener("click", pop));
  }
  
  function pop(e) {
	for (let i = 0; i < 30; i++) {
	  createParticle(e.clientX, e.clientY, e.target.dataset.type);
	}
  }
  
  function createParticle(x, y, type) {
	const particle = document.createElement("particle");
	document.body.appendChild(particle);
  
	const size = Math.floor(Math.random() * 20 + 5);
  
	particle.style.width = `${size}px`;
	particle.style.height = `${size}px`;
  
	const destinationX = x + (Math.random() - 0.5) * 2 * 75;
	const destinationY = y + (Math.random() - 0.5) * 2 * 75;
  
	switch (type) {
	  case "square":
		particle.style.background = `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
		particle.style.border = "1px solid white";
		break;
	  case "circle":
		particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
		particle.style.borderRadius = "50%";
		break;
	  default:
		particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
	}
  
	const animation = particle.animate(
	  [
		{
		  // Set the origin position of the particle
		  // We offset the particle with half its size to center it around the mouse
		  transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
		  opacity: 1,
		},
		{
		  // We define the final coordinates as the second keyframe
		  transform: `translate(${destinationX}px, ${destinationY}px)`,
		  opacity: 0,
		},
	  ],
	  {
		duration: 500 + Math.random() * 1000,
		easing: "cubic-bezier(0, .9, .57, 1)",
		delay: Math.random() * 200,
	  }
	);
  
	animation.onfinish = () => {
	  particle.removeParticle;
	};
  }
  
  function removeParticle(e) {
	e.srcElement.effect.target.remove();
  }