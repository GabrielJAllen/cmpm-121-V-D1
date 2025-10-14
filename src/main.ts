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

setInterval(incrementCounter, 1000, 1);

function incrementCounter(amount: number) {
  counter += amount;
  counterElement.innerHTML = counter.toString();
}
