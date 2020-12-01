import {useState} from "react";

// function useSessionStorageState(key: string, value : string | null) {
//     const [stateValue, setStateValue] = useState(value as string | null)
//
//     const setSessionStorage = (value: string) => {
//         sessionStorage.setItem(key, value);
//         setStateValue(stateValue)
//     };
//     const getSessionStorge = (key: string): string | null => {
//         const item = sessionStorage.getItem(key);
//         setStateValue(item);
//         return item;
//     }
//
//     return [getSessionStorge, setSessionStorage];
// }

function useSessionStorageStateNotNull(key: string, value : string ) : [ () => string, (value : string) => void]{
    const [stateValue, setStateValue] = useState(value)
    const getSessionStorge : () => string = () => {
        const item = sessionStorage.getItem(key) ?? '';
        setStateValue(item);
        return item;
    }

    const setSessionStorage: (pValue: string) => void = (pValue: string) => {
        sessionStorage.setItem(key, pValue);
        setStateValue(stateValue)
    };


    return [getSessionStorge, setSessionStorage]
}

export  { useSessionStorageStateNotNull};