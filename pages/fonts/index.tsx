import React, {FormEvent, FormEventHandler, useEffect, useRef, useState} from 'react';
import '../../components/css/app.module.css';
import PreviewTextDemo from "../../components/fonts/FontViewerPreviewText";
import {fontWeightMap, getFonts, TFont} from "../../components/ajax/getFonts";
import {FontViewer} from "../../components/fonts/FontViewer";
import FontTester from "../../components/fonts/FontTester";
import RocketFontLayout from "../../components/RocketFontLayout";
import {Col, Form, Input, Row} from 'antd';
import {useRouter} from "next/router";
import FontApiComponent from "../../components/fonts/FontApiComponent";
import {Select} from 'antd';


function App() {

    const previewTextDemo = PreviewTextDemo
    const [previewText, setPreviewText] = useState(previewTextDemo);
    const [fonts, setFonts] = useState([] as TFont[]);
    const [allFonts, setAllFonts] = useState([] as TFont[]);

    const [filter, setFilter] = useState(new Map<string, string>())

    const router = useRouter();

    const [selectedFonts, setSelectedFonts] = useState([] as TFont[])
    const [fontApiComponent, setFontApiComponent] = useState(<FontApiComponent fontParams={''}/>)

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
        const fontParams = selectedFonts
            .sort((a, b) => a.fontName < b.fontName ? -1 : 1)
            .reduce((param, a) => {
                const x = `${a.fontFamilyName}:${a.fontWeight}:${a.fontStyle}`
                    .replaceAll(' ', '+')
                param.push(encodeURI(x));
                return param;
            }, [] as string[])
            .join('/');

        setFontApiComponent(
            <FontApiComponent fontParams={fontParams}/>
        )
    }, [selectedFonts])

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
            const {fonts, ajax} = (await getFonts());
            setFonts(fonts);
            setAllFonts(fonts)

            if (ajax.status === 403) {
                router.push('/member/login')
                return;
            }

        })();
    }, [])

    useEffect(() => {
        const fontFamily = filter.get('fontFamily') ?? '';
        const fontWeight = Number.parseInt(filter.get('fontWeight') ?? '-1')
        let filteredFonts = allFonts;
        if (fontFamily !== '') {
            filteredFonts = filteredFonts.filter(t => t.fontFamilyName.toLowerCase().includes(fontFamily.toLowerCase()))
        }
        if (fontWeight !== -1) {
            filteredFonts = filteredFonts.filter(t => t.fontWeight === fontWeight);
        }
        setFonts(filteredFonts);
    }, [filter])


    const onFilterChange = (changedValues: any[]) => {
        changedValues.forEach(value => {
            setFilter(oldFilter => {
                const newSearchFilter = new Map<string, string>(oldFilter);
                newSearchFilter.set(value.name[0] as string, value.value as string);
                return newSearchFilter;
            })
        });
    }
    const filterForm =
        <Form onFieldsChange={onFilterChange}>
            <Row style={{display: 'flex'}}>
                <Col span="12">
                    <Form.Item name="fontFamily" label="이름 필터">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span="12">
                    <Form.Item name="fontWeight" label="두께 필터">
                        <Select>
                            <Select.Option value="-1">전체</Select.Option>
                            {Array.from(fontWeightMap.keys()).map(key => {
                                const name = `${key} - ${fontWeightMap.get(key)}`
                                const value = `${key}`
                                return <Select.Option key={value} value={value}>{name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>


    const content =
        <div>
            <Form>
                <Form.Item
                    label="Font API">
                    {fontApiComponent}
                </Form.Item>
            </Form>
            {filterForm}
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <FontTester previewText={previewText}
                            setPreviewText={setPreviewText}/>
                {fontViewers}
            </div>
        </div>


    return (
        <RocketFontLayout>
            {content}</RocketFontLayout>
    );
}

export default App;