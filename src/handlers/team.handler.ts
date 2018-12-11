import { RTMClient, WebClient } from "@slack/client";
import { TeamConfig } from "../config/team.config";
import { Team } from "../interfaces/team";
import { TeamScanner } from "../scanners/team.scanner";

export class TeamHandler {
    private scanner: TeamScanner;

    constructor(private team: Function) {
        this.scanner = new TeamScanner(team);
    }

    public createTeam(config: TeamConfig): Team {
        const team = this.newTeam() as Team;
        this.createWebApi(team, config);
        this.createRealTimeMessagingApi(team, config);

        this.initTeam(team);

        return team;
    }

    private newTeam(): Object {
        return new this.team.prototype.constructor();
    }

    private createWebApi(team: Object, config: TeamConfig) {
        const api = this.scanner.getWebApi();
        for (const metadata of api) {
            const token = metadata.config ? metadata.config.useBotToken ? config.botToken : config.appToken : config.appToken;
            const options = metadata.config ? metadata.config.options : null;
            team[metadata.property] = options ? new WebClient(token, options) : new WebClient(token);
        }
    }

    private createRealTimeMessagingApi(team: Object, config: TeamConfig) {
        const api = this.scanner.getRealTimeMessagingApi();
        for (const metadata of api) {
            const token = metadata.config ? metadata.config.useBotToken ? config.botToken : config.appToken : config.appToken;
            const options = metadata.config ? metadata.config.options : null;
            team[metadata.property] = options ? new RTMClient(token, options) : new RTMClient(token);
        }
    }

    private initTeam(team: Team) {
        if (team.onTeamInit) {
            team.onTeamInit();
        }
    }
}
