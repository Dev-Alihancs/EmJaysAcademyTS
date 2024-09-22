import {Purchase} from '../model/optics';
import {PurcahseDbManager} from '../repository/db.purcahse'
export class PurcahseService {
    create(purchase:Purchase) {
        const purcahseDbManager = new PurcahseDbManager();
        console.log(purchase);
        purcahseDbManager.create(purchase);
        console.log("hi");
    }
  }
  