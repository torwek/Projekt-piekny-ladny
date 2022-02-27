const form = document.forms[0];
const pokazanieblendow = document.querySelector(".bledy")

const login = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(form);
    
    const res = await fetch('./login', {
        method: 'post',
        body: formData
    })
    
    const data = await res.json();
    
    if (!data.isOk) {
        bledy(data.errors)
    } else {
        window.location.href = window.location.origin + '/main'
    }
}

form.addEventListener('submit', login);

function bledy(data){

    const button = document.querySelector("button")
    const rejestr = document.querySelector(".kolor-change")

    pokazanieblendow.style.display = "flex"
    form.style.paddingTop = "10px"
    button.classList.add("pojawienie")

    pokazanieblendow.innerHTML = ``

    data.forEach((tableelem) =>{
        pokazanieblendow.innerHTML += `<span>${tableelem}</span>`
    })
}