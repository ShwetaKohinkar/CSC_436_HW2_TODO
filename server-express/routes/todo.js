const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAh2ThHmXQ4sdkE5uoxQd80E6QzdcVyat817wD3LONirRDPDl7
W6W9vn2Fg06b9NBT4ptMyCjg2eJu1ubSTIVKL28mnCWJNn8qoK+zinylG5JQ4pz1
XH2UndSeREh1N1eOQVyqlUkxqKPE3KqZ/1MKI8Lk1r/PQ/S1d5VcMcFvZK8+82WR
2PbaV/iB01c5rxNx/IbMOMBcwB4UvgskSk6ximzmEBCxJGsPWJK5xyFs4XB+F3eU
9T5+7on4VTqjJAU8c8wsWbsqHZeto2QcDKi6OKQ1R1OPv5uh4RUOaEkOxd8i4QSL
KIOADCF/PqqECAH+QchMxOJdFk7ti6PQt6Zf/wIDAQABAoIBADRCa+IfypC+BZLL
8kiaq0J8EMhizLYaywU6PQNjCq8PBSSpy0OEpchxCqe0H95OyxIcf3aC0MdI7x9j
2KhQimHktTJwCpZOX1XGe7ZohhIuV6ogi1Q35LVG7A/PJ+9EjFQOQIl+xvwgukuy
Td6PXsqO32VEg+vm+GQ/8mYCE8z4gLYJ3Bwjn4ACkIj3bUkNLF9Ic0kKH0aqD7kS
MII6o7o6GZCkNyP/Ef7mHpkDcH6W+Hm0vBMXtHCXDKRU+AjHS6ffXWDuWGr88+2g
R3cGnQCsK6IafepsUDSsBu3miYCMYlArJBJUHiGeDGjmiMreog3iykon8emyn8Vp
CrACCwECgYEA/oLpKFnPlJv3U7sxOdo688RJH6xaWAGQrGn7sScQ7JC4nTxQOASW
hW+/y/B1i0KUn5kumdljwNRXpD7KGNPi4qjFlxWXv9gwwSPAzgKV9qXTd2DPcUui
TvoaOrd8kk0nf/+7KV7UZuoiHZUZy/y+PuohUJ0muWHwUA1z7turlycCgYEAiC+c
IJIZ4H7wVaYS/bi6KJkvEzFDHvfHT680G/p8X4/9mN7I+e6K9xDmD7Bv36gswk/X
ahvQ83PyjxMF3rKXDV+4pSGxKjeVkY2FTC8sTpdrF3YUZFqcRcbLlwfwW7EBxJhJ
A+XwBkqtyteFh3P0HM6d1aYCmfj6nO0D1phUN2kCgYEApfrR+5K2oYAlh+GodMYx
dBAqcBGCyaobo5Vqo1mK2/x1qXVQC3hSgasjNekXfz5olrzbe1Iej/7rOR4Jxq9I
Y/EVCzb1xBNFmG+sqa1eB4CVrGDiaEyfCUpqGKjZAMB4Zi1s7cn+Uy+WGBzIuhOW
LomaOGyEeJm6kzpyxO9VtDkCgYA545MIPVKGnS7oGWolM+rd6w+Zpu0TMtwkQSNz
aSyJKpnv63Oe2gl0MFi6/pLvjXtJNcsprZ1Kf1TyAHIUUfHnm3LPrtyyR2Jqtq+c
zMiWt8Kr/GN6rRGUj4ZnMta3AyzvNpSC9bDr2764ZJi8FUwFGsb41FJyxOUy44Uo
KSRTUQKBgQD2NcDsXi3NhuyGNxw+MqGNvsiqwt05/ClmN8gsqy5u4asdg/hiDMGK
uSnBW7RpBzF1zphddM3spYNCYZTGg3YsgJJQ6TbW7my8evPfXeU7doEcgWh1oaqZ
jffEXSuklEYyoKx7M3A6ouCYNzZkfDRSbSqQJ6u0Z1E9VPBJV1VSBQ==
-----END RSA PRIVATE KEY-----
`;

router.use(function (req, res, next) {
  // console.log("In post router");
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  //console.log("In POST /post handler", JSON.stringify(req));
  const post = new Todo({
    title: req.body.title,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    isCompleted: req.body.isCompleted,
    dateCompleted: req.body.dateCompleted,
    author: req.payload.id,
    
  });
  post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        _id: savedPost._id,
        title: savedPost.title,
        description: savedPost.description,
        dateCreated: savedPost.dateCreated,
        isCompleted: savedPost.isCompleted,
        dateCompleted: savedPost.dateCompleted,
        author: savedPost.author,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  //console.log("In GET /post handler");
  Todo.find()
    .where("author")
    .equals(req.payload.id)
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.put("/:id", async function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body)
  .then((todo) => {
    if (todo) {
      return res.status(200).json({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        dateCreated: todo.dateCreated,
        isCompleted: todo.isCompleted,
        dateCompleted: todo.dateCompleted,
        author: todo.author,
      });
    }
  })
  .catch((error) => {
    // Handle the error here
  });
});

router.delete("/:id", async function (req, res) {
  Todo.findByIdAndDelete(req.params.id)
    .then((todo) => {
      if (todo) {
        return res.status(200).json({
          _id: todo._id,
        });
      }
    })
    .catch((error) => {
      // Handle the error here
    });
});

module.exports = router;