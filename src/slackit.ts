import * as express from "express";
import { promisify } from "util";
import { TeamConfig } from "./config/team.config";
import { Team } from "./interfaces/team";

export class Slackit {
    private app: express.Application;
    private teams: Team[] = [];

    constructor(team: Function, private config: TeamConfig) {
        this.init();

        if (this.config.appToken) {
            this.initTeamApp(this.config, team);
        }
    }

    public async listen(port: number): Promise<void> {
        return promisify<number, void>(this.app.listen)(port);
    }

    private init() {
        this.app = express();
    }

    private initTeamApp(config: TeamConfig, teamDefinition: Function) {
        const team = new teamDefinition.prototype.constructor() as Team;
        this.teams.push(team);

        // TODO: Put this in an handler
        if (team.onTeamInit) {
            team.onTeamInit();
        }
    }
}
