import {User} from '../model/optics';
import{DbConnectionManager} from './db.connection.manager';

export class UserDbManager {
    dbManager:DbConnectionManager;
    constructor(){
        this.dbManager = new DbConnectionManager();
    }
    create(user:User){
        console.log(typeof user);
        var params = {
            TableName: "user",
            Item: {
                "id": user.id,
                "name": user.name,
                "userName": user.userName,
                "password": user.password,
                "dob": user.dob,
                "phone": user.phone,
                "email": user.email,
                "nationalId": user.nationalId,
                "role": user.role,
                "branches": user.branches,
                "status": user.status,
            }
        };
        this.dbManager.insert(params)
    }
}

