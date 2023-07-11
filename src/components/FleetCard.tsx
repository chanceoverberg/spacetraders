import { FunctionComponent, useEffect, useState } from "react";
import getOptions from "../getOptions";
import { ShipData } from "../types/index";
import Collapsible from "./Collapsible";

async function getFleetData<FleetData>(): Promise<FleetData> {
    const response = await fetch('https://api.spacetraders.io/v2/my/ships', getOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
    return response_1.data as FleetData;
  }

const initialFleetData: ShipData[] = [
        {
            cargo: {
                capacity: 0,
                inventory: [{
                    description: "",
                    name: "",
                    symbol: "",
                    units: 0
                }],
                units: 0
            },
            fuel: {
                current: 0,
                capacity: 0,
                consumed: {
                    amount: 0,
                    timestamp: ""
                }
            },
            nav: {
                systemSymbol: "",
                waypointSymbol: "",
                route: {
                    destination: {
                        symbol: "",
                        type: "",
                        systemSymbol: "",
                        x: 0,
                        y: 0
                    },
                    departure: {
                        symbol: "",
                        type: "",
                        systemSymbol: "",
                        x: 0,
                        y: 0
                    },
                    departureTime: "",
                    arrival: ""
                },
                status: "",
                flightMode: ""
            }
        }
    ];


const FleetCard: FunctionComponent = () => {
    const [fleetData, setFleetData] = useState(initialFleetData);

    async function getFleetDataOnLoad() {
        setFleetData(await getFleetData());
    }

    useEffect(() => {
        getFleetDataOnLoad();
    },[]);

    return (
        <div className="card">
            <h1>Fleet:</h1>
            { fleetData ? 
                fleetData.map((ship, index) => {
                    return (
                        <Collapsible label={`Ship ${index+1}`} buttonStyle="ship-toggle-button" containerStyle="ship-toggle-button-container" key={index}>
                                <h2>Cargo ({ship.cargo.units}/{ship.cargo.capacity}):</h2>
                                <p>Fuel: {ship.fuel.current}/{ship.fuel.current}</p>
                                <h4>Nav details:</h4>
                                <ul>
                                    <li>Flight mode: {ship.nav.flightMode}</li>
                                    <li>Status: {ship.nav.status} in system {ship.nav.systemSymbol} at waypoint {ship.nav.waypointSymbol}</li>
                                    <li>Departed from {ship.nav.route.departure.symbol} to {ship.nav.route.destination.symbol}</li>
                                </ul>
                        </Collapsible>
                )}) : <p>no data</p>
            }
        </div>
    )
}

export default FleetCard;