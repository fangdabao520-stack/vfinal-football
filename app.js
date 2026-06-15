const worldCupMatches = [
  { home: "Germany", away: "Japan" },
  { home: "France", away: "Brazil" },
  { home: "Spain", away: "England" },
  { home: "Argentina", away: "Italy" }
];

function getOdds() {
  return {
    home: (1.8 + Math.random() * 1.5).toFixed(2),
    draw: (3.0 + Math.random() * 1.5).toFixed(2),
    away: (2.0 + Math.random() * 2.0).toFixed(2),
  };
}

function calcAI(homeOdds, drawOdds, awayOdds) {
  const pH = 1 / homeOdds;
  const pD = 1 / drawOdds;
  const pA = 1 / awayOdds;

  const sum = pH + pD + pA;

  return {
    home: pH / sum,
    draw: pD / sum,
    away: pA / sum
  };
}

function render() {
  const container = document.getElementById("matches");
  const status = document.getElementById("status");

  container.innerHTML = "";
  status.innerText = "✔ 世界杯数据已加载（模拟稳定版）";

  worldCupMatches.forEach(match => {

    const odds = getOdds();
    const ai = calcAI(odds.home, odds.draw, odds.away);

    const market = 0.33;
    const value = ai.home - market;

    let level = "🔴 C级（不推荐）";
    if (value > 0.08) level = "🟢 A级（强推荐）";
    else if (value > 0.03) level = "🟡 B级（可小注）";

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h2>${match.home} vs ${match.away}</h2>

      <p>赔率: 主 ${odds.home} / 平 ${odds.draw} / 客 ${odds.away}</p>

      <p>AI主胜概率: ${(ai.home * 100).toFixed(1)}%</p>

      <p>Value: ${value.toFixed(3)}</p>

      <h3>${level}</h3>

      <button onclick="alert('模拟下注成功')">下注</button>
    `;

    container.appendChild(div);
  });
}

render();
