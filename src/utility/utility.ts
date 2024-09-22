import { logger } from "./log";
import { Request, Response } from "express";

export class Utility {
    
    async interceptRequest(req: Request) {
        const transactionId = this.getTransactionId(req);
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        logger.info(`TransactionId=${transactionId} | Request: ${req.method} ${fullUrl}` + (req.body ? " | Body=" + JSON.stringify(req.body) : ""));
    }

    async interceptResponse(res: Response, body: any) {
        const transactionId = this.getTransactionId(res.req);
        let message: string = "";
        if (transactionId) {
            message += "TransactionId=" + transactionId + " | ";
        }
        if (res) {
            message += "Response: "
            if (res.statusCode) {
                message += "Status=" + res.statusCode + (res.statusMessage ? (" " + res.statusMessage) :"" ) + " | ";
            }
            if (body) {
                message += "Body=" + JSON.stringify(body);
            }
        }
        logger.info(message);
    }

    getTransactionId(req: Request): string {
        req.headers['transactionid'] = req?.headers['transactionid'] as string || Date.now().toString() + Math.floor(Math.random()*89999+10000);
        return req.headers['transactionid'];
    }
}
export const utility = new Utility();