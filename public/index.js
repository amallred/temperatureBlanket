const form = document.getElementById('DataForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const year = document.getElementById('year').value
    const city = document.getElementById('city').value
    const tempScale = document.getElementById('tempScale').value
    const timeZone = document.getElementById('timeZone').value

    console.log(year)
    console.log(city)
    console.log(tempScale)
    console.log(timeZone)
    
    // || DISPLAY SEARCH PARAMETERS ||
    const searchResults = document.getElementById('SearchResults')
    
    const searchYear = document.createElement('p')
    const searchCity = document.createElement('p')
    const searchTempScale = document.createElement('p')
    const searchTimeZone = document.createElement('p')

    searchYear.textContent = `Year: ${year}`
    searchCity.textContent = `City: ${city}`
    searchTempScale.textContent = `Temperature Scale: ${tempScale}`
    searchTimeZone.textContent = `Time Zone: ${timeZone}`

    searchResults.appendChild(searchYear)
    searchResults.appendChild(searchCity)
    searchResults.appendChild(searchTempScale)
    searchResults.appendChild(searchTimeZone)


})


fetch('https://archive-api.open-meteo.com/v1/archive?latitude=35.222&longitude=-101.8313&start_date=2026-04-10&end_date=2026-04-24&hourly=temperature_2m&timezone=America%2FNew_York&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.error(e))

// `https://open-meteo.com/en/docs/historical-weather-api?temperature_unit=${tempScale}&daily=temperature_2m_mean&timezone=America%${timeZone}&start_date=${year}-01-01&end_date=${year}-12-31&latitude=${latitude}&longitude=${longitude}`



async function loadWeatherData (year, latitude, longitude, tempScale = "fahrenheit", timeZone = "2FNew_York") {
try {
    let res = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&hourly=temperature_2m&timezone=America%${timeZone}&temperature_unit=${tempScale}`, {
        method: GET
    })

} catch (error) {
        console.error('error', error.message)
    }
}

// async function collectData () {

// }

// Convert city name to coordinates
    // NEED TO FIND A WAY TO CONFIRM LOCATION (STATE/COUNTRY/ETC)
async function getCoordinates (cityName) {
    try {
        let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&language=en&format=json`, {
            method : GET
        })
    } catch (error) {
        console.error('error', error.message)
    }
}