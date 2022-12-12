import DecimalApi from "./index";
import Wallet from "../wallet";
export default function updateAddressBlockingData(api: DecimalApi, wallet: Wallet | null): (address: string, isBlocked: boolean, type: string, reason?: object) => Promise<any> | null;
