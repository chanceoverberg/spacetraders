import { FunctionComponent } from "react";
import { Cargo, ShipData } from "../types";

interface IFleetProps {
    cargo: Cargo;
    //shipData: ShipData;
    symbol: string;
}

const Fleet: FunctionComponent<IFleetProps> = (props) => {
    const {cargo, symbol} = props;

    return (
        <div className="Fleet">
            <p>Fleet</p>
            <p>{symbol}</p>
        </div>
    );
}

export default Fleet;