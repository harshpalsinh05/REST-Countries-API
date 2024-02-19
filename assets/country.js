const countryname = new URLSearchParams(location.search).get('name')

fetch(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`)
.then((res) => res.json())
.then((data)=> {
    console.log(data[0])
})