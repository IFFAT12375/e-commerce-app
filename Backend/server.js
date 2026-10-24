const path = require("path");

// Load environment variables FIRST from the project's config folder
require("dotenv").config({
  path: path.join(__dirname, "config", "config.env"),
});

const app = require("./app");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();

    //config cloudinary

    const server = app.listen(PORT, () => {
      console.log(`Server is working on http://localhost:${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error(`Unhandled rejection: ${err.message}`);

      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error(`Server startup failed: ${err.message}`);
    process.exit(1);
  }
}

startServer();