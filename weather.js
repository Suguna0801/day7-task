document.getElementById('searchBtn').addEventListener('click', getWeatherData)
async function getWeatherData() {
    const city = document.getElementById('cityInput').value
    const apiKey = '7eb66d230964c71eaadf487a366d0b38'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (response.ok) {
            document.getElementById('cityName').textContent = data.name
            document.getElementById('temperature').textContent = `${data.main.temp}°C`
            document.getElementById('humidity').textContent = `${data.main.humidity}%`
            document.getElementById('weatherIcon').src =`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Error fetching weather data:', error)
        alert('Unable to retrieve weather data.')
    }
}