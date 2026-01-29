https://video.unext.jp を開くだけの electron アプリ

```画像準備中```

一度ログインすると、再起動しても最初から unext へログインしたままになります。

# 使い方
以下から zip をダウンロードして展開し、 exe を実行します

```https://github.com/sakkuntyo/electron-unext/releases```

# 概要
- nodejs 18.15 で動作確認。
- package.json は index.js -> main.js へ変更する以外に変更していません。
- npm install したパッケージは npx で使用する必要があります。

# メモ
- 動作確認
  - ```npx electron .```
- パッケージング
  - ```npx electron-packager . unext-client --platform=win32 --arch=x64 --overwrite```
