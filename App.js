const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const Joi = require("@hapi/joi");

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
  //dataの形式を決定するもの
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  const result = schema.validate(req.body);
  //validate()の戻り値はオブジェクト
  //postmanにerrorの時messageを吐かせる。
  if (result.error) {
    res.send(result.error.details[0].message);
  }

  let course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = searchData(req.params.id);
  res.send(course);
});

// putで更新処理
app.put("/courses/:id", (req, res) => {
  //1.データ(course)を探す
  searchData(req.params.id);
  //2.バリデーションする
  //   validate()の実態はエラー時
  //   { value: { name: 'aaa', aaa: 'aaaa' },
  //     error: [Error [ValidationError]: "aaa" is not allowed] {
  //     _original: { name: 'aaa', aaa: 'aaaa' },
  //     details: [ [Object] ]
  //   }

  let { error } = validate(req.body);
  if (error) {
    res.send(error.details[0].message);
  }
  //3.データを編集し、結果を返す。
  courses.forEach(e => {
    if (e.id === parseInt(req.params.id)) {
      e.name = req.body.name;
    }
  });
  res.send(courses);
});

// deleteで削除処理を行う
app.delete("/courses/:id", (req, res) => {
  //該当のdataがあるか検索
  const course = searchData(req.params.id);
  //該当dataを削除する
  let index = courses.indexOf(course);
  console.log(courses.splice(index, 1));
  courses.splice(index, 1);
  //結果を返す
  res.send(courses);
});

function searchData(reqParamsId) {
  //reqのparamsはstring情報なのでint型にparseする。
  let course = courses.find(e => e.id === parseInt(reqParamsId));
  if (!course) {
    res.send("該当コースないで！");
  }
  return course;
}

function validate(course) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  return schema.validate(course);
}

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
