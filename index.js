const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// ポート番号
const port = 3000;

// 静的ファイル (HTML, CSS, JavaScript) の提供
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ダウンロード用エンドポイント
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'videos', filename); // videosディレクトリに動画ファイルを保存

  // ファイルが存在するか確認
  if (!fs.existsSync(filepath)) {
    return res.status(404).send('File not found');
  }

  res.download(filepath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
