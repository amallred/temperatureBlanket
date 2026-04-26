const form = document.querySelector('#DataForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form) // need to look again at what this does/how it works

    // const city = formData.get('city')
    // const year = formData.get('year')

    // const data = Object.fromEntries(formData.entries())
    console.log(formData)
})



async function loadWeatherData (year, latitude, longitude, tempScale = "fahrenheit", timeZone = "2FNew_York") {
try {
    let res = await fetch(`https://open-meteo.com/en/docs/historical-weather-api?temperature_unit=${tempScale}&daily=temperature_2m_mean&timezone=America%${timeZone}&start_date=${year}-01-01&end_date=${year}-12-31&latitude=${latitude}&longitude=${longitude}`, {
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