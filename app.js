const matches = window.matches;

const container = document.getElementById("matches");
const summary = document.getElementById("summary");

let scores = [];

// 初始化比赛卡片
matches.forEach((m, i) => {

  scores[i] = { s: 0, m: 0, r: 0 };

  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h3>${m.name}</h3>

    <button onclick="setS(${i},2)">结构 +2</button>
    <button onclick="setS(${i},1)">结构 +1</button>
    <button onclick="setS(${i},0)">结构 0</button>

    <button onclick="setM(${i},2)">市场 +2</button>
    <button onclick="setM(${i},0)">市场 0</button>
    <button onclick="setM(${i},-2)">市场 -2</button>

    <button onclick="setR(${i},0)">风险 0</button>
    <button onclick="setR(${i},1)">风险 -1</button>
    <button onclick="setR(${i},3)">风险 -3</button>

    <button onclick="calc(${i})">计算结果</button>

    <div id="r${i}"></div>
  `;

  container.appendChild(div);
});

// 设置值
function setS(i,v){ scores[i].s = v; }
function setM(i,v){ scores[i].m = v; }
function setR(i,v){ scores[i].r = v; }

// 计算核心评分
function calc(i){

  const total = scores[i].s + scores[i].m - scores[i].r;

  let result = "";

  if(total >= 4){
    result = "🟢 A级（可下注）";
  } else if(total >= 2){
    result = "🟡 B级（小注）";
  } else {
    result = "🔴 C级（不做）";
  }

  document.getElementById("r"+i).innerHTML =
    `Score: ${total} <br> ${result}`;

  renderSummary();
}

// 汇总统计
function renderSummary(){

  let a=0,b=0,c=0;

  scores.forEach(x=>{
    const t = x.s + x.m - x.r;

    if(t>=4)a++;
    else if(t>=2)b++;
    else c++;
  });

  summary.innerHTML = `
    🟢 A级：${a} 场<br>
    🟡 B级：${b} 场<br>
    🔴 C级：${c} 场
  `;
}