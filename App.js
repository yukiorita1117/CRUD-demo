const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

app.use(express.json());
//body-parser middlewareを使得るようにする
app.use(bodyParser.urlencoded({ extended: true }));

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello CRUD!");
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.post("/courses", (req, res) => {
  let course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
  //reqのparamsはstring情報なのでint型にparseする。
  let course = courses.find(e => e.id === parseInt(req.params.id));
  if (!course) {
    res.send("該当コースないで！");
  }
  res.send(course);
});

// app.get("/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

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
