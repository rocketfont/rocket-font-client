import React, {useContext} from "react";
import {Card} from "antd";
import fontViewerWriterCSS from './FontViewrWriterCSS'
import PreviewTextDemo from "./FontViewerPreviewText";
import {TFont} from "./getFonts";

interface FontViewerArgs {
    fontInfo: TFont,
    previewText: string,
    selectedFonts : TFont[]
    checkboxChange: ((event: React.ChangeEvent<HTMLInputElement>, fontInfo : TFont) => void),
}

const FontViewer = (props: FontViewerArgs) => {

    const input = <input type="checkbox"
                         value={props.fontInfo.fontSrl}
                         onChange={(e) => props.checkboxChange(e, props.fontInfo)}
                         checked={props.selectedFonts.filter(t => t.fontSrl === props.fontInfo.fontSrl).length !== 0}/>;


    return (
        <Card title={props.fontInfo.fontFamilyName}
              style={fontViewerWriterCSS}
              extra={input} >
            <p>
                {props.previewText.trim() === '' ? PreviewTextDemo : props.previewText}
            </p>
        </Card>
    )
}

export {FontViewer};