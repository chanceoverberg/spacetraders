import { FunctionComponent, useEffect, useState } from "react";
import getOptions from "../getOptions";
import postOptions from "../postOptions";
import { initialContractData } from "../initialValues";
import { ShipData } from "../types";
import getDeliverApiOptions from "../apiOptions/getDeliverApiOptions";

  async function getContractData<ContractData>(): Promise<ContractData> {
    const response = await fetch(`https://api.spacetraders.io/v2/my/contracts`, getOptions);
    const response_1 = await response.json();
    return response_1.data as ContractData;
  }

  async function acceptContract(contractID: string) {
    const response = await fetch(`https://api.spacetraders.io/v2/my/contracts/${contractID}/accept`, postOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
  }

const ContractCard: FunctionComponent = () => {

    const [contractData, setContractData] = useState(initialContractData);
    const [deliverAction, setDeliverAction] = useState(false);
    const [shipsCanFulfill, setShipsCanFulfill] = useState(false);
    const [shipToDeliver, setShipToFulfill] = useState("");
    const [tradeSymbolToDeliver, setTradeSymbolToDeliver] = useState("");
    const [unitsToDeliver, setUnitsToDeliver] = useState("0");

    async function getShipsCanFulfill(contractIndex: number) {
        const response = await fetch('https://api.spacetraders.io/v2/my/ships', getOptions);
        const response_1 = await response.json();
        const fleetData: ShipData[] = response_1.data;
        fleetData.map((ship) => {
            contractData[contractIndex].terms.deliver.map((req) => {
                if (ship.nav.waypointSymbol === req.destinationSymbol) {
                    console.log("a ship is here: " + ship.symbol);
                    setShipToFulfill(ship.symbol);
                    ship.cargo.inventory.map((item) => {
                        if (item.symbol === req.tradeSymbol) {
                            console.log("and it has the required item: " + item.symbol);
                            setTradeSymbolToDeliver(item.symbol);
                            setUnitsToDeliver(item.units.toString());
                            setShipsCanFulfill(true);
                        }
                    });
                }
            })
        });
      }

      async function deliverContractItem(contractID: string, shipSymbol: string, tradeSymbol: string, units: string) {
        const sellPostOptions = getDeliverApiOptions(shipSymbol, tradeSymbol, units);
        const response = await fetch(`https://api.spacetraders.io/v2/my/contracts/${contractID}/deliver`, sellPostOptions);
        const response_1 = await response.json();
        console.log(response_1.data);
        setDeliverAction(!deliverAction);
      }

    async function getContractDataOnLoad() {
        setContractData(await getContractData());
    }

    useEffect(() => {
        getContractDataOnLoad();
    },[]);

    useEffect(() => {
        getContractDataOnLoad();
    }, [deliverAction]);

    return (
        <div className="card">
            <h1>Contracts:</h1>
            {contractData.map((contract, index) => {
                return (
                <div key={index}>
                    <h2>Contract {index+1} ({contract.factionSymbol}):</h2>
                    <p>Accepted: {contract.accepted.toString()} | Expiration: {contract.expiration}</p>
                    <h3>Terms:</h3>
                    <ul>
                        <li>Deadline: {contract.terms.deadline}</li>
                        <li>On Accepted: {contract.terms.payment.onAccepted}</li>
                        <li>On Fulfilled: {contract.terms.payment.onFulfilled}</li>
                    </ul>
                    <h4>Delivery requirements:</h4>
                    <ul>
                        {contract.terms.deliver ? contract.terms.deliver.map((req, reqIndex) => {
                            return (
                                <div key={reqIndex+100}>
                                    <li>Delivery waypoint: {req.destinationSymbol}</li>
                                    <li>Item: {req.tradeSymbol.toLowerCase()} ({contract.type.toLowerCase()})</li>
                                    <li>Units required: {req.unitsRequired}</li>
                                    <li>Units fulfilled: {req.unitsFulfilled}</li>
                                    {shipsCanFulfill && <button className="accept-button" onClick={() => deliverContractItem(contract.id,shipToDeliver,tradeSymbolToDeliver,unitsToDeliver)}>Deliver item</button>}
                                </div>
                            )}) : null}
                    </ul>
                    {!contract.accepted ? <button className="accept-button" onClick={() => acceptContract(contract.id)}>Accept Contract</button> : null}
                    {shipsCanFulfill === false && <button className="accept-button" onClick={() => getShipsCanFulfill(index)}>Get ship data</button>}
                </div>);
            })}
        </div>
    );
}

export default ContractCard;