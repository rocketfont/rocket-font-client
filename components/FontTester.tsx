import React from "react";
import {Card} from "antd";
import fontViewerWriterCSS from './FontViewrWriterCSS'
import {EditOutlined} from "@ant-design/icons";


interface FontTestWriterArgs {
    fontName: string
    previewText : string
    setPreviewText : (text: string) => void,
}

const FontTester = (props: FontTestWriterArgs) => {
    const textAreaCss = {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipse',
        resize: 'none' as 'none',
        border: 0,
    };


    const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setPreviewText(e.target.value)
        console.log(e.target.value)
    };

    return (
        <Card title="미리 써보기" style={fontViewerWriterCSS}>
            <textarea rows={2}
                      style={textAreaCss}
                      maxLength={64}
                      onChange={handleChange}
                      placeholder={props.previewText}
            >
            </textarea>
        </Card>
    )
}

export default FontTester
