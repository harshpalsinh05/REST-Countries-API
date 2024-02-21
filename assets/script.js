const countriesContainer = document.querySelector('.countries-container')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {


        data.forEach((country) => {
            // console.log(country)

            const countryCard = document.createElement('a')
            countryCard.classList.add('country-card')
            countryCard.href = `country.html?name=${country.name.common}`

            countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.flags.alt}">
            <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>`

            countriesContainer.append(countryCard)

        })
        allCountriesData = data
    })

const filterbyregion = document.querySelector('.filter-by-region')

filterbyregion.addEventListener('change', (e) => {

    fetch(`https://restcountries.com/v3.1/region/${filterbyregion.value}`)
        .then((res) => res.json())
        .then((data) => {

            countriesContainer.innerHTML = ''

            data.forEach((country) => {
                // console.log(country)

                const countryCard = document.createElement('a')
                countryCard.classList.add('country-card')
                countryCard.href = `country.html?name=${country.name.common}`

                countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.flags.alt}">
            <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>`

                countriesContainer.append(countryCard)

            })
        })

})

function loadcountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag" />
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString(
            'en-IN'
        )}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>
    `
        countriesContainer.append(countryCard)
    })
}


const searchinput = document.querySelector(".search-container input")

searchinput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    loadcountries(filteredCountries)
})

let btn = document.getElementById("btn")
let btntext = document.getElementById("btn-text")
let btnimg = document.getElementById("btn-icon")
// let moon = document.querySelector('.fa-regular')

btn.onclick = () => {
    document.body.classList.toggle("dark")
    if (document.body.classList.contains("dark")) {
        // btnimg.innerHTML = `<i class="fa-light fa-sun">`
        btntext.innerHTML = "Light Mode"
    } else {
        // btnimg.innerHTML = `<i class="fa-regular fa-moon">`
        btntext.innerHTML = "Dark Mode"
    }
}


// basic method
// const cardImg = document.createElement('img')
// cardImg.src = 'https://flagcdn.com/is.svg'

// more efficient method
// const cardHTML = `
// <img src="https://flagcdn.com/is.svg" alt="flag">
// <div class="card-text">
//     <h3 class="card-title">Iceland</h3>
//     <p><b>Population: </b>81,770,900</p>
//     <p><b>Region: </b>Europe</p>
//     <p><b>Capital: </b>Berlink</p>
// </div>
// `

// countryCard.innerHTML = cardHTML

// countriesContainer.append(countryCard)
