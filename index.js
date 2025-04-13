import { server } from "./app.js";
import { conectDB } from "./db/index.js";

const port = process.env.PORT || 3000;

const startServer = async () => {

    console.log("server is starting ...");
    try {
      // await conectDB();
      server.listen(port, () => {
        console.log("Server listening on port 3000");
      });
    } catch (error) {
      console.log(`Error starting server: ${error}`);
    }
  };
  
startServer();