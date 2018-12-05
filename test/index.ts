import { Slackit } from '../src/slackit';

async function boostrap() {
    const app = new Slackit({
        appToken: "",
        botToken: ""
    });
    await app.listen(3000);
}

boostrap();
