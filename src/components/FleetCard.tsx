import { FunctionComponent, useEffect, useState } from "react";
import getOptions from "../getOptions";
import { ShipData } from "../types/index";

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
                    <div key={index}>
                        <h2>Ship {index+1}:</h2>
                        <h3>Cargo (capacity: {ship.cargo.capacity}):</h3>
                        <ul>
                            <li>Units: {ship.cargo.units}</li>
                        </ul>
                        <h3>Fuel:</h3>
                        <ul>
                            <li>Capacity: {ship.fuel.current}</li>
                            <li>Current: {ship.fuel.current}</li>
                        </ul>
                        <h3>Nav:</h3>
                        <ul>
                            <li>Flight mode: {ship.nav.flightMode}</li>
                            <li>Status: {ship.nav.status} in system {ship.nav.systemSymbol} at waypoint {ship.nav.waypointSymbol}</li>
                            <li>Departed from {ship.nav.route.departure.symbol} to {ship.nav.route.destination.symbol}</li>
                        </ul>
                    </div>
                )}) : <p>no data</p>
            }
            <button onClick={() => console.log(fleetData[0])}>log fleet state data</button>
        </div>
    )
}

export default FleetCard;