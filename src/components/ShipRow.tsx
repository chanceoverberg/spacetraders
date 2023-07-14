import { FunctionComponent, useEffect, useState } from "react";
import { ExtractData, Nav, RefuelData, ShipData, WaypointData } from "../types";
import Collapsible from "./Collapsible";
import CountdownTimer from "./CountdownTimer";
import Dropdown from "./Dropdown";
import postOptions from "../postOptions";
import getNavigateApiOptions from "../apiOptions/getNavigateApiOptions";
import getSellApiOptions from "../apiOptions/getSellApiOptions";
import getOptions from "../getOptions";
import { initialExtractData } from "../initialValues";

interface IProps {
    ship: ShipData,
    shipIndex: number,
    waypointData: WaypointData[],
}

const ShipRow: FunctionComponent<IProps> = (props: IProps) => {
    const { ship, shipIndex, waypointData } = props;
    let dropdownOptions = [ {value: 0, label: ""} ];

    const [shipData, setShipData] = useState(ship);
    const [selectedWaypoint, setSelectedWaypoint] = useState("");
    const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(0);
    const [shipAction, setShipAction] = useState(false);
    const [extractData, setExtractData] = useState(initialExtractData);

    async function getFleetData(index: number): Promise<any> {
        const response = await fetch('https://api.spacetraders.io/v2/my/ships', getOptions);
        const response_1 = await response.json();
        return response_1.data[index];
      }

    async function orbitShip<Nav>(ship: string): Promise<Nav> {
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/orbit`, postOptions);
        const response_1 = await response.json();
        console.log(response_1.data.nav);
        setShipAction(!shipAction);
        return response_1.data.nav as Nav;
      }
    
      async function dockShip(ship: string): Promise<Nav> {
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/dock`, postOptions);
        const response_1 = await response.json();
        console.log(response_1.data.nav);
        setShipAction(!shipAction);
        return response_1.data as Nav;
      }

      async function refuelShip(ship: string): Promise<RefuelData> {
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/refuel`, postOptions);
        const response_1 = await response.json();
        setShipAction(!shipAction);
        return response_1.data as RefuelData;
      }

      async function navigateShip(ship: string, waypoint: string): Promise<any> {
        const navigatePostOptions = getNavigateApiOptions(waypoint);
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/navigate`, navigatePostOptions);
        const response_1 = await response.json();
        console.log(response_1.data);
        setShipAction(!shipAction);
        return response_1.data;
      }

      async function extract(ship: string): Promise<ExtractData> {
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/extract`, postOptions);
        const response_1 = await response.json();
        if (response_1.data?.cooldown != undefined) {
            setExtractData(response_1.data);
            console.log(response_1.data.cooldown.remainingSeconds)
        }
        else if (response_1.error?.data?.cooldown != undefined) {
            setExtractData(response_1.error.data);
        }
        console.log(response_1.data);
        setShipAction(!shipAction);
        return response_1.data as ExtractData;
      }

      async function sell(ship: string, symbol: string, units: string): Promise<any> {
        const sellPostOptions = getSellApiOptions(symbol, units);
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/sell`, sellPostOptions);
        const response_1 = await response.json();
        console.log(response_1.data);
        setShipAction(!shipAction);
        return response_1.data;
      }

    // Passed to Dropdown so it can update the state
    const selectWaypoint = (waypoint: string, index: number): void => {
        setSelectedWaypoint(waypoint);
        setSelectedWaypointIndex(index);
    }

    // Passed to CountdownTimer so it can update shipAction state
    const updateShipAction = () => {
        setShipAction(!shipAction);
        console.log("ship action updated");
    }

    async function getFleetDataOnLoad() {
        setShipData(await getFleetData(shipIndex));
    }

    const calcArrivalMS = (arrival: string) => {
        const arrive = new Date(arrival).getTime();
        return arrive;
    }

    // Set options for dropdown menu
    const setOptions = () => {
        waypointData.map((waypoint, index) => {
            dropdownOptions[index] = {value: index, label: `${waypoint.symbol} (${waypoint.type})`};
        });
    };

    useEffect(() => {
        setOptions();
    },[dropdownOptions]);

    useEffect(() => {
        getFleetDataOnLoad();
    }, [shipAction]);

    if (shipData) {
        return (
            <Collapsible label={shipData.symbol}>
                <div className="content-half">
                    <p className="p-no-margin">Inventory ({shipData.cargo.units}/{shipData.cargo.capacity}):</p>
                    <ul>
                        {shipData.cargo.inventory.map((item) => {
                            return (
                                <li key={item.name}>{item.name}: {item.units} {
                                shipData.nav.status === "DOCKED" && 
                                <button className="accept-button" 
                                onClick={() => {sell(shipData.symbol, item.symbol, item.units.toString())}}>
                                Sell</button>
                                }
                                </li>
                            );
                        })}
                    </ul>
                    <div className="ship-button-group">
                        {shipData.nav.status === "DOCKED" ? 
                        <button className="accept-button" onClick={() => orbitShip(shipData.symbol)}>Orbit</button> 
                        : 
                        <button className="accept-button" onClick={() => dockShip(shipData.symbol)}>Dock</button>}
                        <button className="accept-button" onClick={() => refuelShip(shipData.symbol)}>Refuel</button>
                        {
                        shipData.nav.route.destination.type === "ASTEROID_FIELD" && 
                        shipData.nav.status === "IN_ORBIT" && 
                        <button className="accept-button" onClick={() => extract(shipData.symbol)}>Extract</button>
                        }
                    </div>
                    {
                    extractData.cooldown.remainingSeconds > 0 ? 
                    <CountdownTimer targetDate={calcArrivalMS(extractData.cooldown.expiration)} 
                    updateShipAction={updateShipAction} /> 
                    : null
                    }
                </div>
                <div className="content-half">
                    <p className="p-no-margin">Fuel: {shipData.fuel.current}/{shipData.fuel.capacity}</p>
                    <p className="p-no-margin">{shipData.nav.status} in system {shipData.nav.systemSymbol} at waypoint {shipData.nav.waypointSymbol}</p>
                    <p className="p-no-margin">Departed from {shipData.nav.route.departure.symbol} to {shipData.nav.route.destination.symbol}</p>
                    <p>Select waypoint to navigate to:</p>
                    <Dropdown placeholder="Waypoint" options={dropdownOptions} selectWaypoint={selectWaypoint}/>
                    {selectedWaypoint === "" ? null : 
                    <button className="accept-button" 
                    onClick={() => navigateShip(shipData.symbol, waypointData[selectedWaypointIndex].symbol)}>
                        Navigate
                    </button>
                    }
                    {
                    shipData.nav.status === "IN_TRANSIT" ? 
                    <CountdownTimer targetDate={calcArrivalMS(shipData.nav.route.arrival)} 
                    updateShipAction={updateShipAction} /> 
                    : null
                    }
                </div>
            </Collapsible>
        );
    }
    else {
        return null;
    }
}

export default ShipRow;