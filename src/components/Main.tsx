import { useState, useEffect, FunctionComponent, useMemo } from 'react';
import '../App.css';
import { AgentData, SystemData } from '../types';
import Agent from './Agent';
import SystemCard from './SystemCard';
import token from '../token';

const initialFleetData = {
  cargo: {capacity: 0, inventory: [], units: 0}, shipData: null, symbol: ""
}

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
};

const postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
};

async function getAgentData<AgentData>(): Promise<AgentData> {
  const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);
  const response_1 = await response.json();
  return response_1.data as AgentData;
}

async function getShipData(): Promise<any> {
  const response = await fetch('https://api.spacetraders.io/v2/my/ships', options);
  const response_1 = await response.json();
  console.log(response_1.data);
  return response_1.data;
}


const initialAgentData: AgentData = {
  accountId: "",
  symbol: "",
  headquarters: "",
  credits: 0,
  startingFaction: ""
}

interface MainProps {
    currentPage: string
}


function Main (props: MainProps) {
  //const data: AgentData = getAgentData();
  const [agentData, setAgentData] = useState(initialAgentData);
  const [fleetData, setFleetData] = useState(initialFleetData);
  const [system, setSystem] = useState("");
  const [waypoint, setWaypoint] = useState("");

  async function getAgentDataOnLoad() {
  setAgentData(await getAgentData());
  setSystem(agentData.headquarters.slice(0,7));
  setWaypoint(agentData.headquarters);
  console.log(agentData);
  }

  const page: JSX.Element | null = useMemo(() => {
    
    switch(props.currentPage) {
      case "AGENT": {
        return <Agent getAgentData={getAgentDataOnLoad} agentData={agentData}/>;
      }
      case "FLEET": {
        return <>Fleet</>;
      }
      case "CONTRACT": {
        return <>Contract</>;
      }
      case "SYSTEM": {
        return <SystemCard system={system} waypoint={waypoint}/>;
      }
      default: {
        return null;
      }
    }
  }, [props.currentPage]);


  return (
    <>
        {page}
    </>
  );
}

export default Main;