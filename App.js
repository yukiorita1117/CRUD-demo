const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (res, req) => {
  res.send("Hello CRUD!!!");
});

//実際にwebで叩く場合うまくいかな場合があるのでportをprocess.env.PORTで行う。
app.listen(port, () => {
  //serverが立ち上がった時にする処理
  console.log(`ポート番号${port}で立ち上がりました。`);
});
