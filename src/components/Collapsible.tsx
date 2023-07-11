import { FunctionComponent, ReactNode, useState } from "react";

interface IProps {
    label: string;
    children: ReactNode;
}

const Collapsible: FunctionComponent<IProps> = (props: IProps) => {
    const { label, children } = props;

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div>
            <div className="collapsible-button-container">
            <button onClick={toggle} className="collapsible-toggle-button">{label}</button>
            </div>
            
            <div className={open ? "content-show" : "content-parent"}>
                {open && <div className="content">{children}</div>}
            </div>
        </div>
 )};

export default Collapsible;