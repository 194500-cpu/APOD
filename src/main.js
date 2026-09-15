const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const date = document.querySelector("#datepicker").value;
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)