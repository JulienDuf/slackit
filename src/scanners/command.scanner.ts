import { COMMAND_NAME } from "../constant/decotators";

export class CommandScanner {
    public getName(target: Function): string {
        return Reflect.getMetadata(COMMAND_NAME, target);
    }
}
