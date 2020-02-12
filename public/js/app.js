
//search query selector
const weatherForm = document.querySelector('form')
const searchRegion = document.querySelector('#region')
const resultLoc = document.querySelector('.res-loc')
const resultAddress = document.querySelector('.res-address')
const resultForecast = document.querySelector('.res-for')

weatherForm.addEventListener('submit', async (e) => {

    e.preventDefault()

    const searchData = searchRegion.value

    await fetch(`http://localhost:3000/weather?address=${searchData}`)
        .then((res) => {

            res.json().then((data) => {

                if (!data.address) {
                    return console.log('Please provide the address')
                }

                resultLoc.innerHTML = ''
                resultAddress.innerHTML = ''
                resultForecast.innerHTML = ''


                resultLoc.insertAdjacentHTML('afterbegin', data.location)
                resultAddress.insertAdjacentHTML('afterbegin', data.forecast)
                resultForecast.insertAdjacentHTML('afterbegin', data.address)


            }).catch((err) => {

                console.log(err)
            })

        })
        .catch((err) => {
            console.log(err)
        })

})