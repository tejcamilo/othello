class Player {
    constructor(color, score, moves) {
        this.color = color;
        this.score = score;
        this.moves = moves;
    }
    setScore(points) {
        if (points > 0) {
            this.score = points;
        } else {
            throw new Error("Parameter must be greater than 0.")
        }

    }
    getScore() {
        return this.score;
    }
}

let player1 = new Player("black", 2, 30);
let player2 = new Player("white", 2, 30);

player1.setScore(-1)