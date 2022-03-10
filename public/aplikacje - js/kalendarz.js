class Kalen {
    constructor(){
        const time = new Date()
        this.month = time.getMonth()
        this.day = time.getDay()
        this.dayofmth = time.getDate()
        this.year = time.getFullYear()
        this.numtomth = ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipeic","sierpień","wrzesień","październik","listopad","grudzień"]
        this.dnityg = ["poniedziałek","wtorek","środa","czwartek","piątek","sobota","niedziela"]

        this.upstripemonth = document.querySelector('.miesiac')
        this.upstriperest = document.querySelector('.fulldatecal')
        this.boxes = document.querySelectorAll('.dzien')
        this.buttonleft = document.querySelector('.left')
        this.buttonright = document.querySelector('.right')
    }

    cuurentmonth(){
        this.upstripemonth.innerHTML = this.numtomth[this.month]
        this.upstriperest.innerHTML = `${this.dnityg[this.day]} ${this.dayofmth} ${this.year}`
        this.dayinit()
        this.switchbut()
    }

    dayinit(){
        const tab = [...this.boxes]
        const daysInMonth = new Date(this.year, this.month+1, 0).getDate();


        const tempDate = new Date(this.year, this.month, 1);
        let firstMonthDay = tempDate.getDay();
        if (firstMonthDay === 0) firstMonthDay = 7

        


        for(let i=firstMonthDay-1;i<tab.length-2;i++){
            tab[i].innerHTML= `${i-firstMonthDay+2}`
            if(i-firstMonthDay+2>=daysInMonth){
                break;
            }

            if(i-firstMonthDay+2==0){
                tab[i].innerHTML=""
            }
            
        }
    }

    switchbut(){
        this.buttonright.addEventListener('click',(e) =>{
            this.clear()
            if(this.month >= 11) this.month=-1
            this.upstripemonth.innerHTML = this.numtomth[++this.month]
            this.upstriperest.innerHTML = `${this.dnityg[this.day]} ${this.dayofmth} ${this.year}`
            this.dayinit()

            console.log(this.month)
        })

        this.buttonleft.addEventListener('click',(e) =>{
            this.clear()
            if(this.month == 0) this.month=12
            this.upstripemonth.innerHTML = this.numtomth[--this.month]
            this.upstriperest.innerHTML = `${this.dnityg[this.day]} ${this.dayofmth} ${this.year}`
            this.dayinit()
        })

    }
    clear(){
        const tab = [...this.boxes]
            const daysInMonth = new Date(this.year, this.month+1, 0).getDate();
    
            const tempDate = new Date(this.year, this.month, 1);
            let firstMonthDay = tempDate.getDay();
            if (firstMonthDay === 0) {
                firstMonthDay = 7;
            }

        for(let i=firstMonthDay-1;i<tab.length;i++){
            tab[i].innerHTML= ` `
        }
    }

}
const kalendarz = new Kalen()
kalendarz.cuurentmonth()
