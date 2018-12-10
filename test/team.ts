import { Team } from "../src/decorators/team";
import { OnTeamInit } from "../src/interfaces/on-team-init";

@Team()
export class SlackTeam implements OnTeamInit {
    public async onTeamInit(): Promise<void> {
        console.log('Team init');
    }
}
