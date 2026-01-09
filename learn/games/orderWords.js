// games/orderWords.js
export function startOrderWords(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const word = state.data[Math.floor(Math.random()*state.data.length)].cs;
  const shuffled = word.split("").sort(() => Math.random()-0.5);

  container.innerHTML = `<h2>Order the Letters</h2><div id="letters"></div><button id="check">Check</button><p id="msg"></p>`;
  const lettersDiv = document.getElementById("letters");

  shuffled.forEach(l => {
    const span = document.createElement("span");
    span.textContent = l;
    span.style.cursor="pointer";
    span.style.padding="5px";
    span.onclick = () => lettersDiv.appendChild(span);
    lettersDiv.appendChild(span);
  });

  document.getElementById("check").onclick = () => {
    const answer = Array.from(lettersDiv.children).map(c=>c.textContent).join("");
    document.getElementById("msg").textContent = answer===word ? "✅ Correct!" : "❌ Wrong!";
  };
}
