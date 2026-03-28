import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路徑設定
const PHRASES_PATH = path.join(__dirname, '../src/data/vietnamese-phrases.json');
const AUDIO_DIR = path.join(__dirname, '../public/audio/vietnamese');

// 確保資料夾存在
if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // 刪除失敗的文件
            reject(err);
        });
    });
}

async function main() {
    try {
        const data = fs.readFileSync(PHRASES_PATH, 'utf8');
        const phrases = JSON.parse(data);

        console.log(`🔍 檢查中... 共發現 ${phrases.length} 個短語。`);

        for (const phrase of phrases) {
            const fileName = `${phrase.id}.mp3`;
            const filePath = path.join(AUDIO_DIR, fileName);

            if (fs.existsSync(filePath)) {
                console.log(`✅ 已存在: ${phrase.id}`);
                continue;
            }

            console.log(`⏳ 下載中: ${phrase.id} ("${phrase.vietnamese}")...`);
            const encodedText = encodeURIComponent(phrase.vietnamese);
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=vi&client=tw-ob`;

            try {
                await downloadFile(url, filePath);
                console.log(`✨ 下載完成: ${phrase.id}`);
                // 稍微延遲一下，避免對 Google 請求過快
                await new Promise(r => setTimeout(r, 500));
            } catch (err) {
                console.error(`❌ 下載失敗 ${phrase.id}: ${err.message}`);
            }
        }

        console.log('\n🎉 所有音檔同步完成！');
    } catch (err) {
        console.error('❌ 執行發生錯誤:', err);
    }
}

main();
