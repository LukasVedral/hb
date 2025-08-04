const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/api/rocniks?populate=*`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('rocniky');
    data.data.forEach(item => {
      const rocnik = item.attributes;
      const div = document.createElement('div');
      div.className = 'rocnik';

      div.innerHTML = `
        <h2>${rocnik.nazev_ročníku}</h2>
        <p>${rocnik.úvodní_text}</p>
        <ul>
          ${rocnik.vysledky_kategorie?.map(kat => `
            <li><a href="${kat.odkaz_na_vysledky}" target="_blank">${kat.nazev_kategorie}</a></li>
          `).join('')}
        </ul>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error('Chyba při načítání:', err));