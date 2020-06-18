class Opponent {
    constructor() {
        this.capabilities = [
            { name: "scissors", src: "assets/scissors.png", className: "slot--scissors" },
            { name: "rock", src: "assets/rock.png", className: "slot--rock" },
            { name: "paper", src: "assets/paper.png", className: "slot--paper" }
        ]
    }

    randomCap () {
        return this.capabilities[Math.floor(Math.random() * this.capabilities.length)]
    }


    showMove() {
        const rnc = this.randomCap()
        const img = document.createElement('img')
        img.src = rnc.src
        img.className = "slot__img"
        const dest = document.querySelector('.slot--opponent')
        const oldIMG = document.querySelector(".slot--opponent .slot__img")
        if(oldIMG) {
            dest.replaceChild(img,oldIMG)
        }
        else {
            dest.append(img)
        }
        return rnc.name
    }
}

class Player extends Opponent {
    constructor(capabilities,showMove) {
        super(capabilities,showMove)
        this.playersPoints = 0
        this.opponentPoints = 0
    }

    gameRules(playerMove,opponentMove) {
        
        function setPoints(playersPoints,opponentPoints) {
            const scoreboard = document.querySelector('.arena__score')
           return scoreboard.innerHTML = `<span>Gracz posiada ${playersPoints} punktów, Przeciwnik posiada ${opponentPoints} punktów</span>`
        }
        if (playerMove == "paper" && opponentMove == "scissors") {
            setPoints(this.playersPoints,this.opponentPoints += 1)
            
        }
        else if (playerMove == opponentMove) {
            console.log("remis")
        }
        else if (playerMove == "paper" && opponentMove == "rock") {
            setPoints(this.playersPoints += 1,this.opponentPoints)
        }
        else if (playerMove == "rock" && opponentMove == "scissors") {
            setPoints(this.playersPoints += 1,this.opponentPoints)
        }
        else if (playerMove == "rock" && opponentMove == "paper") {
            setPoints(this.playersPoints,this.opponentPoints += 1)
        }
        else if (playerMove == "scissors" && opponentMove == "paper") {
            setPoints(this.playersPoints += 1,this.opponentPoints)
        }
        else if (playerMove == "scissors" && opponentMove == "rock") {
            setPoints(this.playersPoints,this.opponentPoints += 1)
        }
    }

    chooseSlot() {
        const tabOfChoices = this.capabilities.map(element => {
            return {name: element.name, src: document.querySelector(`.${element.className}`)}
        })
        
        tabOfChoices.forEach(e => {
            const destination = e.src
            destination.addEventListener('click', () => {

                this.gameRules(e.name,this.showMove())
                
            })
            
        })
    }
}
