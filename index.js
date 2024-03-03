//constants and variables
let snakeMovingDirection = {
  x: 0,
  y: 0,
};
let speed = 5;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];

let food = {
  x: 9,
  y: 12,
};

let score = 0;


 var boardbtn = document.getElementsByClassName("board");
    infobox = document.createElement("div");
    infobox.style.width = "230px";
    infobox.style.height = "30px";
    infobox.style.fontSize = "27px";
    infobox.style.borderRadius = "20px";
    infobox.style.padding = "25px";
    // infobox.style.backgroundColor = "rgba(56, 2, 2, 0.331)";
    infobox.style.backgroundColor = "#F5F5DC";
    infobox.style.border = "2px double black";
    infobox.style.position = "fixed";
    infobox.style.top = "80px";
    infobox.innerHTML = `Get Ready to start!!`;
    document.body.appendChild(infobox);
    setTimeout(()=>{
      document.body.removeChild(infobox)}

      ,2000);

// game functions
const defaultspeedcase = () => {
  let newbg = document.getElementsByClassName("board");
  for (let i = 0; i < newbg.length; i++) {
    newbg[i].style.backgroundImage="url('https://i.pinimg.com/564x/ab/dd/09/abdd091d76d064c661d88ecc24e612bc.jpg')"
      // "url('https://i.pinimg.com/564x/53/5c/f5/535cf59574d109195b632bd57ced3c3f.jpg')";
    newbg[i].style.backgroundPosition = "center";
    newbg[i].style.backgroundRepeat = "no-repeat";
    newbg[i].style.backgroundSize = "cover";
    newbg[i].style.border = "1px solid black";
  }
  speed = 5;
};

const mediumspeedcase = () => {
  let newbg = document.getElementsByClassName("board");
  for (let i = 0; i < newbg.length; i++) {
    newbg[i].style.backgroundImage =
      "url('https://i.pinimg.com/564x/41/2b/ed/412bed86d89e644d9a4430ad1b6769b9.jpg')";
    newbg[i].style.backgroundRepeat = "no-repeat";
    newbg[i].style.backgroundSize = "cover";
    newbg[i].style.border = "1px solid black";
  }
  speed = 10;
};

const highspeedcase = () => {
  let newbg = document.getElementsByClassName("board");
  for (let i = 0; i < newbg.length; i++) {
    newbg[i].style.backgroundImage =
      "url('https://i.pinimg.com/564x/4d/1f/5d/4d1f5d9e0711697ba2bf9ab95630d6b9.jpg')";

    //  newbg[i].style.backgroundImage="url('https://i.pinimg.com/564x/de/0c/95/de0c958918c3b2b28111af58b7ada2ce.jpg')";
      newbg[i].style.backgroundRepeat = "no-repeat";
      newbg[i].style.backgroundSize = "cover";
    newbg[i].style.border = "1px solid black";
    newbg[i].style.backgroundPosition = "center";
  }
  speed = 25;
};

const main = (currtime) => {
  window.requestAnimationFrame(main);
  if ((currtime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = currtime;
  gameEngine();
};

const collapse = (snakecoll) => {
  for (let i = 1; i < snakecoll.length; i++) {
    if (
      snakecoll[i].x === snakecoll[0].x &&
      snakecoll[i].y === snakecoll[0].y
    ) {
      return true;
    }
  }
  if (
    snakecoll[0].x >= 19 ||
    snakecoll[0].x <= 0 ||
    snakecoll[0].y >= 19 ||
    snakecoll[0].y <= 0
  ) {
    return true;
  }
};

const gameEngine = () => {
  // -------------------------------------------
  if (collapse(snakeArr)) {
    snakeMovingDirection = { x: 0, y: 0 };
    alert("Oops!Game Over. Press any key to play again");
    var boardbtn = document.getElementsByClassName("board");
    alertbox = document.createElement("div");
    alertbox.style.width = "200px";
    alertbox.style.height = "70px";
    alertbox.style.fontSize = "27px";
    alertbox.style.borderRadius = "20px";
    alertbox.style.padding = "25px";
    // alertbox.style.backgroundColor = "rgba(56, 2, 2, 0.331)";
    alertbox.style.backgroundColor = "#F5F5DC";
    alertbox.style.border = "2px double black";
    alertbox.style.position = "fixed";
    alertbox.style.top = "80px";
    alertbox.innerHTML = `Oops! Game Over  Score: ${score}`;
    document.body.appendChild(alertbox);
    setTimeout(()=>{document.body.removeChild(alertbox)},2000);
    snakeArr = [{ x: 13, y: 15 }];
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    snakeArr.unshift({
      x: snakeArr[0].x + snakeMovingDirection.x,
      y: snakeArr[0].y + snakeMovingDirection.y,
    });
    let min = 3;
    let max = 15;
    food = {
      x: Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2,
      y: Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2,
    };
    score = score + 1;
    let scoreborad = document.getElementById("scoreboardbox");
    scoreborad.innerHTML = `Score: ${score}`;
  }

  //-----------------------------------------
  var boardbtn = document.getElementsByClassName("board");
  boardbtn[0].innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    boardbtn[0].appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  boardbtn[0].appendChild(foodElement);

  //---------------------------------------------
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += snakeMovingDirection.x;
  snakeArr[0].y += snakeMovingDirection.y;
};

// logic starts
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  snakeMovingDirection = {
    x: 0,
    y: 1,
  };
  switch (e.key) {
    case "ArrowUp":
      snakeMovingDirection.x = 0;
      snakeMovingDirection.y = -1;
      break;
    case "ArrowDown":
      snakeMovingDirection.x = 0;
      snakeMovingDirection.y = 1;
      break;
    case "ArrowLeft":
      snakeMovingDirection.x = -1;
      snakeMovingDirection.y = 0;
      break;
    case "ArrowRight":
      snakeMovingDirection.x = 1;
      snakeMovingDirection.y = 0;
      break;
    default:
      alert("press correct key!!");
      break;
  }
});


