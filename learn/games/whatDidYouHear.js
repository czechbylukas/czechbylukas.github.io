// games/whatDidYouHear.js
import { normalize } from "../core/utils.js";

export function startWhatDidYouHear(state) {
  const container = document.getElementById("game");
  container.innerHTML = "";

  const items = [...state.data].sort(() => Math.random()-0.5);
  let index=0;
  let score=0;

  function show() {
    if(index>=items.length){
      container.innerHTML=`<h2>🎉 Finished!</h2><p>Score: ${score}/${items.length}</p>`;
      return;
    }

    const item = items[index];
    container.innerHTML=`
      <h2>What Did You Hear?</h2>
      <audio controls src="${item.audio}"></audio>
      <input id="ans" autofocus>
      <button id="check">Kontrola</button>
      <p id="feedback"></p>
      <p>${index+1} / ${items.length}</p>
    `;

    const input=document.getElementById("ans");
    const feedback=document.getElementById("feedback");

    function check(){
      if(normalize(input.value)===normalize(item.cs)){
        feedback.textContent="✅ Correct!";
        score++;
        index++;
        setTimeout(show,500);
      } else {
        feedback.textContent="❌ Wrong. Try again";
        input.value="";
        input.focus();
      }
    }

    document.getElementById("check").onclick=check;
    input.addEventListener("keydown",e=>{if(e.key==="Enter") check();});
  }

  show();
}
