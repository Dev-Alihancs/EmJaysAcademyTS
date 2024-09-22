export enum LogLevel {
    error,
    warn,
    info,
    debug,
    trace
}

export interface Log {
    error(message: string, obj?: any): void;
    warn(message: string, obj?: any): void;
    info(message: string, obj?: any): void;
    debug(message: string, obj?: any): void;
    trace(message: string, obj?: any): void;
}

export interface LogOptions {
    level: LogLevel;
    prettyIndent?: number;
}

export interface LogLine {
    level: LogLevel;
    line: string;
}

export class Logger implements Log {
    private options: LogOptions = {
        level: LogLevel.info,
        prettyIndent: 0
    };
    readonly logLines: LogLine[] = [];

    constructor(options?: LogOptions) {
        if (options) {
            this.options = { ...this.options, ...options };
        }
    }

    /**
     * Log at the specified level
     * @param level LogLevel
     * @param msg log message
     * @param obj if obj is an Error, its stack is logged, otherwise it's logged as JSON
     */
    async log(level: LogLevel, msg: string, obj: any): Promise<void> {
        if (level <= this.options.level) {
            let message = '' + msg;
            if ((message as any).message && (message as any).stack) {
                return await this.log(level, (message as any).message, message);
            }
            message = `${new Date().toISOString()} [${LogLevel[level]}] ${message}`;
            if (level === LogLevel.error || level === LogLevel.warn) {
                if (obj) {
                    if (obj.stack) {
                        console.error(message);
                        console.error(obj.stack);
                    } else {
                        console.error(
                            message + ': ' + JSON.stringify(obj, null, this.options.prettyIndent)
                        );
                    }
                } else {
                    console.error(message);
                }
            } else {
                if (obj) {
                    if (obj.stack) {
                        console.log(message);
                        console.log(obj);
                    } else {
                        console.log(
                            message + ': ' + JSON.stringify(obj, null, this.options.prettyIndent)
                        );
                    }
                } else {
                    console.log(message);
                }
            }
        }
    }

    async error(message: string, obj?: any) {
        if (!obj && (message as any).message && (message as any).stack) {
            const err = message as any;
            await this.log(LogLevel.error, err.message, err);
        } else {
            await this.log(LogLevel.error, message, obj);
        }
    }

    async warn(message: string, obj?: any) {
        if (!obj && (message as any).message && (message as any).stack) {
            const err = message as any;
            await this.log(LogLevel.warn, err.message, err);
        } else {
            await this.log(LogLevel.warn, message, obj);
        }
    }

    async info(message: string, obj?: any) {
        await this.log(LogLevel.info, message, obj);
    }

    async debug(message: string, obj?: any) {
        await this.log(LogLevel.debug, message, obj);
    }

    async trace(message: string, obj?: any) {
        await this.log(LogLevel.trace, message, obj);
    }

    get level(): LogLevel {
        return this.options.level;
    }

    get levelString(): string {
        return LogLevel[this.level];
    }
}

//const level = config.log?.level? LogLevel[config.log.level as keyof typeof LogLevel] : LogLevel.info;
//export const logger = new Logger({level, prettyIndent: config.log?.prettyIndent});
const level = LogLevel.info;
export const logger = new Logger({level});
