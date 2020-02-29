const express = require("express");
const app = express();

app.get("/", (res, req) => {
  res.send("Hello CRUD!!!");
});

app.listen(3001, () => {
  //serverが立ち上がった時にする処理
  console.log("ポート番号3001で立ち上がりました。");
});
