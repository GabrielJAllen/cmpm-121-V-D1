//main body
import "./style.css";

//deno - lint - ignore prefer -const
const counter: number = 0;

document.body.innerHTML = `
  <h1>Incremental Game</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">🐐</button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  incrementCounter(1, counter);
  counterElement.innerHTML = counter.toString();
});

function incrementCounter(amount: number, counter: number) {
  counter += amount;
}
