const form = document.getElementById('DataForm')

let year
let zipCode
let tempScale
let latitude
let longitude

// || COLLECT FORM INPUT AND UPDATE VARIABLES ||
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    year = document.getElementById('year').value
    zipCode = document.getElementById('zipCode').value
    tempScale = document.getElementById('tempScale').value

    console.log(year)
    console.log(zipCode)
    console.log(tempScale)
    
    // || DISPLAY SEARCH PARAMETERS ||
    const searchResults = document.getElementById('SearchResults')
    
    const searchYear = document.createElement('p')
    const searchZipCode = document.createElement('p')
    const searchTempScale = document.createElement('p')

    searchYear.textContent = `Year: ${year}`
    searchZipCode.textContent = `Zip Code: ${zipCode}`
    searchTempScale.textContent = `Temperature Scale: ${tempScale}`

    searchResults.appendChild(searchYear)
    searchResults.appendChild(searchZipCode)
    searchResults.appendChild(searchTempScale)

    await getCoordinates(zipCode)
    await loadWeatherData(year, latitude, longitude, tempScale)
})

async function loadWeatherData (year, latitude, longitude, tempScale = "fahrenheit") {
    try {
        const res = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${tempScale}`, {
            method: "GET"
        })
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.error('error', error.message)
    }
}

// || CONVERT ZIP CODE TO COORDINATES ||
    
async function getCoordinates (zipCode) {
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&language=en&format=json`)

        const data = await res.json()
        
        latitude = data.results[0].latitude
        longitude = data.results[0].longitude
    } catch (e) {
    console.error(e)
}
}