import bodyParser from "body-parser";
import registerCustomer from "../routes/registerCustomer.js";
import loginCustomer from "../routes/loginCustomer.js";
import registerMarket from "../routes/registerMarket.js";
import loginMarket from "../routes/loginMarket.js";
import deleteCustomer from "../routes/deleteCustomer.js";

export default function cofigureRoutes(app){
    app.use(bodyParser.json());
    app.use("/api/register-customer", registerCustomer);
    app.use("/api/login-customer", loginCustomer);
    app.use("/api/register-market", registerMarket);
    app.use("/api/login-market", loginMarket);
    app.use("/api/delete-customer", deleteCustomer);
}
