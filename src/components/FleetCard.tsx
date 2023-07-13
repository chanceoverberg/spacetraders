import { FunctionComponent, useEffect, useState } from "react";
import getOptions from "../getOptions";
import Collapsible from "./Collapsible";
import { initialFleetData, initialWaypointData } from "../initialValues";
import Dropdown from "./Dropdown";
import { Nav, RefuelData } from "../types";
import postOptions from "../postOptions";
import CountdownTimer from "./CountdownTimer";
import getSellApiOptions from "../apiOptions/getSellApiOptions";
import getNavigateApiOptions from "../apiOptions/getNavigateApiOptions";

interface IProps {
    system: string,
}

async function getFleetData<FleetData>(): Promise<FleetData> {
    const response = await fetch('https://api.spacetraders.io/v2/my/ships', getOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
    return response_1.data as FleetData;
  }

  async function getWaypointData<WaypointData>(system: string) {
    const response = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints`, getOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
    return response_1.data as WaypointData;
  }


const FleetCard: FunctionComponent<IProps> = (props: IProps) => {
    const { system } = props;
    const [fleetData, setFleetData] = useState(initialFleetData);
    const [waypointData, setWaypointData] = useState(initialWaypointData);
    const [selectedWaypoint, setSelectedWaypoint] = useState("");
    const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(0);
    const [shipAction, setShipAction] = useState(false);

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

      async function extract(ship: string): Promise<any> {
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/extract`, postOptions);
        const response_1 = await response.json();
        console.log(response_1.data);
        setShipAction(!shipAction);
        return response_1.data;
      }

      async function sell(ship: string, symbol: string, units: string): Promise<any> {
        const sellPostOptions = getSellApiOptions(symbol, units);
        const response = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/sell`, sellPostOptions);
        const response_1 = await response.json();
        console.log(response_1.data);
        setShipAction(!shipAction);
        return response_1.data;
      }

    async function getFleetDataOnLoad() {
        setFleetData(await getFleetData());
    }

    // Passed to Dropdown so it can update the state
    const selectWaypoint = (waypoint: string, index: number): void => {
        setSelectedWaypoint(waypoint);
        setSelectedWaypointIndex(index);
    }

    // Passed to CountdownTimer so it can update shipAction state
    const updateShipAction = () => {
        setShipAction(!shipAction);
    }

    async function getSystemDataOnLoad() {
        setWaypointData(await getWaypointData(system));
    };

    const options = [
        {value: 0, label: ""},
    ];

    // Set options for dropdown menu
    const setOptions = () => {
        waypointData.map((waypoint, index) => {
            options[index] = {value: index, label: `${waypoint.symbol} (${waypoint.type})`};
        });
    };

    useEffect(() => {
        getFleetDataOnLoad();
        getSystemDataOnLoad();
    },[]);

    useEffect(() => {
        setOptions();
    },[options]);

    useEffect(() => {
        getFleetDataOnLoad();
    }, [shipAction]);

    const calcArrivalMS = (arrival: string) => {
        const arrive = new Date(arrival).getTime();
        return arrive;
    }

    return (
        <div className="card">
            <h1>Fleet:</h1>
            { fleetData ? 
                fleetData.map((ship, index) => {
                    return (
                        <Collapsible label={`Ship ${index+1}`} key={index}>
                                <h2>Cargo ({ship.cargo.units}/{ship.cargo.capacity}):</h2>
                                <ul>
                                    {ship.cargo.inventory.map((item) => {
                                        return <li key={item.name}>{item.name}: {item.units}{ship.nav.status === "DOCKED" && <button className="accept-button" onClick={() => {sell(ship.symbol, item.symbol, item.units.toString())}}>Sell</button>}</li>
                                    })}
                                </ul>
                                <h4>Nav details:</h4>
                                <p className="p-no-margin">Fuel: {ship.fuel.current}/{ship.fuel.capacity}</p>
                                <ul>
                                    <li>Flight mode: {ship.nav.flightMode}</li>
                                    <li>Status: {ship.nav.status} in system {ship.nav.systemSymbol} at waypoint {ship.nav.waypointSymbol}</li>
                                    <li>Departed from {ship.nav.route.departure.symbol} to {ship.nav.route.destination.symbol}</li>
                                </ul>
                                <div className="ship-button-group">
                                    {ship.nav.status === "DOCKED" ? 
                                    <button className="accept-button" onClick={() => orbitShip(ship.symbol)}>Orbit</button> 
                                    : 
                                    <button className="accept-button" onClick={() => dockShip(ship.symbol)}>Dock</button>}
                                    <button className="accept-button" onClick={() => refuelShip(ship.symbol)}>Refuel</button>
                                    {ship.nav.route.destination.type === "ASTEROID_FIELD" && ship.nav.status === "IN_ORBIT" && <button className="accept-button" onClick={() => extract(ship.symbol)}>Extract</button>}
                                </div>
                                <p>Select waypoint to navigate to:</p>
                                <Dropdown placeholder="Waypoint" options={options} selectWaypoint={selectWaypoint}/>
                                {selectedWaypoint === "" ? null : 
                                    <button className="accept-button" onClick={() => navigateShip(ship.symbol, waypointData[selectedWaypointIndex].symbol)}>Navigate</button>
                                }
                                {ship.nav.status === "IN_TRANSIT" ? <CountdownTimer targetDate={calcArrivalMS(ship.nav.route.arrival)} updateShipAction={updateShipAction} /> : null}
                        </Collapsible>
                )}) : <p>no data</p>
            }
        </div>
    )
}

export default FleetCard;