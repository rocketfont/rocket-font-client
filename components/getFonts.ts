const getFonts = () => {
    console.log('getting Data');
    return Promise.resolve([
        {
            fontSrl: 1,
            fontFamilyName: 'Noto Sans KR',
            fontWeight : 400,
            fontStyle : 'normal',
            selected : false,
        },
        {
            fontSrl: 2,
            fontFamilyName: 'Nanum Gothic',
            fontStyle : 'normal',
            fontWeight: 400,
            selected: false,
        }
    ]);
}

interface TFont {
    fontSrl : number,
    fontFamilyName : string,
    selected : boolean,
    fontWeight : number,
    fontStyle : string,
}

export  {getFonts}
export type {TFont}
