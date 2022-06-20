import React from 'react';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IIcon {
    icon: IconProp
    style?: {}
}

const Icon:React.FC<IIcon> = ({icon, style}) => {
    return (
        <FontAwesomeIcon icon={icon} style={style} />
    );
};

export default Icon;
