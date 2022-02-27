const menu = document.querySelector('.menu_boczne')
const calosc = document.querySelectorAll('.dodatkowy_wpis')

menu.addEventListener('mouseover',() => {
    menu.style.width = "300px"
    calosc.forEach(element => {
        element.classList.add('zmiana')
    })
})

menu.addEventListener('mouseout',() => {
    menu.style.width = "80px"
    calosc.forEach(element => {
        element.classList.remove('zmiana')
    })
})

async function time(){
    const time = new Date()
    const zegar = document.querySelector(".zegar")
    let mintofull;
    (time.getMinutes()<10) ? mintofull = `0${time.getMinutes()}` : mintofull = `${time.getMinutes()}`;
    (time.getSeconds()<10) ? sectofull = `0${time.getSeconds()}` : sectofull = `${time.getSeconds()}`;
    zegar.innerHTML = `<span>${time.getHours()}:${mintofull}:${sectofull}</span>
                       ${time.getDate()} ${monthchange(time.getMonth())} ${time.getFullYear()}`
}

function monthchange(daynum){
    const dni = ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipeic","sierpień","wrzesień","listopad","grudzień"]
    return dni[daynum]
}

{
    time()
    setInterval(time,1000)
}

