const form = document.forms[0];
const pokazanieblendow = document.querySelector(".bledy")

const sendRegister = async (ev) =>  {
    ev.preventDefault();
    const formData = new FormData(form);
    
    const res = await fetch('./register', {
        method: 'post',
        body: formData
    })
    
    const data = await res.json();
    
    if (!data.isOk) {
        bledy(data.errors)
    } else {
        const rejestr = document.querySelector(".kolor-change")

        rejestr.style.position = ""
        pokazanieblendow.classList.add('przyciskchange')
        pokazanieblendow.innerText = `Pomyślnie zarejestrowano`
        setTimeout(() => {
            window.location.href = window.location.origin + '/main'
        }, 1700)
    }
}

form.addEventListener('submit', sendRegister)

function bledy(data){

    const button = document.querySelector("button")
    const rejestr = document.querySelector(".kolor-change")

    pokazanieblendow.style.display = "flex"
    form.style.paddingTop = "10px"
    button.classList.add("pojawienie")
    rejestr.style.justifyContent = "space-between"

    pokazanieblendow.innerHTML = ``

    data.forEach((tableelem) =>{
        pokazanieblendow.innerHTML += `<span>${tableelem}</span>`
    })
}