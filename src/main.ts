//main body
import "./style.css";

//deno - lint - ignore prefer -const
let counter: number = 0;
let growthRate: number = 0;

document.body.innerHTML = `
  <h1>Incremental Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">🐐</button>
  <button id="upgradeA" disabled>📣</button>

`;

// Add click handler
const button = document.getElementById("increment")!;
const upA = <HTMLButtonElement> document.getElementById("upgradeA")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  incrementCounter(1);
});

upA.addEventListener("click", () => {
  incrementCounter(-10);
  growthRate++;
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
  const increase = (growthRate * elapsed) / 1000;
  incrementCounter(increase);

  checkCost(upA, 10);

  requestAnimationFrame(step);
}

function checkCounter(val: number) {
  return val > counter;
}

function checkCost(item: HTMLButtonElement, threshold: number) {
  item.disabled = checkCounter(threshold);
}

function incrementCounter(amount: number) {
  counter += amount;
  counterElement.innerHTML = counter.toString();
}
