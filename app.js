
async function loadMatches() {

  const container = document.getElementById("matches");
  container.innerHTML = "加载中...";

  try {

    const res = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024&next=10", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fefab55904msh780884d8c3ac961p131ff3jsna0165d37ce32",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await res.json();

    const matches = data.response;

    container.innerHTML = "";

    matches.forEach(m => {

      const home = m.teams.home.name;
      const away = m.teams.away.name;

      const odds_home = 2.10;
      const odds_draw = 3.20;
      const odds_away = 3.50;

      const p_home = 1 / odds_home;
      const p_draw = 1 / odds_draw;
      const p_away = 1 / odds_away;

      const total = p_home + p_draw + p_away;

      const ai_home = p_home / total;

      const market = 0.33;

      const value = ai_home - market;

      let level = "🔴 C级（不推荐）";

      if (value > 0.08) {
        level = "🟢 A级（强推荐）";
      } else if (value > 0.03) {
        level = "🟡 B级（可小注）";
      }

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h3>${home} vs ${away}</h3>
        <p>AI胜率: ${(ai_home * 100).toFixed(1)}%</p>
        <p>Value: ${value.toFixed(3)}</p>
        <h4>${level}</h4>
      `;

      container.appendChild(div);
    });

  } catch (e) {
    console.log(e);
    container.innerHTML = "❌ 数据加载失败（API或网络问题）";
  }
}

loadMatches();
