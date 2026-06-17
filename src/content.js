import { p2z, z2p } from "pinyin-to-zhuyin";


const p2z_options = {
  tonemarks: true,
  inputHasToneMarks: true,
  convertPunctuation: false
};

const z2p_options = {
  erhuaTone: "after-r",
  nlUmlautU: "preserveUmlaut",
  tonemarks: false,
  markNeutralTone: false,
  apostrophes: "auto"
};


function playAudio(word) {

  const zhuyin = p2z(word, p2z_options);
  const pinyin = z2p(zhuyin, z2p_options);

  console.log("Zhuyin:", zhuyin);
  console.log("Pinyin:", pinyin);

  const utterance = new SpeechSynthesisUtterance(zhuyin);
  utterance.lang = "zh-CN";
  speechSynthesis.speak(utterance);

  // const audioUrl = `https://fanyi.baidu.com/gettts?lan=zh&text=${encodeURIComponent(word)}&spd=3&source=web`;


  // const audio = new Audio(audioUrl);
  // audio.play().catch((error) => {
  //   console.error("Error playing audio:", error);
  // });
}





function isWordChar(ch) {
  return /[a-zA-Z0-9āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ\u3105-\u312F˙ˊˇˋ':]/u.test(ch);
}

document.addEventListener("click", (e) => {

  // const selectedText = window.getSelection().toString().trim().toLowerCase(); 
  // if (!selectedText) return;

  //     console.log("Selected text:", selectedText);

  //   // const target = e.target;

  //   // if (!target || !target.textContent) return;

  //   // const text = target.textContent.trim().toLowerCase();

  //   // console.log("Clicked text:", text);



  const range = document.caretRangeFromPoint?.(e.clientX, e.clientY);
  if (!range) return;

  const node = range.startContainer;

  if (node.nodeType !== Node.TEXT_NODE) return;

  const text = node.textContent;
  const offset = range.startOffset;

  let start = offset;
  let end = offset;

  while (start > 0 && isWordChar(text[start - 1])) {
    start--;
  }

  while (end < text.length && isWordChar(text[end])) {
    end++;
  }

  const word = text.slice(start, end).trim().toLowerCase();

  console.log("Clicked word:", word);
  playAudio(word);
});