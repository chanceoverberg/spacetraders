import { FunctionComponent, useEffect, useState } from "react";
import { SystemData } from "../types/index";
import getOptions from "../getOptions";

interface IProps {
    system: string,
    waypoint: string,
}

const initialSystemData: SystemData = {
    systemSymbol: "",
    symbol: "",
    type: "",
    x: 0,
    y: 0,
    orbitals: [ {symbol: ""} ],
    traits: [ {symbol: "", name: "", description: ""} ],
    chart: { submittedBy: "", submittedOn: "" },
    faction: { symbol: "" } 
}

async function getSystemData<SystemData>(system: string, waypoint: string): Promise<SystemData> {
    const response = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}`, getOptions);
    const response_1 = await response.json();
    return response_1.data as SystemData;
  }

const SystemCard: FunctionComponent<IProps> = (props: IProps) => {

    const { system, waypoint } = props;
    const [systemData, setSystemData] = useState(initialSystemData);

    async function getSystemDataOnLoad() {
        setSystemData(await getSystemData(system, waypoint));
        console.log(systemData);
    }

    useEffect(() => {
        getSystemDataOnLoad();
    },[]);    

    return (
    
            <div className="card">
                <h1>{waypoint ? waypoint : "Error retrieving system"}</h1>
                <p>{systemData.faction.symbol} | {systemData.type}</p>
                <h2>System Information:</h2>
                <h3>Orbitals:</h3>
                <ul>
                    {systemData.orbitals.map((entry, index) => {
                        return <li key={index}>{entry.symbol}</li>;
                    })}
                </ul>
                <h3>Traits:</h3>
                <ul>
                    {systemData.traits.map((entry, index) => {
                        return <li key={index}><b>{entry.name}:</b> {entry.description}</li>;
                    })}
                </ul>
            </div>
    );
}

export default SystemCard;