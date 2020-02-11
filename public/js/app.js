
//search query selector
const weatherForm = document.querySelector('form')
const searchRegion = document.querySelector('#region')

weatherForm.addEventListener('submit', async (e) => {

    e.preventDefault()

    const searchData = searchRegion.value

    await fetch(`http://localhost:3000/weather?address=${searchData}`)
        .then((res) => {

            res.json().then((data) => {

                if (!data.address) {
                    return console.log('Please provide the address')
                }

                console.log(data.location)
                console.log(data.forecast)
                console.log(data.address)

            }).catch((err) => {

                console.log(err)
            })

        })
        .catch((err) => {
            console.log(err)
        })

})