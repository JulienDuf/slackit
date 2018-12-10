import { RTMClient, WebClient } from "@slack/client";
import { RealTimeMessagingApi } from "../src/decorators/real-time-messaging-api";
import { Team } from "../src/decorators/team";
import { WebApi } from "../src/decorators/web-api";
import { OnTeamInit } from "../src/interfaces/on-team-init";

@Team()
export class SlackTeam implements OnTeamInit {
    @WebApi()
    public webAppClient: WebClient;

    @RealTimeMessagingApi({
        useBotToken: true
    })
    public rtmBotClient: RTMClient;

    @WebApi({
        useBotToken: true
    })
    public webBotClient: WebClient;

    public async onTeamInit(): Promise<void> {
        const res = await this.webBotClient.conversations.list({
            types: 'private_channel'
        });
        const channels = (res as any).channels;
        const channel = channels.find(x => x.is_member);
        if (channel) {
            await this.rtmBotClient.sendMessage('Hello world!', channel.id);
        }
    }
}
