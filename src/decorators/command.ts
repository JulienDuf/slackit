import 'reflect-metadata';
import { COMMAND_NAME } from "../constant/decotators";
import { StringUtils } from "../utils/string";

export function Command(name?: string): ClassDecorator {
    return (target: Function) => {
        name = name ? name : StringUtils.toKebabCase(target.name);
        Reflect.defineMetadata(COMMAND_NAME, name, target);
    };
}
