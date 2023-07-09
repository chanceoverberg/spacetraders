import { FunctionComponent } from "react";
import { AgentData } from "../types/index";

interface IProps {
    agent: AgentData;
}

const AgentCard: FunctionComponent<IProps> = (props: IProps) => {

    const { agent } = props;

    return (
            <div className="card">
                <h4><b>{agent ? agent.symbol : "Error retrieving symbol"}</b></h4>
                <p>{agent ? "Headquarters: " + agent.headquarters : null}</p>
                <p>{agent ? "Credits: " + agent.credits : null}</p>
                <p>{agent ? "Starting faction: " + agent.startingFaction : null}</p>
            </div>
    );
}

export default AgentCard;