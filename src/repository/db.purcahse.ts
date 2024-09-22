import {Purchase} from '../model/optics';
import{DbConnectionManager} from './db.connection.manager';

export class PurcahseDbManager {
    dbManager:DbConnectionManager;
    constructor(){
        this.dbManager = new DbConnectionManager();
    }
    create(purchase:Purchase){
        var params = {
            TableName: "purchase",
            Item: {
                "id": purchase.id,
                "date": purchase.date,
                "branchId": purchase.branchId, //Branch::id
                "productId": purchase.productId,//Product::id
                "quantity": purchase.quantity,
                "currency":purchase.currency,
                "unitPrice": purchase.unitPrice,
                "notes": purchase.notes,
                "otherExpense": purchase.otherExpense,
                "discount": purchase.discount,
                "discountPercentage": purchase.discountPercentage,
                "advance": purchase.advance,
                "advanceDate": purchase.advanceDate,
                "status": purchase.status,
            }
        };
        console.log(params);
        this.dbManager.insert(params)
    }
}
