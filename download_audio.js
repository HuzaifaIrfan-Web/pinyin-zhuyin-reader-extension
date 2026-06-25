


const yoyoDownloadUrl = "https://cdn.yoyochinese.com/audio/pychart/"
const yoyoOutputDir = "public/audio/yoyo";

const dongDownloadUrl = "https://data.dong-chinese.com/pinyin/b/"
const dongOutputDir = "public/audio/dong";

const archDownloadUrl = "https://www.archchinese.com/swf/"
const archOutputDir = "public/audio/arch";






var PINYIN_INITIALS = [
    "b",
    "p",
    "m",
    "f",
    "d",
    "t",
    "n",
    "l",
    "g",
    "k",
    "h",
    "j",
    "q",
    "x",
    "z",
    "c",
    "s",
    "zh",
    "ch",
    "sh",
    "r",
    "w",
    "y",
    "v" // ü-series placeholder
];

var PINYIN_FINALS = [
    "a", "ai", "an", "ang", "ao",
    "e", "ei", "en", "eng", "er",
    "i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iou",
    "o", "ong", "ou",
    "u", "ua", "uai", "uan", "uang", "uei", "uen", "ueng", "uo",
    "ü", "üan", "üe", "ün",
    "v", "ve", "vn", "ue",
    "ui", "un",
    "au"
].sort((a, b) => b.length - a.length);


var PINYIN_ALL = [
    // special syllables
    "zi", "ci", "si", "zhi", "chi", "shi", "ri",

    // a-series
    "a", "ba", "pa", "ma", "fa", "da", "ta", "na", "la", "ga", "ka", "ha",
    "za", "ca", "sa", "zha", "cha", "sha",

    "ai", "bai", "pai", "mai", "dai", "tai", "nai", "lai", "gai", "kai", "hai",
    "zai", "cai", "sai", "zhai", "chai", "shai",

    "an", "ban", "pan", "man", "fan", "dan", "tan", "nan", "lan", "gan", "kan", "han",
    "zan", "can", "san", "zhan", "chan", "shan", "ran",

    "ang", "bang", "pang", "mang", "fang", "dang", "tang", "nang", "lang", "gang", "kang", "hang",
    "zang", "cang", "sang", "zhang", "chang", "shang", "rang",

    "ao", "bao", "pao", "mao", "dao", "tao", "nao", "lao", "gao", "kao", "hao",
    "zao", "cao", "sao", "zhao", "chao", "shao", "rao",

    "e", "me", "de", "te", "ne", "le", "ge", "ke", "he", "ze", "ce", "se",
    "zhe", "che", "she", "re",

    "ei", "bei", "pei", "mei", "fei", "dei", "nei", "lei", "gei", "hei", "zei", "zhei", "shei",

    "en", "ben", "pen", "men", "fen", "nen", "gen", "ken", "hen", "zen", "cen", "sen",
    "zhen", "chen", "shen", "ren",

    "eng", "beng", "peng", "meng", "feng", "deng", "teng", "neng", "leng", "geng", "keng", "heng",
    "zeng", "ceng", "seng", "zheng", "cheng", "sheng", "reng",

    "er",

    // i-series
    "yi", "bi", "pi", "mi", "di", "ti", "ni", "li", "ji", "qi", "xi",
    "ya", "dia", "lia", "jia", "qia", "xia",

    "yan", "bian", "pian", "mian", "dian", "tian", "nian", "lian", "jian", "qian", "xian",
    "yang", "niang", "liang", "jiang", "qiang", "xiang",

    "yao", "biao", "piao", "miao", "diao", "tiao", "niao", "liao", "jiao", "qiao", "xiao",

    "ye", "bie", "pie", "mie", "die", "tie", "nie", "lie", "jie", "qie", "xie",

    "yin", "bin", "pin", "min", "nin", "lin", "jin", "qin", "xin",
    "ying", "bing", "ping", "ming", "ding", "ting", "ning", "ling", "jing", "qing", "xing",

    "yong", "jiong", "qiong", "xiong",

    "you", "miu", "diu", "niu", "liu", "jiu", "qiu", "xiu",

    // o-series
    "o", "bo", "po", "mo", "fo",
    "dong", "tong", "nong", "long", "gong", "kong", "hong",
    "zong", "cong", "song", "zhong", "chong", "rong",

    "ou", "pou", "mou", "fou", "dou", "tou", "lou", "gou", "kou", "hou",
    "zou", "cou", "sou", "zhou", "chou", "shou", "rou",

    // u-series
    "wu", "bu", "pu", "mu", "fu",
    "du", "tu", "nu", "lu", "gu", "ku", "hu",
    "zu", "cu", "su", "zhu", "chu", "shu", "ru",

    "wa", "gua", "kua", "hua", "zhua", "shua",
    "wai", "guai", "kuai", "huai", "zhuai", "chuai", "shuai",

    "wan", "duan", "tuan", "nuan", "luan", "guan", "kuan", "huan",
    "zuan", "cuan", "suan", "zhuan", "chuan", "shuan", "ruan",

    "wang", "guang", "kuang", "huang", "zhuang", "chuang", "shuang",

    "wei", "dui", "tui", "gui", "kui", "hui", "zui", "cui", "sui", "zhui", "chui", "shui", "rui",

    "wen", "dun", "tun", "lun", "gun", "kun", "hun",
    "zun", "cun", "sun", "zhun", "chun", "shun", "run",

    "weng", "wo",
    "duo", "tuo", "nuo", "luo", "guo", "kuo", "huo",
    "zuo", "cuo", "suo", "zhuo", "chuo", "shuo", "ruo",

    // ü-series
    "yu", "nü", "lü", "ju", "qu", "xu",
    "yuan", "juan", "quan", "xuan",
    "yue", "nüe", "lüe", "jue", "que", "xue",
    "yun", "jun", "qun", "xun",

    "nou", "ong",
    "v", "ve",
    "nv", "lv",
    "nue", "lue",
    "nve", "lve"


];


