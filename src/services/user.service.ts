import {User} from '../model/optics';
import {UserDbManager} from '../repository/db.user'
//const CustomerDbManager = require('../repository/db.customer');
export class UserService {
    create(user:User) {
        const userDbManager = new UserDbManager();
        console.log(user);
        userDbManager.create(user);
    }
  }
  