import * as express from 'express';
import { SlashCommand } from "../definitions/slash-command";
import { CommandScanner } from "../scanners/command.scanner";

export class CommandHandler {
    private scanner: CommandScanner;

    constructor(private app: express.Application) {
        this.scanner = new CommandScanner();
    }

    public setupCommand(target: Function) {
        const name = this.scanner.getName(target);
        this.app.post(`/${name}`, async (req, res) => {
            const teamId = req.body.teamId;
            const command = new target.prototype.constructor() as SlashCommand;
            const result = await command.execute(teamId as any, req.body.text);
            res.json(result);
        });
    }
}
