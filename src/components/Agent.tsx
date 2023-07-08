import { FunctionComponent } from "react";
import AgentCard from "./AgentCard";
import { AgentData } from "../types";

interface IProps {
    getAgentData: () => void;
    agentData: AgentData;
}

const Agent: FunctionComponent<IProps> = (props: IProps) => {
    const {getAgentData, agentData} = props;
    getAgentData();

    return (
        <>
            <AgentCard agent={agentData}/>
        </>
    );
}

export default Agent;