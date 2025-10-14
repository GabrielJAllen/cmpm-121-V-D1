//main body
import "./style.css";

//deno - lint - ignore prefer -const
let counter: number = 0;

document.body.innerHTML = `
  <h1>Incremental Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">🐐</button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  incrementCounter(1);
});

requestAnimationFrame(step);

//setInterval(incrementCounter, 1000, 1);

//based off of code from:
//https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
let start: number;
function step(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;
  start = timestamp;
  const increase = (1 * elapsed) / 1000;
  incrementCounter(increase);
  requestAnimationFrame(step);
}

function incrementCounter(amount: number) {
  counter += amount;
  counterElement.innerHTML = counter.toString();
}
