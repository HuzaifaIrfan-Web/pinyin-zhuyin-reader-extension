import { p2z, z2p } from "pinyin-to-zhuyin";

const running_interval = 100; // ms

const p2z_options = {
  tonemarks: true,
  inputHasToneMarks: true,
  convertPunctuation: false
};

const z2p_options = {
  erhuaTone: "after-r",
  nlUmlautU: "preserveUmlaut",
  tonemarks: true,
  markNeutralTone: false,
  apostrophes: "auto"
};

let intervalId = null;
let currentMode = null;


function splitWords(text) {
  return text.split(/(\s+)/);
}

function convert(text, mode) {
  return splitWords(text)
    .map(part => {
      if (/\s+/.test(part)) return part;
      try {
        return mode === "p2z"
          ? p2z(part, p2z_options)
          : z2p(part, z2p_options);
      } catch {
        return part;
      }
    })
    .join("");
}

function walk(node, mode) {
  const blacklist = ["SCRIPT", "STYLE", "NOSCRIPT"];

  if (node.nodeType === 3) {
    const original = node.nodeValue;
    if (!original.trim()) return;

    const updated = convert(original, mode);
    node.nodeValue = updated;
    return;
  }

  if (blacklist.includes(node.nodeName)) return;

  for (const child of node.childNodes) {
    walk(child, mode);
  }
}


function start(mode) {
  stop(); // prevent duplicates

  currentMode = mode;

  intervalId = setInterval(() => {
    walk(document.body, currentMode);
  }, running_interval);

  chrome.storage.local.set({
    running: true,
    mode: currentMode
  });
}

function stop() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;

  chrome.storage.local.set({
    running: false,
    mode: null
  });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "RUN_ONCE") {
    walk(document.body, msg.mode);
  }

  if (msg.type === "START") {
    start(msg.mode);
  }

  if (msg.type === "STOP") {
    stop();
  }
});

// chrome.storage.local.get(["running", "mode"], (data) => {
//   if (data.running && data.mode) {
//     start(data.mode);
//   }
// });