import express from "express";

const app = express();

app.use((req, res) => {
  console.log(new Date(), req.url, req.headers);
  return res.send("ok");
});

app.listen("3000", e => {
  if (e) {
    console.error(e);
  } else {
    console.log("debug server listening on port 3000...");
  }
});
