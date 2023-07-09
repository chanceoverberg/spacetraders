import { FunctionComponent, useEffect } from "react";
import AgentCard from "./AgentCard";
import { AgentData } from "../types";

interface IProps {
    getAgentData: () => void;
    agentData: AgentData;
}

const Agent: FunctionComponent<IProps> = (props: IProps) => {
    const {getAgentData, agentData} = props;
    
    useEffect(() => {
        getAgentData();
    }, []);

    return (
        <>
            <AgentCard agent={agentData}/>
        </>
    );
}

export default Agent;