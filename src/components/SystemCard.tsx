import { FunctionComponent, useEffect, useState } from "react";
import { SystemData, WaypointData } from "../types/index";
import getOptions from "../getOptions";
import Collapsible from "./Collapsible";
import Dropdown from "./Dropdown";

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

const initialWaypointData: WaypointData[] = [{
    systemSymbol: "",
    symbol: "",
    type: "",
    x: 0,
    y: 0,
    orbitals: [{symbol: ""}],
    traits: [{symbol: "", name: "", description: ""}],
    chart: {submittedBy: "", submittedOn: ""},
    faction: {symbol: ""},
}]

async function getSystemData<SystemData>(system: string, waypoint: string): Promise<SystemData> {
    const response = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}`, getOptions);
    const response_1 = await response.json();
    return response_1.data as SystemData;
  }

  async function getWaypointData<WaypointData>(system: string) {
    const response = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints`, getOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
    return response_1.data as WaypointData;
  }

const SystemCard: FunctionComponent<IProps> = (props: IProps) => {

    const { system, waypoint } = props;
    const [systemData, setSystemData] = useState(initialSystemData);
    const [waypointData, setWaypointData] = useState(initialWaypointData);
    const [selectedWaypoint, setSelectedWaypoint] = useState("Select a waypoint from the menu above");
    const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(0);

    const options = [
        {value: 0, label: ""},
    ];

    async function getSystemDataOnLoad() {
        setSystemData(await getSystemData(system, waypoint));
        setWaypointData(await getWaypointData(system));
    };

    // Passed to Dropdown so it can update the state
    const selectWaypoint = (waypoint: string, index: number): void => {
        setSelectedWaypoint(waypoint);
        setSelectedWaypointIndex(index);
    }

    // Set options for dropdown menu
    const setOptions = () => {
        waypointData.map((waypoint, index) => {
            options[index] = {value: index, label: `${waypoint.symbol} (${waypoint.type})`};
        });
    };

    useEffect(() => {
        getSystemDataOnLoad();
    },[]);

    /* Set the options in useEffect with options in the dependency array since it
     starts as a single empty value but gets populated after the API request */
    useEffect(() => {
        setOptions();
    },[options]);

    return (
            <div className="card">
                <h1>{system ? system : "Error retrieving system"}</h1>
                <p>{waypoint} | {systemData.faction.symbol} | {systemData.type}</p>
                <h3>Waypoints in system {system}</h3>
                <Dropdown placeholder="Select Waypoint" options={options} selectWaypoint={selectWaypoint}/>
                <Collapsible label={`${waypointData[selectedWaypointIndex].symbol} (${waypointData[selectedWaypointIndex].type})`}>
                    <ul>
                        {waypointData[selectedWaypointIndex].traits.map((trait, index) => {
                            return <li key={index}>{trait && trait.name}: {trait.description}</li>;
                        })}
                    </ul>
                </Collapsible>
                <h3>Details about waypoint {waypoint}</h3>
                <Collapsible label="Orbitals">
                    <ul>
                        {systemData.orbitals.map((entry, index) => {
                            return <li key={index}>{entry.symbol}</li>;
                        })}
                    </ul>
                </Collapsible>
                <Collapsible label="Traits">
                    <ul>
                        {systemData.traits.map((entry, index) => {
                            return <li key={index}>{entry.name}: {entry.description}</li>;
                        })}
                    </ul>
                </Collapsible>
            </div>
    );
}

export default SystemCard;