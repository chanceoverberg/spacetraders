import { useState, useMemo } from 'react';
import '../App.css';
import { AgentData } from '../types';
import Agent from './Agent';
import System from './System';
import Contract from './Contract';
import getOptions from '../getOptions';
import Fleet from './Fleet';

async function getAgentData<AgentData>(): Promise<AgentData> {
  const response = await fetch('https://api.spacetraders.io/v2/my/agent', getOptions);
  const response_1 = await response.json();
  return response_1.data as AgentData;
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
  const [agentData, setAgentData] = useState(initialAgentData);
  const [system, setSystem] = useState("");
  const [waypoint, setWaypoint] = useState("");

  async function getAgentDataOnLoad() {
    setAgentData(await getAgentData());
    setSystem(agentData.headquarters.slice(0,6));
    setWaypoint(agentData.headquarters);
    console.log(system);
    console.log(waypoint);
    console.log(agentData);
  }

  const page: JSX.Element | null = useMemo(() => {
    
    switch(props.currentPage) {
      case "AGENT": {
        return <Agent getAgentData={getAgentDataOnLoad} agentData={agentData}/>;
      }
      case "FLEET": {
        return <Fleet />;
      }
      case "CONTRACT": {
        return <Contract />;
      }
      case "SYSTEM": {
        return <System system={system} waypoint={waypoint}/>;
      }
      default: {
        return null;
      }
    }
  }, [props.currentPage, agentData, getAgentDataOnLoad, system, waypoint]);


  return (
    <>
    {props.currentPage === "AGENT" ? 
      <div className="button-container">
        <button className="refresh-button" onClick={getAgentDataOnLoad}>Refresh</button>
      </div> : 
        null}
        {page}
    </>
  );
}

export default Main;