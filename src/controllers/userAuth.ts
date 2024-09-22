import { Application, Request, Response } from "express";
import { utility } from "../utility/utility";
import { logger } from "../utility/log";

export const loadUserAuthEndpoints = (app: Application): void => {
  
  app.get("/getToken", (req: Request, res: Response) => {
    logger.info("======================>");
    const user = {
      id: 121,
      username: 'babumon@gmail.com',
      role: 'admin',
    };
    const token = utility.generateToken(user);
    return res.status(200).send(token);
  });

  app.get('/validateToken', (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization; 
      const token = authHeader?.split(' ')[1]; // Bearer <token>

        if (token && utility.validateToken(token)) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send('Unathorized');
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
  });


};
