// ボタンを生成

btnName = ["赤", "青", "黄", "緑", "黒"]
btnColor = ["red", "blue", "#ffd000", "green", "black"]

const stage = document.getElementById("stage")

const cols = 5
const rows = 4
const cellW = 500 / cols
const cellH = 400 / rows

const cells = []
for (let i = 0; i < cols * rows; i++){
  cells.push(i)
}

function button(index){
  const btn = document.createElement("button")

  btn.style.position = "absolute"

  const cx = index % cols
  const cy = Math.floor(index / cols)

  const btnWidth = 60
  const btnHeight = 40

  const offsetX = Math.random() * (cellW - btnWidth)
  const offsetY = Math.random() * (cellH - btnHeight)

  btn.style.left = cx * cellW + offsetX + "px"
  btn.style.top = cy * cellH + offsetY + "px"

  const nameIndex = Math.floor(Math.random() * btnName.length)
  const colorIndex = Math.floor(Math.random() * btnColor.length)

  btn.innerText = btnName[nameIndex]
  btn.style.color = btnColor[colorIndex]

  if (nameIndex !== colorIndex){
    btn.classList.add("incorrect")
  }else{
    btn.classList.add("correct")
  }

  btn.classList.add("btn-style")

  btn.style.visibility = "hidden" // 見えないようにしておく

  btn.addEventListener("click", handleClick)

  stage.appendChild(btn)
}

function setbtns() {
  for (let i = 0; i < cells.length; i++){
    button(cells[i])
  }
  checkCorrect()

  numOfC = document.querySelectorAll(".correct").length
  clickNumOfC = 0
}

function checkCorrect(){
  if(document.querySelectorAll(".correct").length === 0){
    document.querySelectorAll(".incorrect").forEach(el => el.remove());
    setbtns()
  }
}

// スタートボタン

async function start() {
  const btn = document.createElement("button")
  btn.id = "start"

  btn.innerHTML = "START " + "<span id='triangle'>" + "\u25B6" + " " + "\u25B6" + " " + "\u25B6" + "</span>"

  stage.appendChild(btn)

  btn.addEventListener("click", async () => {
    btn.remove()
    setbtns()

    await countdown()

    timerStart()
    countDisplay()
  })
}

async function countdown() {
  const label = document.createElement("h2")
  label.id = "num-c-btn"
  label.innerHTML = "正解のボタンの数は " + "<span id='btn-c'>" + numOfC + "</span>"
  stage.appendChild(label)

  const count = document.createElement("h2")
  count.id = "countdown"
  stage.appendChild(count);

  for (let i = 3; i >= 1; i--) {
    count.textContent = i;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  count.textContent = "START!";
  await new Promise(resolve => setTimeout(resolve, 1000));

  label.remove()
  count.remove()

  // ボタン出す
  document
    .querySelectorAll(".btn-style")
    .forEach(e => e.style.visibility = "visible");
}


start() // hoverの実装

// ボタンクリック

function handleClick(e) {
  if (e.target.classList.contains("incorrect")) {
    return IbtnClick(e.target)
  }
  if (e.target.classList.contains("correct")) {
    return CbtnClick(e.target)
  }
}

function IbtnClick(target){
  // 音を鳴らす
  target.remove() // 消すんじゃなくて、色を薄くか暗くしてボタンを下げたまんまにする
}

function CbtnClick(target){
  // 音を鳴らす
  target.remove()

  clickNumOfC++
  countDisplay()

  if (document.querySelectorAll(".correct").length === 0){
    document.querySelectorAll("button").forEach(el => el.remove())

    timerStop()

    start() // ←リスタートボタン作りたい。終わった感出したい（リザルト表示）
  }
}

// タイマー

let time = 0
let timer = null

function timerStart() {
  time = 0
  const timeDisplay = document.getElementById("timerDisplay")

  timer = setInterval(() => {
    time += 0.1
    timeDisplay.innerText = time.toFixed(1)
  }, 100)
}

function timerStop() {
  clearInterval(timer)
}

//正解の数表示

let numOfC = 0
let clickNumOfC = 0

function countDisplay() {
  const countDisplay = document.getElementById("countDisplay")
  countDisplay.innerText = `${clickNumOfC}/${numOfC}`
}

// スコアシステム作る。三回間違えるごとに一点マイナス


// 間違ったら配置を全て入れ替える（ハードモード）
// （連続間違いまたは総間違い回数によってペナルティとして減点もあり）