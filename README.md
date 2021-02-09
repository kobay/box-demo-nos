# DEMO

画面のボタンを押すと、プロジェクト名を元にBOXのフォルダを検索し、なければ作成し、新タブでBOX画面を開く。

## つかいかた

1. Boxのマイアプリ画面で、カスタムアプリをJWT認証で作成する。
2. config.jsonをダウンロードし、プロジェクト直下に配置する。
3. app.jsの4行目をコメントインして、ダウンロードしたconfigファイルを読み込む。この際、5,6行目はコメントアウトする。
   ```
   const config = require("./302642225_1ojrpkkq_config.json");
   // require("dotenv").config();
   // const config = JSON.parse(process.env.config);
   ```
4. config.jsonを利用せず、.envを使う場合は、以下のコマンドで.envファイルを作成する。(mac/linux)
    ```
    printf "config=%s" "$(cat 302642225_1ojrpkkq_config.json | tr -d '\n')" > .env
    ```
5. `npm run dev` を実行し、localhost:3000にアクセスする。

