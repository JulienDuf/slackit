import { RTMClientOptions } from "@slack/client";

export interface RealTimeMessagingApiConfig {
    useBotToken?: boolean;
    options?: RTMClientOptions;
}
