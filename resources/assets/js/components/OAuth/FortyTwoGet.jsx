import axios from 'axios';

export function FortyTwoGet(url, userData) {
  let BaseUrl = url;
  return new Promise((resolve, reject) => {
    axios.get(BaseUrl, userData)
    .then(res => {
      resolve(res.data);
    })
    .catch(error => {
      reject(error);
    });
  });
}
