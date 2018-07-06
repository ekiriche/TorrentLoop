import axios from 'axios';

export function FortyTwoPost(url, userData) {
  let BaseUrl = url;
  return new Promise((resolve, reject) => {
    axios.post(BaseUrl, userData)
    .then(res => {
      resolve(res.data);
    })
    .catch(error => {
      reject(error);
    });
  });
}
