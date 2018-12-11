import * as express from "express";
import { promisify } from "util";
import { TeamConfig } from "./config/team.config";
import { CommandHandler } from "./handlers/command.handler";
import { TeamHandler } from "./handlers/team.handler";
import { Team } from "./interfaces/team";
import * as bodyParser from 'body-parser';

export class Slackit {
    private teamHandler: TeamHandler = new TeamHandler(this.team);
    private commandHandler: CommandHandler;
    private app: express.Application;
    private teams: Team[] = [];

    constructor(private team: Function, private config: TeamConfig) {
        this.init();

        if (this.config.appToken) {
            this.initTeamApp(this.config);
        }
    }

    public async listen(port: number): Promise<void> {
        this.app.listen(port);
    }

    public async registerCommands(...commands: Function[]): Promise<void> {
        for (const command of commands) {
            this.commandHandler.setupCommand(command);
        }
    }

    private init() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.commandHandler = new CommandHandler(this.app);
    }

    private initTeamApp(config: TeamConfig) {
        this.teams.push(this.teamHandler.createTeam(config));
    }
}
