import { TeamApp } from '../src/team-app';

async function boostrap() {
    const app = new TeamApp({
        appToken: process.env.APP_TOKEN,
        botToken: process.env.BOT_TOKEN
    });
    await app.listen(3000);

    const res = await app.appWebClient.conversations.list({
        types: 'private_channel'
    });
    const channels = (res as any).channels;
    const channel = channels.find(x => x.is_member);
    if (channel) {
        await app.appRtmClient.sendMessage('Hello world!', channel.id);
    }
}

boostrap();
