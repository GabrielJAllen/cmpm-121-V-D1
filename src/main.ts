//main body
import "./style.css";

//deno - lint - ignore prefer -const
let counter: number = 0;
let growthRate: number = 0;
const upgradeDetails: number[][] = [[0, 10, .1], [0, 100, 2], [0, 1000, 50]];

document.body.innerHTML = `
  <h1>Incremental Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <p>Growth Rate: <span id="growthRate">0</span> /s</p>
  <button id="increment">🐐</button>
  <p>
  <button id="upgradeA" disabled>📣</button>
  Hecklers: <span id="upACount">0</span>
  <p>
  <button id="upgradeB" disabled>📰</button>
  News Articles: <span id="upBCount">0</span>
  <p>
  <button id="upgradeC" disabled>👨🏼‍💻</button>
  Algorithm: <span id="upCCount">0</span>
  <p>

`;

// Add click handler
const button = document.getElementById("increment")!;
const upA = <HTMLButtonElement> document.getElementById("upgradeA")!;
const upB = <HTMLButtonElement> document.getElementById("upgradeB")!;
const upC = <HTMLButtonElement> document.getElementById("upgradeC")!;
const upCounts = [
  document.getElementById("upACount")!,
  document.getElementById("upBCount")!,
  document.getElementById("upCCount")!,
];

const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growthRate")!;

button.addEventListener("click", () => {
  incrementCounter(1);
});

upA.addEventListener("click", () => {
  purchaseUpgrade(0);
});

upB.addEventListener("click", () => {
  purchaseUpgrade(1);
});

upC.addEventListener("click", () => {
  purchaseUpgrade(2);
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

  checkCost(upA, 0);
  checkCost(upB, 1);
  checkCost(upC, 2);

  requestAnimationFrame(step);
}

function checkCounter(val: number) {
  return val > counter;
}

function checkCost(item: HTMLButtonElement, itemNum: number) {
  item.disabled = checkCounter(
    upgradeDetails[itemNum][1] * (1.15 ** upgradeDetails[itemNum][0]),
  );
}

function purchaseUpgrade(item: number) {
  incrementCounter(
    -(upgradeDetails[item][1] * (1.15 ** upgradeDetails[item][0])),
  );
  growthRate += upgradeDetails[item][2];
  upgradeDetails[item][0]++;
  growthElement.innerHTML = growthRate.toString();
  upCounts[item].innerHTML = upgradeDetails[item][0].toString();
}

function incrementCounter(amount: number) {
  counter += amount;
  counterElement.innerHTML = counter.toString();
}
