import { Application, Request, Response } from "express";

import {Purchase} from '../model/optics';
import {PurcahseService} from '../services/purchase.service';

export const loadPurchaseEndpoints = (app: Application): void => {
  app.post("/purchase", (req: Request, res: Response) => {
    console.log("inside controller");
    const purchase = req.body;
    const purchaseService = new PurcahseService();
    purchaseService.create(purchase);
    return res.status(200).send({"Status":"Success","Message":"Purchase created successfully!"});
  });
};
