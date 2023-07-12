import { FunctionComponent, useEffect, useState } from "react";
import getOptions from "../getOptions";
import Collapsible from "./Collapsible";
import { initialFleetData, initialSystemData, initialWaypointData } from "../initialValues";
import Dropdown from "./Dropdown";
import { Nav } from "../types";
import postOptions from "../postOptions";

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

    async function getFleetDataOnLoad() {
        setFleetData(await getFleetData());
    }

    // Passed to Dropdown so it can update the state
    const selectWaypoint = (waypoint: string, index: number): void => {
        setSelectedWaypoint(waypoint);
        setSelectedWaypointIndex(index);
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

    return (
        <div className="card">
            <h1>Fleet:</h1>
            { fleetData ? 
                fleetData.map((ship, index) => {
                    return (
                        <Collapsible label={`Ship ${index+1}`} key={index}>
                                <h2>Cargo ({ship.cargo.units}/{ship.cargo.capacity}):</h2>
                                <p>Fuel: {ship.fuel.current}/{ship.fuel.current}</p>
                                <h4>Nav details:</h4>
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
                                    <button className="accept-button">Refuel</button>
                                </div>
                                <p>Select waypoint to navigate to:</p>
                                <Dropdown placeholder="Waypoint" options={options} selectWaypoint={selectWaypoint}/>
                                {selectedWaypoint === "" ? null : 
                                    <button className="accept-button">Navigate to {waypointData[selectedWaypointIndex].symbol}</button>
                                }
                        </Collapsible>
                )}) : <p>no data</p>
            }
        </div>
    )
}

export default FleetCard;