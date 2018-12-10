import { WebClientOptions } from "@slack/client";

export interface WebApiConfig {
    useBotToken?: boolean;
    options?: WebClientOptions;
}
