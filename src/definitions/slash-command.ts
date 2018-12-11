import { Team } from "../interfaces/team";

export abstract class SlashCommand {
    public abstract execute(team: Team, text: string): Promise<any>;
}
