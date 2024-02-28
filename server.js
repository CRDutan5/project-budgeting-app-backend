const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Listening from Port ${PORT}`);
});
