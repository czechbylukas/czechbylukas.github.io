// games/guessNumber.js
export function startGuessNumber(state) {
  const container = document.getElementById("game");
  container.innerHTML = `<h2>Guess the Number</h2><input type="number" id="guess"><button id="check">Check</button><p id="msg"></p>`;
  const num = Math.floor(Math.random()*100)+1;

  document.getElementById("check").onclick = () => {
    const val = parseInt(document.getElementById("guess").value);
    const msg = document.getElementById("msg");
    if(val===num) msg.textContent="🎉 Correct!";
    else if(Math.abs(val-num)<=5) msg.textContent="🔥 Very Hot";
    else if(Math.abs(val-num)<=15) msg.textContent="🌡️ Hot";
    else msg.textContent="❄️ Cold";
  };
}
