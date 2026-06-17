import { p2z, z2p } from "pinyin-to-zhuyin";


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


const z2np_options = {
  erhuaTone: "after-r",
  nlUmlautU: "preserveUmlaut",
  tonemarks: false,
  markNeutralTone: false,
  apostrophes: "auto"
};




const AudioType = {
  Off: "off",
  Yoyo: "yoyo",
  Dong: "dong",
  TTS: "tts",
  AltYoyoDong: "altyoyodong",
  AltDongYoyo: "altdongyoyo"
};

const STORAGE_KEY = "audioType";

// default fallback
let audioType = "off";

// load on startup
chrome.storage.sync.get(STORAGE_KEY, (res) => {
  audioType = res[STORAGE_KEY] || "off";
  // console.log("Audio type loaded:", audioType);

  // optional: initialize your logic here
  initAudioMode(audioType);
});

function initAudioMode(type) {
  // your setup logic
  if (type === "off") {
    // console.log("Audio disabled");
  } else {
    // console.log("Audio mode:", type);
  }
}


chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.audioType) {
    audioType = changes.audioType.newValue;
    // console.log("Audio type updated:", audioType);

    initAudioMode(audioType);
  }
});

function playTTS(zhuyin) {

  const utterance = new SpeechSynthesisUtterance(zhuyin);
  utterance.lang = "zh-CN";
  speechSynthesis.speak(utterance);

}


function playAudioFile(numbered_pinyin, audioTypeDongYoyo, zhuyin) {

  // console.log("Playing audio for:", numbered_pinyin, "with type:", audioTypeDongYoyo, "and zhuyin:", zhuyin);

  const audioUri = `audio/${audioTypeDongYoyo}/${numbered_pinyin}.mp3`

  const audioUrl = chrome.runtime.getURL(audioUri);

  const audio = new Audio(audioUrl);

  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
    console.log(`playing tts ${zhuyin}`)
    playTTS(zhuyin);
  });

}

function normalizeTone(str) {
  // if ends with 1–4 → keep as is
  if (/[1-4]$/.test(str)) return str;

  // otherwise remove ALL trailing numbers and add 1
  return str.replace(/\d+$/, "") + "1";
}

function convertNumberedPinyin(numbered_pinyin) {
  
  let converted = numbered_pinyin;
  

    converted = converted.replace(/ê/g, "ye");
  converted = converted.replace(/ü/g, "v");
    converted = converted.replace(/:/g, "");
  
  converted=normalizeTone(converted);

  console.log("Converted Numbered Pinyin:", converted);
  return converted
}


let lastPlayedNumberedPinyin = null;
let lastPlayedAudioType = null;


function playWord(word) {

  const zhuyin = p2z(word, p2z_options);
  const pinyin = z2p(zhuyin, z2p_options);
  const numbered_pinyin = z2p(zhuyin, z2np_options);

  if (zhuyin.length === 0) return;
  if (pinyin.length === 0) return;
  if (numbered_pinyin.length === 0) return;

  console.log("Zhuyin:", zhuyin);
  console.log("Pinyin:", pinyin);
  console.log("Numbered Pinyin:", numbered_pinyin);


  if (audioType === AudioType.Off) {
    return;
  }

  if (audioType === AudioType.TTS) {
    playTTS(zhuyin);
    return;
  }

  const convertedNumberedPinyin = convertNumberedPinyin(numbered_pinyin)


  if (audioType === AudioType.Dong || audioType === AudioType.Yoyo) {
    playAudioFile(convertedNumberedPinyin, audioType, zhuyin);
    return;
  }

  if (audioType === AudioType.AltYoyoDong || audioType === AudioType.AltDongYoyo) {

    if (lastPlayedNumberedPinyin === convertedNumberedPinyin) {

      if (lastPlayedAudioType === AudioType.Dong) {
        lastPlayedAudioType = AudioType.Yoyo;
      } else if (lastPlayedAudioType === AudioType.Yoyo) {
        lastPlayedAudioType = AudioType.Dong;
      }

    } else {
      if (audioType === AudioType.AltYoyoDong) {
        lastPlayedAudioType = AudioType.Yoyo;
      }else if (audioType === AudioType.AltDongYoyo) {
        lastPlayedAudioType = AudioType.Dong;
      }
    }

    lastPlayedNumberedPinyin = convertedNumberedPinyin;


    playAudioFile(lastPlayedNumberedPinyin, lastPlayedAudioType, zhuyin);

    return;

  }


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

  if (word.length === 0) return;

  console.log("Clicked word:", word);
  playWord(word);
});