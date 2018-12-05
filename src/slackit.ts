import * as express from 'express';
import { promisify } from "util";
import { Config } from "./config/config";

export class Slackit {
    private app: express.Application;

    constructor(private config: Config) {
        this.init();
    }

    public async listen(port: number): Promise<void> {
        return promisify<number, void>(this.app.listen)(port);
    }

    private init() {
        this.app = express();
    }
}
