//main body
import "./style.css";

//deno - lint - ignore prefer -const
let counter: number = 0;
let growthRate: number = 0;

interface Upgrade {
  name: string;
  button: HTMLButtonElement;
  count: number;
  countText: HTMLElement;
  cost: number;
  rate: number;
}

document.body.innerHTML = `
  <h1>Scapegoating Simulator</h1>
  <p>Scapegoats: <span id="counter">0</span></p>
  <button id="increment">🐐</button>
  <p>Growth Rate: <span id="growthRate">0</span> /s</p>
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

const availableItems: Upgrade[] = [
  {
    name: "heckler",
    button: <HTMLButtonElement> document.getElementById("upgradeA")!,
    count: 0,
    countText: document.getElementById("upACount")!,
    cost: 10,
    rate: .1,
  },

  {
    name: "newsArticle",
    button: <HTMLButtonElement> document.getElementById("upgradeB")!,
    count: 0,
    countText: document.getElementById("upBCount")!,
    cost: 100,
    rate: 2,
  },

  {
    name: "algorithm",
    button: <HTMLButtonElement> document.getElementById("upgradeC")!,
    count: 0,
    countText: document.getElementById("upCCount")!,
    cost: 1000,
    rate: 50,
  },
];

const counterElement = document.getElementById("counter")!;
const growthElement = document.getElementById("growthRate")!;

button.addEventListener("click", () => {
  incrementCounter(1);
});

availableItems.forEach((element, index) => {
  element.button.addEventListener("click", () => {
    purchaseUpgrade(index);
  });
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

  availableItems.forEach((_element, index) => {
    checkCost(index);
  });

  requestAnimationFrame(step);
}

function checkCounter(val: number) {
  return val > counter;
}

function checkCost(itemNum: number) {
  availableItems[itemNum].button.disabled = checkCounter(
    availableItems[itemNum].cost * (1.15 ** availableItems[itemNum].count),
  );
}

function purchaseUpgrade(item: number) {
  incrementCounter(
    -(availableItems[item].cost * (1.15 ** availableItems[item].count)),
  );
  growthRate += availableItems[item].rate;
  availableItems[item].count++;
  growthElement.innerHTML = growthRate.toString();
  availableItems[item].countText.innerHTML = availableItems[item].count
    .toString();
}

function incrementCounter(amount: number) {
  counter += amount;
  counterElement.innerHTML = counter.toString();
}
