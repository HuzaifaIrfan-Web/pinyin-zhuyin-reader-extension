import fs from "fs";
import path from "path";

const dongOutputDir = "public/audio/dong";
const yoyoOutputDir = "public/audio/yoyo";

function getFilenames(dir) {
  return fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isFile());
}

const dongFiles = new Set(getFilenames(dongOutputDir));
const yoyoFiles = new Set(getFilenames(yoyoOutputDir));

const onlyDong = [...dongFiles].filter((name) => !yoyoFiles.has(name));
const onlyYoyo = [...yoyoFiles].filter((name) => !dongFiles.has(name));

if (onlyDong.length === 0 && onlyYoyo.length === 0) {
  console.log("All filenames are present in both directories.");
} else {
  if (onlyDong.length) {
    console.log("Only in dong:", onlyDong.join(", "))
  }
  if (onlyYoyo.length) {
    console.log("Only in yoyo:", onlyYoyo.join(", "))
  }
}


// Only in dong: ong1.mp3
// Only in yoyo: dia1.mp3, dia2.mp3, dia3.mp3, dia4.mp3, sou3.mp3