const countryname = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)

        flagImage.src = country.flags.svg
        countryNameH1.innerHTML = country.name.common

        if (country.name.nativeName) {
            nativeName.innerHTML = Object.values(country.name.nativeName)[0].common
        }
        else {
            nativeName.innerHTML = country.name.common
        }

        population.innerHTML = country.population.toLocaleString('en-IN')
        region.innerHTML = country.region

        if (country.subregion) {
            subregion.innerHTML = country.subregion
        }

        if (country.capital) {
            capital.innerHTML = country.capital?.[0]
        }

        topLevelDomain.innerHTML = country.tld.join(', ')

        if (country.currencies) {
            // currencies.innerHTML = Object.values(country.currencies).map((currencies) => currencirs.symbol)
            currencies.innerHTML = Object.values(country.currencies).map((currencies) => currencies.name).join(', ')
        }

        if (country.languages) {
            languages.innerHTML = Object.values(country.languages).join(', ')
        }

        if (country.borders) {

            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        // console.log(borderCountry)
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            })
        }
    })

let backbtn = document.querySelector('.back-button')
let clicked = () => {
    history.back()
}
backbtn.addEventListener('click', () => {
    clicked()
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
