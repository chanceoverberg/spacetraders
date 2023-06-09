import { useState, useMemo, useEffect } from 'react';
import '../App.css';
import Agent from './Agent';
import System from './System';
import Contract from './Contract';
import getOptions from '../getOptions';
import Fleet from './Fleet';
import { initialAgentData } from '../initialValues';

async function getAgentData<AgentData>(): Promise<AgentData> {
  const response = await fetch('https://api.spacetraders.io/v2/my/agent', getOptions);
  const response_1 = await response.json();
  return response_1.data as AgentData;
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
  }

  useEffect(() => {
    setSystem(agentData.headquarters.slice(0,6));
    setWaypoint(agentData.headquarters);
  },[system, waypoint, agentData]);

  const page: JSX.Element | null = useMemo(() => {
    
    switch(props.currentPage) {
      case "AGENT": {
        return <Agent getAgentData={getAgentDataOnLoad} agentData={agentData}/>;
      }
      case "FLEET": {
        return <Fleet system={system}/>;
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
  }, [props.currentPage, agentData, system, waypoint]);


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