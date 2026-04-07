let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;   //playerX, playerO
let playerO = [];
let playerX = [];
let selectedBox = null; // for shifting move

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    playerO = [];
    playerX = [];
    selectedBox = null;

    enableBoxes();
    msgContainer.classList.add("hide");

    boxes.forEach(box => {
        box.style.backgroundColor = "#ffffc7";
    });
};



boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        let currentPlayer = turnO ? "O" : "X";
        let currentArray = turnO ? playerO : playerX;

        // 🟢 CASE 1: Player has less than 3 moves → normal play
        if (currentArray.length < 3) {
            if (box.innerText === "") {
                box.innerText = currentPlayer;
                currentArray.push(index);
                turnO = !turnO;
                checkWinner();
            }
            return;
        }

        // 🔵 CASE 2: Player has 3 moves → SHIFT MODE

        // Step 1: Select your own box
        if (selectedBox === null) {
            if (box.innerText === currentPlayer) {
                selectedBox = index;
                box.style.backgroundColor = "yellow"; // highlight
            }
        }
        // Step 2: Move to empty box
        else {
            if (box.innerText === "") {

                // remove old
                boxes[selectedBox].innerText = "";
                boxes[selectedBox].style.backgroundColor = "#ffffc7";

                // update array
                let pos = currentArray.indexOf(selectedBox);
                currentArray[pos] = index;

                // place new
                box.innerText = currentPlayer;

                selectedBox = null;
                turnO = !turnO;

                checkWinner();
            }
        }
    });
});


const disableBoxes = (() => {
    for(let box of boxes){
        box.disabled = true;
    }
})


const enableBoxes = (() => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
})


const showWinner = (winner) => {
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = (() => {
    for(let pattern of winPatterns){3
        
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

         if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
         }
    }

})

newGameBtn.addEventListener("click" , resetGame);
resetbtn.addEventListener("click" , resetGame);
