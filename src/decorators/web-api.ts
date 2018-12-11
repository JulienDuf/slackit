import 'reflect-metadata';
import { WebApiConfig } from "../config/web-api-config";
import { WEB_API } from "../constant/decotators";
import { WebApiMetadata } from "../interfaces/web-api-metadata";

export function WebApi(config?: WebApiConfig): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
        const api = Reflect.getMetadata(WEB_API, target) || [] as WebApiMetadata[];

        api.push({
            property: propertyKey,
            config
        });

        Reflect.defineMetadata(WEB_API, api, target);
    };
}
