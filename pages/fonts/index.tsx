import React, {useEffect, useRef, useState} from 'react';
import '../../components/css/app.module.css';
import PreviewTextDemo from "../../components/FontViewerPreviewText";
import {getFonts, TFont} from "../../components/getFonts";
import {FontViewer} from "../../components/FontViewer";
import FontTester from "../../components/FontTester";
import RocketFontLayout from "../../components/RocketFontLayout";
import {Form, Input} from 'antd';

function App() {

    const previewTextDemo = PreviewTextDemo
    const [previewText, setPreviewText] = useState(previewTextDemo);
    const [fonts, setFonts] = useState([] as TFont[]);

    const [selectedFonts, setSelectedFonts] = useState([] as TFont[])
    const [fontURLInput, setFontURLInput] = useState(<Input readOnly value=""/>);

    const checkboxChange = function (e: React.ChangeEvent<HTMLInputElement>, fontInfo: TFont) {
        if (e.target.checked) {
            const newSelectedFonts = [...selectedFonts];
            newSelectedFonts.push(fontInfo)
            setSelectedFonts(newSelectedFonts);
        } else {
            const fontSrl = fontInfo.fontSrl;
            setSelectedFonts(selectedFonts.filter(t => t.fontSrl !== fontSrl));
        }
    }

    useEffect(() => {
        const fontRequestParam = selectedFonts
            .sort((a, b) => a.fontFamilyName < b.fontFamilyName ? -1 : 1)
            .reduce((param, a) => {
                const x = `${a.fontFamilyName}:${a.fontWeight}:${a.fontStyle}`;
                param.push(x);
                return param;
            }, [] as string[])
            .join('/');

        const url = `https://example.invalid/api/v1/fonts/${fontRequestParam}`;
        setFontURLInput(
            <Input readOnly value={url}/>
        )

    },[selectedFonts])

    const fontViewers = fonts.map(t => {
            return (
                <FontViewer
                    fontInfo={t}
                    key={t.fontSrl}
                    selectedFonts={selectedFonts}
                    checkboxChange={checkboxChange}
                    previewText={previewText}/>
            )
        }
    );

    useEffect(() => {
        (async () => {
            setFonts(await getFonts());
        })();
    }, [])



    const content =
        <div>
            <Form>
                <Form.Item
                    label="Font Access URL">
                    {fontURLInput}
                </Form.Item>
            </Form>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <FontTester fontName="Noto Sans KR" previewText={previewText}
                            setPreviewText={setPreviewText}/>
                {fontViewers}
            </div>
        </div>


    return (
        <RocketFontLayout>{content}</RocketFontLayout>
    );
}

export default App;