import { FunctionComponent } from "react";

interface IProps {
    handleClick: (page: string) => void;
}

const HNavBar: FunctionComponent<IProps> = (props: IProps) => {
    const {handleClick} = props;

    return (
        <ul className="hnavbar-ul">
            <li className="hnavbar-li"><button className="hnavbar-li-button" onClick={() => handleClick("AGENT")}>Agent</button></li>
            <li className="hnavbar-li"><button className="hnavbar-li-button" onClick={() => handleClick("FLEET")}>Fleet</button></li>
            <li className="hnavbar-li"><button className="hnavbar-li-button" onClick={() => handleClick("CONTRACT")}>Contract</button></li>
            <li className="hnavbar-li"><button className="hnavbar-li-button" onClick={() => handleClick("SYSTEM")}>System</button></li>
        </ul>
    );
}

export default HNavBar;