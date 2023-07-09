import token from "./token";

interface PostOptions {
    method: string,
    headers: Record<string, string>
}

const postOptions: PostOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
  },
}

export default postOptions;