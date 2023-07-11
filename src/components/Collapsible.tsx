import { FunctionComponent, ReactNode, useState } from "react";

interface IProps {
    label: string;
    buttonStyle: string;
    containerStyle: string;
    children: ReactNode;
}

const Collapsible: FunctionComponent<IProps> = (props: IProps) => {
    const { label, buttonStyle, containerStyle, children } = props;

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div>
            <div className={containerStyle}>
            <button onClick={toggle} className={buttonStyle}>{label}</button>
            </div>
            
            <div className={open ? "content-show" : "content-parent"}>
                {open && <div className="content">{children}</div>}
            </div>
        </div>
 )};

export default Collapsible;