import { REAL_TIME_MESSAGING_API, WEB_API } from "../constant/decotators";
import { RealTimeMessagingApiMetadata } from "../interfaces/real-time-messaging-api-metadata";
import { WebApiMetadata } from "../interfaces/web-api-metadata";

export class TeamScanner {
    constructor(private target: Function) {
    }

    public getWebApi(): WebApiMetadata[] {
        return Reflect.getMetadata(WEB_API, this.target.prototype) || [];
    }

    public getRealTimeMessagingApi(): RealTimeMessagingApiMetadata[] {
        return Reflect.getMetadata(REAL_TIME_MESSAGING_API, this.target.prototype) || [];
    }
}