PINYIN_ALL = PINYIN_ALL.concat(PINYIN_INITIALS)
PINYIN_ALL = PINYIN_ALL.concat(PINYIN_FINALS)


var downloadCount = 0;

import fs from 'fs';
import https from 'https';

function downloadAudio(url, outputFilePath) {
    const tempFilePath = `${outputFilePath}.tmp`;

    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Error downloading ${url}: HTTP ${response.statusCode}`);
            response.resume();
            return;
        }

        const file = fs.createWriteStream(tempFilePath);
        response.pipe(file);

        file.on('finish', () => {
            file.close(() => {
                validateMp3File(tempFilePath, (isValid) => {
                    if (!isValid) {
                        fs.unlink(tempFilePath, () => { });
                        console.error(`Invalid MP3 audio at ${url}`);
                        return;
                    }

                    fs.rename(tempFilePath, outputFilePath, (err) => {
                        if (err) {
                            fs.unlink(tempFilePath, () => { });
                            console.error(`Error saving file ${outputFilePath}: ${err.message}`);
                            return;
                        }
                        console.log(`downloadCount: ${downloadCount + 1}/${PINYIN_INITIALS.length * tones.length} - Downloaded: ${outputFilePath}`);
                        downloadCount++;
                    });
                });
            });
        });

        file.on('error', (err) => {
            fs.unlink(tempFilePath, () => { });
            console.error(`Error writing to ${tempFilePath}: ${err.message}`);
        });
    }).on('error', (err) => {
        fs.unlink(tempFilePath, () => { });
        console.error(`Error downloading ${url}: ${err.message}`);
    });
}

function validateMp3File(filePath, callback) {
    const stream = fs.createReadStream(filePath, { start: 0, end: 3 });
    let buffer = Buffer.alloc(0);

    stream.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
    });

    stream.on('end', () => {
        const isId3 = buffer.length >= 3 && buffer.toString('utf8', 0, 3) === 'ID3';
        const isFrame = buffer.length >= 2 && buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0;
        callback(isId3 || isFrame);
    });

    stream.on('error', () => callback(false));
}


const tones = ["1", "2", "3", "4"];

function downloadPinyinChart(url, outputDir) {


    console.log(`Started downloading from ${url}. Total syllables: ${PINYIN_INITIALS.length * tones.length}`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }




    PINYIN_ALL.forEach(all_syllable => {

        tones.forEach(tone => {
            var pinyinSyllable = all_syllable + tone;

            const audioUrl = `${url}${pinyinSyllable}.mp3`;
            const outputFilePath = `${outputDir}/${pinyinSyllable}.mp3`;

            if (!fs.existsSync(outputFilePath)) {
                downloadAudio(audioUrl, outputFilePath);
            } else {
                // console.log(`File already exists: ${outputFilePath}`);
            }

        });

    });



    // PINYIN_INITIALS.forEach(initial_syllable => {

    //     PINYIN_FINALS.forEach(final_syllable => {

    //         tones.forEach(tone => {
    //             var pinyinSyllable = initial_syllable + final_syllable + tone;

    //             const audioUrl = `${url}${pinyinSyllable}.mp3`;
    //             const outputFilePath = `${outputDir}/${pinyinSyllable}.mp3`;

    //             if (!fs.existsSync(outputFilePath)) {
    //                 downloadAudio(audioUrl, outputFilePath);
    //             } else {
    //                 console.log(`File already exists: ${outputFilePath}`);
    //             }

    //         });

    //     });

    // });





}



// const readline = require("readline");
import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter 1:yoyo, 2:dong, or 3:arch ", (input) => {
    switch (input.trim()) {
        case "1":
            downloadPinyinChart(yoyoDownloadUrl, yoyoOutputDir);
            break;
        case "2":
            downloadPinyinChart(dongDownloadUrl, dongOutputDir);
            break;
        case "3":
            downloadPinyinChart(archDownloadUrl, archOutputDir);
            break;
        default:
            console.log("Invalid input");
    }

    rl.close();
});






