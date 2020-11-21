import React, {useContext, useEffect, useRef} from "react";
import {Card} from "antd";
import fontViewerWriterCSS from './FontViewrWriterCSS'
import PreviewTextDemo from "./FontViewerPreviewText";
import {TFont} from "../ajax/getFonts";
import SiteConfig from "../config/SiteConfig";

interface FontViewerArgs {
    fontInfo: TFont,
    previewText: string,
    selectedFonts: TFont[]
    checkboxChange: ((event: React.ChangeEvent<HTMLInputElement>, fontInfo: TFont) => void),
}

const FontViewer = (props: FontViewerArgs) => {

    const fontUsageFee = [];
        if(props.fontInfo.fontPricePerMinute !== 0) {
            fontUsageFee.push(`${props.fontInfo.fontPricePerMinute / 1e6}원/분`)
        }
        if(props.fontInfo.fontPricePerRequest !== 0){
            fontUsageFee.push(`${props.fontInfo.fontPricePerRequest / 1e6}원/요청`)
        }

    const input =
        <>
           {fontUsageFee.join(' ')}<span> </span>
            <input type="checkbox"
                   value={props.fontInfo.fontSrl}
                   onChange={(e) => props.checkboxChange(e, props.fontInfo)}
                   checked={props.selectedFonts.map(t => t.fontSrl).includes(props.fontInfo.fontSrl)}/>

        </>


    const t = props.fontInfo

    const ref = useRef(null);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('rc-lazyload-css');
                    observer.unobserve(entry.target);
                    const fontLoad = `${t.fontFamilyName}:${t.fontWeight}:${t.fontStyle}`
                    const fontAll = `${SiteConfig.fontCdnURL}/${fontLoad}`
                    const link = document.createElement('link')
                    link.rel = 'stylesheet'
                    link.href = fontAll;
                    document.head.appendChild(link)
                }
            })
        });
        //@ts-ignore
        intersectionObserver.observe(ref.current)
    }, [])

    const style = {
        fontFamily: t.fontFamilyName
    }

    return (
        <Card title={props.fontInfo.fontName}
              style={fontViewerWriterCSS}
              className="rc-lazyload-css"
              extra={input}>
            <p style={style} ref={ref}>
                {props.previewText.trim() === '' ? PreviewTextDemo : props.previewText}
            </p>
        </Card>
    )
}

export {FontViewer};