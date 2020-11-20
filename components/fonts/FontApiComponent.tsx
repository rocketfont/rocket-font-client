import SiteConfig from "../config/SiteConfig";
import React from "react";
import {Input} from "antd"
import measureFontUsage from "../fontCalculatorLib/measureFontUsage";

interface IFontApiComponent{
    fontParams  : string ,
}

const FontApiComponent = function ({fontParams } : IFontApiComponent){
    return (
        <>
            <Input.TextArea readOnly
                            value={measureFontUsage(fontParams, SiteConfig.fontCdnURL, SiteConfig.fontMeasureURL, 60)}
                            rows={11}
            >
            </Input.TextArea>
        </>);
}

export default FontApiComponent;