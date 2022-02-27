document.addEventListener("scroll", () =>{
    let scrollvalue = window.scrollY;
    const oferty = document.querySelectorAll(".oferta")
    if(scrollvalue>=250 && scrollvalue<=1200){
        oferty.forEach(oferta =>{
            oferta.classList.add("zmiana")
            oferta.style.transition =  "opacity calc(1.2s*var(--i)) ease-in-out, transform calc(1.2s*var(--i)) ease-in-out";
        })
    }
})
