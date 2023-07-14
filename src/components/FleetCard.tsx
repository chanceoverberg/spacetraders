import { FunctionComponent, useEffect, useState } from "react";
import getOptions from "../getOptions";
import { initialFleetData, initialWaypointData } from "../initialValues";
import ShipRow from "./ShipRow";

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

    async function getFleetDataOnLoad() {
        setFleetData(await getFleetData());
    }

    async function getSystemDataOnLoad() {
        setWaypointData(await getWaypointData(system));
    };

    useEffect(() => {
        getFleetDataOnLoad();
        getSystemDataOnLoad();
    },[]);

    return (
        <div className="card">
            <h1>Fleet:</h1>
            {fleetData && fleetData.map((ship, index) => {
                return (
                    <ShipRow ship={ship} shipIndex={index} waypointData={waypointData}/>
                );
            })}
        </div>
    )
}

export default FleetCard;