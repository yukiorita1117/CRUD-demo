const express = require("express");
const app = express();

const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

app.use(express.json());
//body-parser middlewareを使得るようにする
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello CRUD!");
});

// app.get("/:year/:month", (req, res) => {
//   res.send(`${req.params.year}年の${req.params.month}月の記事です。`);
// });

// app.get("/jsonGet", (req, res) => {
//   //queryStringもjson形式で取得できる
//   res.send(req.query);
// });

//実際にwebで叩く場合うまくいかな場合があるのでportをprocess.env.PORTで行う。
app.listen(port, () => {
  //serverが立ち上がった時にする処理
  console.log(`ポート番号${port}で立ち上がりました。`);
});
