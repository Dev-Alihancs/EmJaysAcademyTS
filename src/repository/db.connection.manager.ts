import fs from "fs";
export class DbConnectionManager{

  docClient:any;
  
  constructor(){
    
    //AWS.config.loadFromPath("AWSConfig.json");
    //this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  insert(params:any){
    this.docClient.put(params, function(err:any, data:any) {
      if (err) {
          console.error("Unable to add data", data, ". Error JSON:", JSON.stringify(err, null, 2));
          return false;
      } else {
          console.log("PutItem succeeded:", data);
          return true;
      }
    });
  }
  delete(params:any){
      this.docClient.deleteItem(params, function(err:any, data:any) {
        if (err) {
          console.log("Error", err);
          return false;
        } else {
          console.log("Success", data);
          return true;
        }
      });
  }

  update(params:any){
    this.docClient.updateItem(params, function(err:any, data:any) {
      if (err) {
          console.log('Error :' + err);
      } else {
          //subscribe(bodydata.id);
          console.log('EndpointArn Saved successful');
          console.log('Data :' + JSON.stringify(data.flag));
          return data;
      }
    });
    
  }


  getItem(params:any){
    this.docClient.get(params, function(err:any, data:any) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          return data;
      }
    });
   
  }

  getAllItems(params:any){
    this.docClient.scan(params, function(err:any, data:any) {
      if (err) {
        console.error("Unable to find movItemsies", err);
      } else {
        console.log(`Found ${data.Count} items`);
        console.log(data.Items);
        return data.items;
      }
    });
  }
  
  
  query(params:any){
    this.docClient.query(params, function(err:any, data:any) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
          console.log("Query succeeded.");
          data.Items.forEach(function(item:any) {
              console.log(" -", item.type + ": " + item.name + ' ' + item.info['abv'] + '%');
          });
      }
    });
    
  }
 
}