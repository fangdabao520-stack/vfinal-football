
async function loadMatches() {

  const url = "https://api-football-v1.p.rapidapi.com/v3/odds";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "YOUR_API_KEY",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }
  });

  const data = await response.json();

  const matches = data.response.slice(0, 5); // 只取5场

  const container = document.getElementById("matches");

  matches.forEach((m, i) => {

    const home = m.home_team || "Home";
    const away = m.away_team || "Away";

    const odds = m.bookmakers?.[0]?.bets?.[0]?.values?.[0]?.odd || 2.0;

    const value = (1 / odds) - 0.5;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${home} vs ${away}</h3>
      <p>赔率: ${odds}</p>
      <p>Value: ${value.toFixed(3)}</p>
      <button onclick="alert('模拟下注')">下注</button>
    `;

    container.appendChild(div);
  });
}

loadMatches();
