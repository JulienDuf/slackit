import * as express from "express";
import { promisify } from "util";
import { TeamConfig } from "./config/team.config";
import { TeamHandler } from "./handlers/team.handler";
import { Team } from "./interfaces/team";

export class Slackit {
    private teamHandler: TeamHandler = new TeamHandler(this.team);
    private app: express.Application;
    private teams: Team[] = [];

    constructor(private team: Function, private config: TeamConfig) {
        this.init();

        if (this.config.appToken) {
            this.initTeamApp(this.config);
        }
    }

    public async listen(port: number): Promise<void> {
        return promisify<number, void>(this.app.listen)(port);
    }

    private init() {
        this.app = express();
    }

    private initTeamApp(config: TeamConfig) {
        this.teams.push(this.teamHandler.createTeam(config));
    }
}
