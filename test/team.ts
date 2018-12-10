import { RTMClient, WebClient } from "@slack/client";
import { RealTimeMessagingApi } from "../src/decorators/real-time-messaging-api";
import { Team } from "../src/decorators/team";
import { WebApi } from "../src/decorators/web-api";
import { OnTeamInit } from "../src/interfaces/on-team-init";

@Team()
export class SlackTeam implements OnTeamInit {
    @WebApi()
    public webAppClient: WebClient;

    @RealTimeMessagingApi(true)
    public rtmBotClient: RTMClient;

    @WebApi(true)
    public webBotClient: WebClient;

    public async onTeamInit(): Promise<void> {
        console.log('Team init');
    }
}
