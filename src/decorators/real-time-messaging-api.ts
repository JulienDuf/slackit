import { RealTimeMessagingApiConfig } from "../config/real-time-messaging-api-config";

export function RealTimeMessagingApi(config?: RealTimeMessagingApiConfig): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
        // TODO: Reflect
    };
}
