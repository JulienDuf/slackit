import { RealTimeMessagingApiConfig } from "../config/real-time-messaging-api-config";
import { REAL_TIME_MESSAGING_API } from "../constant/decotators";

export function RealTimeMessagingApi(config?: RealTimeMessagingApiConfig): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
        const api = Reflect.getMetadata(REAL_TIME_MESSAGING_API, target) || [] as RealTimeMessagingApiConfig[];

        api.push({
            property: propertyKey,
            config
        });

        Reflect.defineMetadata(REAL_TIME_MESSAGING_API, api, target);
    };
}
