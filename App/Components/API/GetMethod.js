
const baseURL = 'https://pharmacy-server.herokuapp.com/api';
export default async function GetAPI(url) {
  try {
      let response = await fetch(
        baseURL + `${url}`,
        {
          method: 'get',
        })
      return response  
  }
  catch (error) {
    console.error(error);
  }
}
