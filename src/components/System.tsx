import { FunctionComponent } from "react";
import SystemCard from "./SystemCard";

interface IProps {
    system: string,
    waypoint: string,
}

const System: FunctionComponent<IProps> = (props: IProps) => {

    const { system, waypoint } = props;

    return (
        <>
            <SystemCard system={system} waypoint={waypoint}/>
        </>
    );
}

export default System;