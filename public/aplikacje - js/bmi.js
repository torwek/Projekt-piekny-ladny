const wynik = document.querySelector('.wynik')

document.addEventListener('submit',(e) => {
    e.preventDefault()
    const waga = document.querySelector('.waga').value
    const wzrost = document.querySelector('.wzrost').value
    const bmi = liczenieBmi(waga,wzrost)
    
    wynik.innerHTML = `<div>Twój wynik to:
                       <span class="agresywnaczcionka">${bmi.toFixed(2)}</span>
                       </div>
                       <span> ${sprawdzaniebmi(bmi)}</span>`
})

function liczenieBmi(waga,wzrost){
    return waga/(Math.pow(wzrost/100,2))
}

function sprawdzaniebmi(bmi){
    if(bmi<16) return "Jesteś wygłodzony"
    if(bmi>=16 && bmi<16.99) return "Jesteś wychudzony, sama skóra i kości"
    if(bmi>=17 && bmi<18.49) return "Masz niedowage"
    if(bmi>=18.5 && bmi<24.99) return "Masz pożądaną masę ciała"
    if(bmi>=25 && bmi<29.99) return "Masz nadwage ty grubasie"
    if(bmi>=30) return "Jesteś otyły czas na odchudzanie ;)"
    else return ""
}
