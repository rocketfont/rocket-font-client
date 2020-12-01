import React from "react";
import {Card} from "antd";
import fontViewerWriterCSS from './FontViewrWriterCSS'
import {EditOutlined} from "@ant-design/icons";


interface FontTestWriterArgs {
    previewText: string
    setPreviewText: (text: string) => void,
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


    let throttleTimer: number | null = null;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (throttleTimer === null) {
            throttleTimer = window.setTimeout(() => {
                throttleTimer = null;
                props.setPreviewText(value)
                // console.log('throttle' ,value)
            }, 200)
        }
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
