const express = require("express");
const boxSDK = require("box-node-sdk");

// const config = require("./302642225_1ojrpkkq_config.json");
require("dotenv").config();
const config = JSON.parse(process.env.config);

const app = express();

app.use(express.urlencoded({ extended: false }));

const sdk = boxSDK.getPreconfiguredInstance(config);
const saClient = sdk.getAppAuthClient("enterprise");

let buffer = "";
for (let i = 1; i <= 12; i++) {
  buffer += `<div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <div class="card-body">
                  <p class="card-text">案件 ${i}</p>
                  <p class="card-text">案件ID：NOS-企業A-案件${i}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <form action="/box" method="post" target="_blank">
                        <input type="hidden" name="name" value="NOS-企業A-案件${i}">
                        <button type="submit" class="btn btn-outline-primary">BOXのフォルダを開く</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
}

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(
    `

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>DEMO</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
  
  </head>

  <body>

    <header>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <strong>DEMO</strong>
          </a>
        </div>
      </div>
    </header>

    <main role="main">

      <section class="jumbotron text-center">
        <div class="container p-5">
          <h1 class="jumbotron-heading">企業Aの案件一覧</h1>
          <p class="lead text-muted">企業Aに紐づく案件の一覧です</p>

        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">

          <div class="row">
          ${buffer}
          </div>
        </div>
      </div>

    </main>

    <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <b>Powered By Box</b>
        </p>
      </div>
    </footer>

  </body>
</html>
    `
  );
});

const folderA = "130896112454";

app.post("/box", async (req, res) => {
  const name = req.body.name;
  // 名前で探す
  const items = await saClient.folders.getItems(folderA, {
    limit: 1000,
  });
  const found = items.entries?.find((e) => {
    return e.name === name && e.type === "folder";
  });
  if (found) {
    return res.redirect(
      `https://hkobayashi-dev.app.box.com/folder/${found.id}`
    );
  }
  const created = await saClient.folders.create(folderA, name);

  return res.redirect(
    `https://hkobayashi-dev.app.box.com/folder/${created.id}`
  );
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log("Express Server started on port: " + PORT);
});
