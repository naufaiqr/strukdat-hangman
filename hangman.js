//insialisasi References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//pilih berdasarkan kelompok yang dipilih
let options = {
  fruits: [
    "Plum",
    "Avocado",
    "Persimmon",
    "Guava",
    "Pomegranate",
    "Watermelon",
  ],
  animals: [
    "Hedgehog",
    "Rhinoceros",
    "Squirrel",
    "Tiger",
    "Giraffe",
    "Butterfly",
  ],
  countries: [
    "Indonesia",
    "Mexico",
    "Singapore",
    "Switzerland",
    "Zimbabwe",
    "France",
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";
let lettersStack = [];

//menampilkan tombol opsi
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Pilih kategori</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block semua tombol
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable semua opsi
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all huruf
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Jika optionValue sesuai dengan tombol innerText highlight tombolnya
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //inisialisasi huruf yang disembunyikan, hapus kata sebelumnya
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //pilih kata random
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //ganti setiap huruf dengan span yang berisi dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //tampilkan setiap element sebagai span
  userInputSection.innerHTML = displayItem;

  // Reset letters stack 
  lettersStack = []; //kosong
};

//Inisialisasi Function (dipanggil ketikan memuat halaman/user menekan tombol new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Awalnya hapus semua konten dan sembunyikan huruf dan tombol baru
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //buat tombol huruf
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //tombol diklik
        button.addEventListener("click", () => {
          let charArray = chosenWord.split("");
          let dashes = document.getElementsByClassName("dashes");
          //Jika array berisi value yang diklik, ganti dash yang cocok dengan huruf
          if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
              //Jika huruf dalam array sama dengan tombol yang diklik
              if (char === button.innerText) {
                //ganti dash dengan huruf
                dashes[index].innerText = char;
                //increment counter
                winCount += 1;
                //if winCount sama dengan panjang kata
                if (winCount === charArray.length) {
                  resultText.innerHTML = `<h2 class='win-msg'>Yeayyy Congrats!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                  //block semua tombol
                  blocker();
                }
              }
            });
          } else {
            // Push huruf yang salah ke stack
            lettersStack.push(button.innerText);
            //lose count
            count += 1;
            //gambar orang
            drawMan(count);
            //Count == 6 karena terdiri dari kepala,badan, tangan kiri, tangan kanan, kaki kiri, kaki kanan
            if (count === 6) {
              resultText.innerHTML = `<h2 class='lose-msg'>OOW Try Again!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
          //disable tombol yang diklik
          button.disabled = true;
        });
        letterContainer.append(button);
      }
    
      displayOptions();
      //panggil canvasCreator (untuk menghapus kanvas sebelumnya dan membuat initial canvas)
      let { initialDrawing } = canvasCreator();
      //initialDrawing akan menggambar frame
      initialDrawing();
    };
    
    //Canvas
    const canvasCreator = () => {
      let context = canvas.getContext("2d");
      context.beginPath();
      context.strokeStyle = "#000";
      context.lineWidth = 2;
    
      //gamabr lines
      const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
      };
    
      const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
      };
    
      const body = () => {
        drawLine(70, 40, 70, 80);
      };
    
      const leftArm = () => {
        drawLine(70, 50, 50, 70);
      };
    
      const rightArm = () => {
        drawLine(70, 50, 90, 70);
      };
    
      const leftLeg = () => {
        drawLine(70, 80, 50, 110);
      };
    
      const rightLeg = () => {
        drawLine(70, 80, 90, 110);
      };
    
      //initial frame
      const initialDrawing = () => {
        //hapus canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //garis bawah
        drawLine(10, 130, 130, 130);
        //garis kiri
        drawLine(10, 10, 10, 131);
        //garis atas
        drawLine(10, 10, 70, 10);
        //garis atas kecil
        drawLine(70, 10, 70,);
        //garis atas kecil
        drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//gambar orang
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
