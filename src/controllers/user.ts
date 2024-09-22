import { Application, Request, Response } from "express";
import {UserService} from '../services/user.service';

export const loadUserEndpoints = (app: Application): void => {
  app.get("/user", (req: Request, res: Response) => {
    
    return res.status(200).send("CoursesData");
  });

  app.post("/user", (req: Request, res: Response) => {
    console.log("inside controller");
    const user = req.body;
    const userService = new UserService();
    userService.create(user);
    return res.status(200).send({"Status":"Success","Message":"User added successfully!"});
  });
};
