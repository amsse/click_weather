const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '406c4000c7397cf4fc5d9a7c4a4e0a26';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');


            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const feels_like = document.querySelector('.weather-box .feels_like');
            const humidity = document.querySelector('.weather-details .humidity span');
            const pressure = document.querySelector('.weather-details .pressure span');
            const wind = document.querySelector('.weather-details .wind span');
            const clouds = document.querySelector('.weather-details .clouds span')


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }


            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}<span>. </span>`;
            feels_like.innerHTML = `<span>Feels like </span>${parseInt(json.main.feels_like)}<span>°C</span>`;
            humidity.innerHTML = `${json.main.humidity}%`;
            pressure.innerHTML = `${json.main.pressure}hPa`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            clouds.innerHTML = `${json.clouds.all}%`;


            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});