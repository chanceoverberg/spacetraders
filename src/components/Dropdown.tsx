import { FunctionComponent, useEffect, useState } from "react";
import Chevron from "../icons/Chevron";

interface Option {
    value: number,
    label: string,
}

interface SelectWaypoint {
    (waypoint: string, index: number): void;
}

interface IProps {
    placeholder: string,
    options: Option[],
    selectWaypoint: SelectWaypoint;
}

  const initialOption: Option = {value: 0, label: ""};

const Dropdown: FunctionComponent<IProps> = (props: IProps) => {
    const { placeholder, options, selectWaypoint } = props;
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialOption);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        }
    });

    const handleInputClick = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (selectedValue.label !== "") {
            return selectedValue.label;
        }
        return placeholder;
    };

    const onItemClick = (option: Option) => {
        setSelectedValue(option);
        selectWaypoint(option.label, option.value);
    };

    const isSelected = (option: Option) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue.label === option.label;
    };

    return (
        <div className="dropdown-container">
            <div onClick={handleInputClick} className="dropdown-input">
                <div className="dropdown-selected-value">{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Chevron />
                    </div>
                </div>
            </div>
            {showMenu && (
            <div className="dropdown-menu">
                {options.map((option) => {
                    return <div key={option.label} onClick={() => onItemClick(option)} 
                        className={`dropdown-item ${isSelected(option) && "selected"}`}>
                        {option.label}
                    </div>
                })}
            </div>
            )}
        </div>
    );
}

export default Dropdown;