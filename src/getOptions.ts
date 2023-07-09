import token from "./token";

interface GetOptions {
    headers: Record<string, string>
}

const getOptions: GetOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
}

export default getOptions;