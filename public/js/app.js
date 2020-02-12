
//search query selector
const weatherForm = document.querySelector('form')
const searchRegion = document.querySelector('#region')
const resultLoc = document.querySelector('.res-loc')
const resultAddress = document.querySelector('.res-address')
const resultForecast = document.querySelector('.res-for')
const errorMsg = document.querySelector('.error-msg')
const loader = document.querySelector('.loader')



weatherForm.addEventListener('submit', async (e) => {

    e.preventDefault()

    const searchData = searchRegion.value

    loader.style.display = 'block';

    await fetch(`http://localhost:3000/weather?address=${searchData}`)
        .then((res) => {

            res.json().then((data) => {

                if (!data.address) {

                    resultLoc.innerHTML = ''
                    resultAddress.innerHTML = ''
                    resultForecast.innerHTML = ''
                    errorMsg.innerHTML = ''
                    errorMsg.insertAdjacentHTML('afterbegin', 'Please Provide The address')

                } else {
                    errorMsg.innerHTML = ''
                    resultLoc.innerHTML = ''
                    resultAddress.innerHTML = ''
                    resultForecast.innerHTML = ''



                    resultLoc.insertAdjacentHTML('afterbegin', data.location)
                    resultAddress.insertAdjacentHTML('afterbegin', data.forecast)
                    resultForecast.insertAdjacentHTML('afterbegin', data.address)

                    loader.style.display = 'none'


                }

            }).catch((err) => {

                errorMsg.insertAdjacentHTML('afterbegin', err)
            })

        })
        .catch((err) => {
            errorMsg.insertAdjacentHTML('afterbegin', err)
        })

})

const renderLoader = () => {
    const markup =
        `<div class="loader"></div>`



}