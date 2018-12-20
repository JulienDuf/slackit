import { Command } from "../src/decorators/command";
import { SlashCommand } from "../src/definitions/slash-command";
import { Team } from "../src/interfaces/team";

@Command()
export class HelloWorld extends SlashCommand {
    public async execute(team: Team, text: string): Promise<any> {
        return {
            text: 'Hello world!'
        };
    }
}
