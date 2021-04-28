import { CrudAPI } from "~/core/crud";
import { defaultGateway } from "./gateways";
 
export const tradePositionAPI= new CrudAPI(defaultGateway,'/api/trade-positions');