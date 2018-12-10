import { WebApiConfig } from "../config/web-api-config";

export function WebApi(config?: WebApiConfig): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
        // TODO: Reflect
    };
}
