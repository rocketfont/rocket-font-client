import SiteConfig from "../config/SiteConfig";
import {PlayBackOfficeAxios} from "./backofficeBackend";
import {useRouter} from "next/router";

interface JsonResponse<T> {
    data : T
    message : string
}
interface Font {
    fontSrl : number,
    fontFamilyName : string,
    fontWeight : number,
    fontStyle : string,
    fontPricePerMinute : number,
    fontPricePerRequest : number,
}

const fontWeightMap = new Map<number, string>();
fontWeightMap.set(100, 'Thin');
fontWeightMap.set(200, 'Extra Light');
fontWeightMap.set(300, 'Light');
fontWeightMap.set(400, 'Regular');
fontWeightMap.set(500, 'Medium')
fontWeightMap.set(600, 'Semi Bold');
fontWeightMap.set(700, 'Bold');
fontWeightMap.set(800, 'Extra Bold');
fontWeightMap.set(900, 'Black');

const getFonts = async () => {
    const ajax = await PlayBackOfficeAxios.get<JsonResponse<Array<TFont>>>('/api/v1/font')
    if(ajax.status === 200){
        const fonts: TFont[] = ajax.data.data;
        fonts.map(t => {
                t.fontName = `${t.fontFamilyName} - ${fontWeightMap.get(t.fontWeight)}`;
                t.selected = true;
                t
            })
        return {fonts, ajax}
    }
    else{
        return {fonts : [] as TFont[], ajax}
    }

}

interface TFont extends Font{
    fontName : string
    selected : boolean,
}

export  {getFonts}
export type {TFont}
export {fontWeightMap}
