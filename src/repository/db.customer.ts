import {Customer} from '../model/optics';
import{DbConnectionManager} from './db.connection.manager';

export class CustomerDbManager {
    dbManager:DbConnectionManager;
    constructor(){
        this.dbManager = new DbConnectionManager();
    }
    create(customer:Customer){
        console.log(typeof customer);
        var params = {
            TableName: "customer",
            Item: {
                "id": customer.id,
                "name": customer.name,
                "dob": customer.dob,
                "phone": customer.phone,
                "email": customer.email,
                "nationalId": customer.nationalId,
                "notes": customer.notes
            }
        };
        console.log(params);
        this.dbManager.insert(params);
    }


    update(customer:Customer, id:number){
        console.log(typeof customer);
        var params = {
            TableName: "customer",
            Item: {
                "id": id,
                "name": customer.name,
                "dob": customer.dob,
                "phone": customer.phone,
                "email": customer.email,
                "nationalId": customer.nationalId,
                "notes": customer.notes
            }
        };
        console.log(params);
        this.dbManager.update(params);
    }

    delete(id:number){
        console.log("id>>>"+id);
        var params = {
            TableName: "customer",
            Item: {
                "id": id,
                "isDeleted": true
              
            }
        };
        console.log(params);
        this.dbManager.update(params);
    }

    findAll(){
        var params = {
            TableName: "customer"
        }; 
        return this.dbManager.getAllItems(params);
    }

    findById(id:number){
        var params = {
            TableName: "customer",
            Key: {
                ["id"]: id
            }
        };
        return this.dbManager.getItem(params);
        
    }


}


