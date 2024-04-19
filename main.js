// black always goes first
let turn = true;

class Player {
    constructor(color, score) {
        this.color = color;
        this.score = score;
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

let player1 = new Player("black", 2);
let player2 = new Player("white", 2);

function getScore() {
    // index 0 for black score, index 1 for white score.
    let arr = [0,0]; 
    for (let i = 65; i < 73; i++) {
        for (let j = 0; j < 8; j++){
            let str = document.getElementById(String.fromCharCode(i)
            .toLowerCase()+j).innerText;
            if (str.substring(3, str.length) === "black") {
                arr[0]++;
            } else if (str.substring(3,str.length) === "white") {
                arr[1]++;
            } 
        }
    }
    
    player1.setScore(arr[0]);
    player2.setScore(arr[1]);

    if(arr[0] === 0) {
        alert("White wins, there are no black pieces left.")
    } else if (arr[1] === 0) {
        alert("Black wins, there are no white pieces left.")
    }
    document.getElementById("score_b").innerText = ` ${player1.getScore()} `;
    document.getElementById("score_w").innerText = ` ${player2.getScore()} `;


    return arr;
}

function xChains(turn, id) {
    turn = turn === true ? "white" : "black";
    let row = id.charCodeAt(0) - 97;
    // this needs to be a number not a string
    let col = +id.charAt(1); 
    let arr1 = [];
    let arr2 = [];

    // get 2d array of all items
    let board = [[],[],[],[],[],[],[],[]];
    for (let i = 97; i < 105; i++) {
        for (let j = 0; j < 8; j++){ 
            let str = document.getElementById(String.fromCharCode(i)+j).innerText;
            board[i-97].push(str);
        }
    }

    for (let i = 0; i < board.length; i++) {
        const j = col + row - i;
        if (j >= 0 && j < board.length) {
            arr1.push(board[i][j]);
        }
        const k = col - row + i;
        if (k >= 0 && k < board.length) {
            arr2.push(board[i][k]);
        }
    }
        console.log(arr1);
        console.log(arr2);

    let color = turn;
    // change color of row
    let start;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].substring(0,2) === id) {
            start = i;
        }
    }

    let leftEnd, rightEnd;
    
    // find right-end position until we find an empty cell
    for (let i = start; i < arr1.length; i++) { 
    //    console.log("right-end loop",arr1[i].substring(3))
        if (arr1[i].substring(3) === color) {
            rightEnd = i;
        } else if (arr1[i].substring(3) === "none") {
            break;
        }
    }

    //find left-end position until we find an empty cell
    for (let i = start; i > -1 ; i--) {
    //    console.log("left-end loop",arr1[i].substring(3))
        if (arr1[i].substring(3) === color) {
            leftEnd = i;
        } else if (arr1[i].substring(3) === "none") {
            break;
        }
    }
    //console.log(`rend ${rightEnd}, lend ${leftEnd}`)

    // change right left of selected cell
    if (rightEnd !== start) {
        console.log(`start: ${start} rend: ${rightEnd} color: ${color}`)
        for (let i = start; i < rightEnd; i++) {
            let id = arr1[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }
    // change cells right of selected cell 
    if (leftEnd !== start) {
        //console.log(`start: ${start} lend: ${leftEnd} color: ${color}`)
        for (let i = leftEnd; i < start; i++) {
            let id = arr1[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }
    // change the value of start to row - re-initialize start
    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].substring(0,2) === id) {
            start = i;
        }
    }
    
    // find right-end position until we find an empty cell
    for (let i = start; i < arr2.length; i++) { 
    //    console.log("right-end loop",arr1[i].substring(3))
        if (arr2[i].substring(3) === color) {
            rightEnd = i;
        } else if (arr2[i].substring(3) === "none") {
            break;
        }
    }

    //find left-end position until we find an empty cell
    for (let i = start; i > -1 ; i--) {
    //    console.log("left-end loop",arr1[i].substring(3))
        if (arr2[i].substring(3) === color) {
            leftEnd = i;
        } else if (arr2[i].substring(3) === "none") {
            break;
        }
    }
    //console.log(`rend ${rightEnd}, lend ${leftEnd}`)

    // change right left of selected cell
    if (rightEnd !== start) {
        console.log(`start: ${start} rend: ${rightEnd} color: ${color}`)
        for (let i = start; i < rightEnd; i++) {
            let id = arr2[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }
    // change cells right of selected cell 
    if (leftEnd !== start) {
        //console.log(`start: ${start} lend: ${leftEnd} color: ${color}`)
        for (let i = leftEnd; i < start; i++) {
            let id = arr2[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }
}

function chains(turn, id) {
    turn = turn === true ? "white" : "black";
    let row = id.charAt(0);
    let column = id.charAt(1);

    let takenRow = [];
    let takenColumn = [];

    // get selected row data
    for (let i = 0; i < 8; i++) {
        let str = document.getElementById(row+i).innerText;
        takenRow.push(str);
    }
    console.log(takenRow)
    
    // get selected column data
    for (let i = 97; i < 105; i++) {
        let str = document.getElementById(String.fromCharCode(i)+column).innerText;
        //if (str.substring(3) !== "none") {
        takenColumn.push(str);
    }
    console.log(takenColumn)

    let color = turn;
    let enemy = color === "white" ? "black" : "white";
    // change color of row
    let start = column;
    let leftEnd, rightEnd;
    
    // find right-end position until we find an empty cell
    for (let i = start; i < takenRow.length; i++) { 
       // console.log("right-end loop",takenRow[i].substring(3))
        if (takenRow[i].substring(3) === color) {
            rightEnd = i;
        } else if (takenRow[i].substring(3) === "none") {
            break;
        }
    }

    //find left-end position until we find an empty cell
    for (let i = start; i > -1 ; i--) {
       // console.log("left-end loop",takenRow[i].substring(3))
        if (takenRow[i].substring(3) === color) {
            leftEnd = i;
        } else if (takenRow[i].substring(3) === "none") {
            break;
        }
    }
    //console.log(`rend ${rightEnd}, lend ${leftEnd}`)

    // change right left of selected cell
    if (rightEnd !== start) {
        //console.log(`start: ${start} rend: ${rightEnd} color: ${color}`)
        for (let i = start; i < rightEnd; i++) {
            let id = takenRow[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }
    // change cells right of selected cell 
    if (leftEnd !== start) {
        //console.log(`start: ${start} lend: ${leftEnd} color: ${color}`)
        for (let i = leftEnd; i < start; i++) {
            let id = takenRow[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }
    // change the value of start to row
    start = row.charCodeAt(0)-97
    for (let i = start; i < takenColumn.length; i++) { 
        // console.log("right-end loop",takenRow[i].substring(3))
         if (takenColumn[i].substring(3) === color) {
             rightEnd = i;
         } else if (takenColumn[i].substring(3) === "none") {
             break;
         }
     }

     for (let i = start; i > -1 ; i--) {
        // console.log("left-end loop",takenRow[i].substring(3))
         if (takenColumn[i].substring(3) === color) {
             leftEnd = i;
         } else if (takenColumn[i].substring(3) === "none") {
             break;
         }
     }

     if (rightEnd !== start) {
        //console.log(`start: ${start} rend: ${rightEnd} color: ${color}`)
        for (let i = start; i < rightEnd; i++) {
            let id = takenColumn[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }

    if (leftEnd !== start) {
        //console.log(`start: ${start} lend: ${leftEnd} color: ${color}`)
        for (let i = leftEnd; i < start; i++) {
            let id = takenColumn[i].substring(0,2);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add(color);
            document.getElementById(id).textContent = `${id} ${color}`;
        }
    }   
    
}

function validMove(turn) {
    let boxes = document.querySelectorAll("button");
    for (const box of boxes) {
        box.classList.remove("validMove");
      }

    turn = turn === true ? "white" : "black";
    let enemyCells = [];
    let takenCells = [];
    let validMoves = [];
    for (let i = 97; i < 105; i++) {
        for (let j = 0; j < 8; j++){ 
            let str = document.getElementById(String.fromCharCode(i)+j).innerText;
            if (str.substring(3) !== "none") {
                takenCells.push(str.substring(0,2));
            }
            if (str.substring(3) === turn) {
                enemyCells.push(str.substring(0, 2));
            }
        }
    }
    // if player loses all tokens, game is over. 
    if (enemyCells.length === 0) {
        alert(`${turn} wins, there are no enemy pieces left.`)
    }

    for (const cell of enemyCells) {
        let row = cell[0];
        let column = +cell[1]; //change type from string to number so we can work with it later
        
        if (cell === "a0") {
            if (! takenCells.includes("a1")) {
                validMoves.push("a1");
            } else if (! takenCells.includes("b0")) {
                validMoves.push("b0");
            }
        } else if (cell === "a7") {
            if (! takenCells.includes("a6")) {
                validMoves.push("a6")
            } else if (! takenCells.includes("b7")) {
                validMoves.push("b7")
            }
        } else if (cell === "h0") {
            if (! takenCells.includes("g0")) {
                validMoves.push("g0");
            } else if (! takenCells.includes("h1")) {
                validMoves.push("h1");
            }
        } else if (cell === "h7") {
            if (! takenCells.includes("g7")) {
                validMoves.push("g7");
            } else if (! takenCells.includes("h6")) {
                validMoves.push("h6");
            }
        } else if (row.charCodeAt(0) === 97 || row.charCodeAt(0) === 104) {
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)) + (column-1))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)) + (column-1));
            }
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)) + (column+1))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)) + (column+1));
            }
        } else if (column === 0 || column === 7) {
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)-1) + (column))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)-1) + (column));
            }
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)+1) + (column))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)+1) + (column));
            }
        } else {
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)-1) + (column))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)-1) + (column));
            }
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)+1) + (column))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)+1) + (column));
            }
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)) + (column-1))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)) + (column-1));
            }
            if (! takenCells.includes(String.fromCharCode(row.charCodeAt(0)) + (column+1))) {
                validMoves.push(String.fromCharCode(row.charCodeAt(0)) + (column+1));
            }
        }

    }

    // console log so I can see 
    // if (turn === "white") {
    //     console.log(`Occupied cells: ${takenCells}`)
    //     //console.log(`White pieces: ${occupiedCells}`);
    //     console.log(`Valid moves: ${validMoves}`);
    // } else {
    //     console.log(`Occupied cells: ${takenCells}`)
    //     //console.log(`Black pieces: ${occupiedCells}`);
    //     console.log(`Valid moves: ${validMoves}`);
    // }
    // console.log(validMoves);
    // for (const element of validMoves) {
    //     let str = document.getElementById(element);
    //     str.classList.add("validMove");
    // }
    for (const element of validMoves) {
        document.getElementById(element).classList.add("validMove");   
    }
    return validMoves;
}

function setPiece(id) {
    let arr = document.getElementById(id).innerText.split(' ');
    //console.log(validMove(turn));
    let currentScore = getScore();
    if (validMove(turn).length === 0) {
        alert("Game over, there are no more possible moves.")
    }
    
    if (turn && validMove(turn).includes(id)){
        //console.log(`Remaining moves: ${blackMoves}`);
        document.getElementById(id).className = "";
        document.getElementById(id).classList.add("black");
        //document.getElementById(id).style.backgroundColor = 'black';
        document.getElementById(id).textContent = `${id} black`;
        turn = false;
        chains(turn,id);
        xChains(turn, id);
    } else if(validMove(turn).includes(id) ){

        //console.log(`Remaining moves: ${whiteMoves}`);
        document.getElementById(id).className = "";
        document.getElementById(id).classList.add("white");
        //document.getElementById(id).style.backgroundColor = 'white';
        document.getElementById(id).textContent = `${id} white`;
        turn = true;
        chains(turn,id);
        xChains(turn, id);
    }
    validMove(turn);
    getScore();
  }

