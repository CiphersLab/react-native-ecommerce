
const baseURL = 'https://pharmacy-server.herokuapp.com/api';
export default async function PostAPI(payload, url) {
    try {
        let response = await fetch(
            baseURL + `${url}`,
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        return response
    }
    catch (error) {
        console.error(error);
    }
}
