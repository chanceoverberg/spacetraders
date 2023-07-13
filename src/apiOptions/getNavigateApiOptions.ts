import token from "../token";

interface NavigateApiOptions {
    method: string,
    headers: Record<string, string>,
    body: string,
}

const getNavigateApiOptions = (waypoint: string) => {
    const options: NavigateApiOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            waypointSymbol: waypoint,
        }),
    }
    
    return options;
}

export default getNavigateApiOptions;