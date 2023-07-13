import token from "../token";

interface SellApiOptions {
    method: string,
    headers: Record<string, string>,
    body: string,
}

const getSellApiOptions = (symbol: string, units: string) => {
    const options: SellApiOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            symbol: symbol,
            units: units,
        }),
    }
    
    return options;
}

export default getSellApiOptions;