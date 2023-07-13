import token from "../token";

interface DeliverApiOptions {
    method: string,
    headers: Record<string, string>,
    body: string,
}

const getDeliverApiOptions = (shipSymbol: string, tradeSymbol: string, units: string) => {
    const options: DeliverApiOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            shipSymbol: shipSymbol,
            tradeSymbol: tradeSymbol,
            units: units,
        }),
    }
    
    return options;
}

export default getDeliverApiOptions;