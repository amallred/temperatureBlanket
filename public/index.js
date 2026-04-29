const form = document.getElementById('DataForm')

// || VARIABLES ||
let year
// let zipCode
let city
let tempScale
let latitude
let longitude
let maxHighTemp
let maxLowTemp
let minHighTemp
let minLowTemp

// || COLLECT FORM INPUT AND UPDATE VARIABLES ||
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    year = document.getElementById('year').value
    city = document.getElementById('city').value
    // zipCode = document.getElementById('zipCode').value
    tempScale = document.getElementById('tempScale').value
    
    // || DISPLAY SEARCH PARAMETERS ||
    const searchResults = document.getElementById('SearchResults')
    
    const resultsHeader = document.createElement('h2')
    const searchYear = document.createElement('p')
    const searchCity = document.createElement('p')
    // const searchZipCode = document.createElement('p')
    const searchTempScale = document.createElement('p')
    const searchMaxHighTemp = document.createElement('p')
    const searchMinHighTemp = document.createElement('p')
    // const searchMaxLowTemp = document.createElement('p')
    // const searchMinLowTemp = document.createElement('p')

    await getCoordinates(city)
    await loadWeatherData(year, latitude, longitude, tempScale)

    resultsHeader.textContent = 'Displaying results for:'
    searchYear.textContent = `Year: ${year}`
    searchCity.textContent = `City: ${city}`
    // searchZipCode.textContent = `Zip Code: ${zipCode}`
    searchTempScale.textContent = `Temperature Scale: ${tempScale}`
    searchMaxHighTemp.textContent = `The max high temp is: ${maxHighTemp}`
    searchMinHighTemp.textContent = `The min high temp is: ${minHighTemp}`
    // searchMaxLowTemp.textContent = `The max low temp is: ${maxLowTemp}`
    // searchMinLowTemp.textContent = `The min low temp is: ${minLowTemp}`

    searchResults.replaceChildren(
        searchResults.appendChild(resultsHeader),
        searchResults.appendChild(searchYear),
        searchResults.appendChild(searchCity),
        searchResults.appendChild(searchTempScale),
        searchResults.appendChild(searchMaxHighTemp),
        searchResults.appendChild(searchMinHighTemp)
        // searchResults.appendChild(searchMaxLowTemp),
        // searchResults.appendChild(searchMinLowTemp)
        )
})

export async function loadWeatherData (year, latitude, longitude, tempScale = "fahrenheit") {
    try {
        const res = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${tempScale}`, {
            method: "GET"
        })
        const data = await res.json()
        // console.log(data.daily.temperature_2m_max)
        
        // Find max/min of HIGH temps for the year
        let maxHighTemps = data.daily.temperature_2m_max
        maxHighTemp = Math.max(...maxHighTemps)
                
        let minHighTemps = data.daily.temperature_2m_max
        minHighTemp = Math.min(...minHighTemps)
        
        let dailyHighTemps = data.daily.temperature_2m_max
        
        
        // || THIS IS WHERE YOU ARE WORKING. ||
        //    YOU NEED TO FIGURE OUT HOW TO LOOP OVER EACH  DAY'S TEMP IN THE ARRAY AND 
        //    SEE WHICH 'BUCKET' IT FALLS INTO. BUCKETS ARE CALCULATED BY FINDING THE
        //    DIFFERENCE BETWEEN THE YEAR'S MAX HIGH AND LOW TEMPS AND DIVIDING (CURRENTLY) 
        //    BY 8. THAT NUMBER WILL GET ADDED TO THE PREVIOUS TOTAL TO FIND THAT BUCKET'S
        //    RANGE. 
        
        // maybe try mapping data based on where it would fall...
        // or store the ranges in a list of dictionaries ... chatgpt suggestion
        
        let tempDifference = maxHighTemp - minHighTemp
        let tempPercentage = Math.floor(tempDifference / 8) //Currently the number of colors you can select

        // console.log(`Max High: ${maxHighTemp}\nMin High: ${minHighTemp}\nTemp difference: ${tempDifference}\n Temp percentage: ${tempPercentage}`)

        let rangeZero = minHighTemp
        let rangeOne = rangeZero + tempPercentage
        let rangeTwo = rangeOne + tempPercentage
        let rangeThree = rangeTwo + tempPercentage
        let rangeFour = rangeThree + tempPercentage
        let rangeFive = rangeFour + tempPercentage
        let rangeSix = rangeFive + tempPercentage
        let rangeSeven = rangeSix + tempPercentage
        let rangeEight = maxHighTemp

        const previewContainer = document.getElementById('preview')
        const addColor = document.createElement('p')

        // console.log(`Temperature ranges: ${rangeZero}, ${rangeOne}, ${rangeTwo}, ${rangeThree}, ${rangeFour}, ${rangeFive}, ${rangeSix}, ${rangeSeven}, ${rangeEight}`)

        // SWITCH CASES?

        for (const dailyTemp of dailyHighTemps) {
            if ((dailyTemp >= rangeZero) && (dailyTemp < rangeOne)) {
                console.log('Black')
            } else if ((dailyTemp >= rangeOne) && (dailyTemp < rangeTwo)) {
                console.log('Purple')
            } else if ((dailyTemp >= rangeTwo) && (dailyTemp < rangeThree)) {
                console.log('Blue')
            } else if ((dailyTemp >= rangeThree) && (dailyTemp < rangeFour)) {
                console.log('Green')
            } else if ((dailyTemp >= rangeFour) && (dailyTemp < rangeFive)) {
                console.log('Yellow')
            } else if ((dailyTemp >= rangeFive) && (dailyTemp < rangeSix)) {
                console.log('Orange')
            } else if ((dailyTemp >= rangeSix) && (dailyTemp < rangeSeven)) {
                console.log('Red')
            } else if ((dailyTemp >= rangeSeven) && (dailyTemp <= rangeEight)) {
                console.log('White')
            }
        }
        // Find max/min LOW temps for the year
        // let maxLowTemps = data.daily.temperature_2m_min
        // maxLowTemp = Math.max(...maxLowTemps)
        
        // let minLowTemps = data.daily.temperature_2m_min
        // minLowTemp = Math.min(...minLowTemps)

    } catch (error) {
        console.error('error', error.message)
    }
}

// || CONVERT CITY TO COORDINATES ||
// Currently using only the top result from the city search.

async function getCoordinates (city) {
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&format=json`)
        
        // This link includes formatting to show the top 10 results
        // https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json
        
        const data = await res.json()
        
        latitude = data.results[0].latitude
        longitude = data.results[0].longitude
    } catch (e) {
        console.error(e)
    }
}


// || CONVERT ZIP CODE TO COORDINATES  > DOES NOT WORK WELL; API ISSUE, NOT CODE ISSUE. SEE README FOR MORE INFO ||
// async function getCoordinates (zipCode) {
//     try {
//         const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&language=en&format=json`)

//         const data = await res.json()
        
//         latitude = data.results[0].latitude
//         longitude = data.results[0].longitude
//     } catch (e) {
//     console.error(e)
// }
// }

// || COLOR SELECTION ||

const colorForm = document.getElementById('ColorForm')

// TESTING
// loadWeatherData (2000, 35.222, -101.8313, tempScale = "fahrenheit")