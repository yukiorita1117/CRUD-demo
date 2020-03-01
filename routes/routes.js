const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

router.get("/courses", (req, res) => {
  res.send(courses);
});

router.post("/courses", (req, res) => {
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

router.get("/courses/:id", (req, res) => {
  const course = searchData(req.params.id);
  res.send(course);
});

// putで更新処理
router.put("/courses/:id", (req, res) => {
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
router.delete("/courses/:id", (req, res) => {
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

// router.get("/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

module.exports = router;
