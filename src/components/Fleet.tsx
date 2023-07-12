import { FunctionComponent } from "react";
import FleetCard from "./FleetCard";

interface IProps {
    system: string,
}

const Fleet: FunctionComponent<IProps> = (props: IProps) => {

    const { system } = props;

    return (
        <FleetCard system={system}/>
    );
}

export default Fleet;