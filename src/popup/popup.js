

function send(action, mode) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: action,
      mode
    });
  });
}

// Run once
document.getElementById("rp2z").addEventListener("click", () => {
  send("RUN_ONCE", "p2z");
});

document.getElementById("rz2p").addEventListener("click", () => {
  send("RUN_ONCE", "z2p");
});


const sp2zCheckbox = document.getElementById("sp2z");
const sz2pCheckbox = document.getElementById("sz2p");

let runningP2Z = false;
let runningZ2P = false;



sp2zCheckbox.addEventListener("click", () => {
  runningP2Z = sp2zCheckbox.checked;

  send(runningP2Z ? "START" : "STOP", "p2z");

  // sp2zBtn.textContent = runningP2Z ? "Stop Pinyin→Zhuyin" : "Start Pinyin→Zhuyin";
});


sz2pCheckbox.addEventListener("click", () => {
  runningZ2P = sz2pCheckbox.checked;

  send(runningZ2P ? "START" : "STOP", "z2p");

  // sz2pBtn.textContent = runningZ2P ? "Stop Zhuyin→Pinyin" : "Start Zhuyin→Pinyin";
});