import { logger } from "./log";
import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

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

    generateToken(payload: any) {
        const secretKey = 'yourSecretKey'; // Replace with your own secret key
        const options = {
          expiresIn: '1h', // Token expiration time
        };
      
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

    validateToken(token: string) {
        const secretKey = 'yourSecretKey'; // Replace with your own secret key
        return jwt.verify(token, secretKey)
    }
}

export const utility = new Utility();