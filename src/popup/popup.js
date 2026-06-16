

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

const sp2zBtn = document.getElementById("sp2z");

let runningP2Z = false;

sp2zBtn.addEventListener("click", () => {
  runningP2Z = !runningP2Z;

  send(runningP2Z ? "START" : "STOP", "p2z");

  sp2zBtn.textContent = runningP2Z ? "Stop Pinyin→Zhuyin" : "Start Pinyin→Zhuyin";
});

const sz2pBtn = document.getElementById("sz2p");

let runningZ2P = false;

sz2pBtn.addEventListener("click", () => {
  runningZ2P = !runningZ2P;

  send(runningZ2P ? "START" : "STOP", "z2p");

  sz2pBtn.textContent = runningZ2P ? "Stop Zhuyin→Pinyin" : "Start Zhuyin→Pinyin";
});