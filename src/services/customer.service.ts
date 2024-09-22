import {Customer} from '../model/optics';
import {CustomerDbManager} from '../repository/db.customer'
//const CustomerDbManager = require('../repository/db.customer');
export class CustomerService {
    create(customer:Customer) {
        const customerDbManager = new CustomerDbManager();
        console.log(customer);
        customerDbManager.create(customer);
    }

    update(customer:Customer, id:number){
        const customerDbManager = new CustomerDbManager();
        console.log(customer);
        customerDbManager.update(customer, id);
        console.log("Updated successfully!!");
    }

    delete(id:number){
        const customerDbManager = new CustomerDbManager();
        customerDbManager.delete(id);
    }

    findById(id:number){
        const customerDbManager = new CustomerDbManager();
        return customerDbManager.findById(id);
    }
    findAll(){
        const customerDbManager = new CustomerDbManager();
        return customerDbManager.findAll();
    }

  }
  