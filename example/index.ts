import { Slackit } from "../src/slackit";
import { HelloWorld } from "./command";
import { SlackTeam } from "./team";

async function boostrap() {
    const app = new Slackit(SlackTeam, {
        appToken: process.env.APP_TOKEN,
        botToken: process.env.BOT_TOKEN
    });
    await app.registerCommands(HelloWorld);
    await app.listen(3000);
}

boostrap();
