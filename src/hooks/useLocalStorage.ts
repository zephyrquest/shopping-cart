import { useEffect, useState } from "react";


export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        // gives the value from local storage or return the initial value passed
        const jsonValue = localStorage.getItem(key);
        if(jsonValue != null) {
            return JSON.parse(jsonValue);
        }

        if(typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        // run every time key or value changes
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue];
}