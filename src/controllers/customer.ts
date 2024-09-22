import { Application, Request, Response } from "express";

import {Customer} from '../model/optics';
import {CustomerService} from '../services/customer.service';
import { utility } from "../utility/utility";

export const loadCustomerEndpoints = (app: Application): void => {
  app.post("/customer", (req: Request, res: Response) => {
    const transactionId = utility.getTransactionId(req);
    utility.interceptRequest(req);
    //const loadData = new LoadData();
    //loadData.test();
    const Customer= req.body;
    const customerService = new CustomerService();
    customerService.create(Customer);
    const result = "Status:Success";
    res.status(200).send(result);
    utility.interceptResponse(res, result);
    return res;
  });

  app.post("/customers/:id", (req: Request, res: Response) => {
    //const loadData = new LoadData();
    //loadData.test();
    const Customer= req.body;
    let id:number = Number(req.params.id);
    const customerService = new CustomerService();
    customerService.update(Customer, id);
    return res.status(200).send("Status:Success");
  });

  app.get("/customers", (req: Request, res: Response) => {
    const customerService = new CustomerService();
    const customer = customerService.findAll();
    console.log("Result>>"+customer);
    return res.status(200).json({"Status":"Success","data":customer});
  });

  app.get("/customers/:id", (req: Request, res: Response) => {
    let id:number = Number(req.params.id);
    const customerService = new CustomerService();
    const customer = customerService.findById(id);
    console.log("Result>>"+customer);
    return res.status(200).json({"Status":"Success","data":customer});
  });

  app.delete("/customers/:id", (req: Request, res: Response) => {
    let id:number = Number(req.params.id);
    const customerService = new CustomerService();
    const customer = customerService.delete(id);
    console.log("Result>>"+customer);
    return res.status(200).json({"Status":"Success","data":customer});
  });


};
