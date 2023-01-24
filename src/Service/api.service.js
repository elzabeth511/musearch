import axios from "axios";

export const getSuggestions = (searchTerm) => {

const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/search',
  params: {term: searchTerm, locale: 'en-US', offset: '0', limit: '5'},
  headers: {
    'X-RapidAPI-Key': 'f90baf0696mshf4438badcd377b6p1168c6jsn71ebfccd6c87',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

  return axios.request(options);
};

export const getSongDetails = (songId) => {


  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
    params: {id: songId, l: 'en-US'},
    headers: {
      'X-RapidAPI-Key': 'f90baf0696mshf4438badcd377b6p1168c6jsn71ebfccd6c87',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  };
  