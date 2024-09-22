import express from "express";
import path from "path";

import { loadUserEndpoints } from "./controllers/user";
import { loadCustomerEndpoints } from "./controllers/customer";
import { loadPurchaseEndpoints } from "./controllers/purchase";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadUserEndpoints(app);
loadCustomerEndpoints(app);
loadPurchaseEndpoints(app);

export default app;
