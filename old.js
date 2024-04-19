// black always goes first
let turn = true;

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
    document.getElementById("score_b").innerText = `Score Black: ${arr[0]} `;
    document.getElementById("score_w").innerText = `Score White: ${arr[1]} `;
    return arr;
}

function chains3(turn, id) {
    turn = turn === true ? "white" : "black";
    console.log(turn)
    let row = id.charAt(0);
    let column = id.charAt(1);

    console.log(row, column)

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
    let start, end;
    // find start position
    for (let i = 0; i < takenRow.length; i++) {  
        if (takenRow[i].substring(3) === color) {
            start = i;
            break;
        }
    }
    // find end position
    for (let i = start; i < takenRow.length; i++) {
        if (takenRow[i].substring(3) === color) {
            end = i;
        }
    }
    console.log(`start: ${start} end: ${end} color: ${color}`)
    for (let i = start; i <= end; i++) {
        if (0 < i && i < 7) {
            if (takenRow[i-1].substring(3) !== "none" && takenRow[i].substring(3) !== "none" && takenRow[i+1].substring(3) !== "none") {
                let id = takenRow[i].substring(0,2);
                document.getElementById(id).className = "";
                document.getElementById(id).classList.add(color);
                document.getElementById(id).textContent = `${id} ${color}`;
            }
        }
        // change color of column
        let start2, end2;
        for (let i = 0; i < takenColumn.length; i++) {  
            if (takenColumn[i].substring(3) === color) {
                start2 = i;
                break;
            }
        }
        for (let i = start2; i < takenColumn.length; i++) {
            if (takenColumn[i].substring(3) === color) {
                end2 = i;
            }
        }
        console.log(`start: ${start2} end: ${end2} color: ${color}`)
        for (let i = start2; i <= end2; i++) {
            if (0 < i && i < 7) {
                if (takenColumn[i-1].substring(3) !== "none" && takenColumn[i].substring(3) !== "none" && takenColumn[i+1].substring(3) !== "none") {
                        let id = takenColumn[i].substring(0,2);
                        document.getElementById(id).className = "";
                        document.getElementById(id).classList.add(color);
                        document.getElementById(id).textContent = `${id} ${color}`;
                }
            }
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
        // change type from string to number so we can work with it later
        let column = +cell[1]; 
        
        if (cell === "a0" || cell === "a7" || cell === "h0" || cell === "h7") {
            // do nothing , these are corner cells.
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
    let currentScore = getScore();

    //console.log(validMove(turn));
    if (validMove(turn).length === 0) {
        if (currentScore[0] > currentScore[1]) {
            alert("Black wins, there are no more possible moves.")
        } else {
            alert("White wins, there are no more possible moves.")
        }
        
    }
    if (turn && validMove(turn).includes(id)){
        document.getElementById(id).className = "";
        document.getElementById(id).classList.add("black");
        document.getElementById(id).classList.add("clicked");
        //document.getElementById(id).style.backgroundColor = 'black';
        document.getElementById(id).textContent = `${id} black`;
        turn = false;
        chains3(turn,id);
    } else if (validMove(turn).includes(id)){

        document.getElementById(id).className = "";
        document.getElementById(id).classList.add("white");
        document.getElementById(id).classList.add("clicked");
        //document.getElementById(id).style.backgroundColor = 'white';
        document.getElementById(id).textContent = `${id} white`;
        turn = true;
        chains3(turn,id);
    }
    //validMove(turn);
    getScore();
  }

