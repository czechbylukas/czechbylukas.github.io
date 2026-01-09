// games/sentenceBuilder.js
export function startSentenceBuilder(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const sentence = state.data[Math.floor(Math.random()*state.data.length)].cs;
  const words = sentence.split(" ").sort(() => Math.random()-0.5);

  container.innerHTML = `<h2>Sentence Builder</h2><div id="builder"></div><div id="pool"></div><button id="check">Check</button><p id="msg"></p>`;

  const builder = document.getElementById("builder");
  const pool = document.getElementById("pool");

  words.forEach(w => {
    const b = document.createElement("button");
    b.textContent = w;
    b.onclick = () => builder.appendChild(b);
    pool.appendChild(b);
  });

  document.getElementById("check").onclick = () => {
    const built = Array.from(builder.children).map(c=>c.textContent).join(" ");
    document.getElementById("msg").textContent = built===sentence ? "✅ Correct!" : "❌ Wrong!";
  };
}
