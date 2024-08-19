let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");  //reset button
let newGame = document.querySelector("#newGame");  //new game button
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); //winner msg

let turnX = true; //playerX

const winPatterns = [[0,1,2], [0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

const resetGame = () => {
    // turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {   //turnX === true 
            box.innerText = "X";
            turnX = false;   //shift to O
        } else {
            box.innerText = "O";
            turnX = true;    //shift back to X
        }
        box.disabled = true; //the occupied boxes cant be replaced with new var once filled.

        checkWinner();
    });
});

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;  //once the winner is gotten, all the boxes will be disabled
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;  //once the newGame/reset button is clicked, all the boxes will be enabled back
        box.innerText = "";    //clear the boxes back to empty
    }
}

const showWinner = (winner) => {
    msgContainer.classList.remove("hide"); //it now, displays the msg
    msg.innerText = `Congratulations! Winner is ${winner}`;
    disabledBoxes() ; 
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(pattern); //checks each elemet of main array
        // console.log([pattern[0]],[pattern[1]],[pattern[2]]); //checks pos of individual elements of sub-array
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText); //prints 0,X at that specific pos

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    };
};

newGame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
