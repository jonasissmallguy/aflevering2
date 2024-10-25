//Loader og displayer first top 10 albums
//async tillader funktionen er asyknrokisk, og vi kan fetch data uden, at skulle gå videre vha. await. 
//async tillader await, som er godt når vi skal have data ind. 
async function displayFavAlbums() {

  const response = await fetch('data/albums.json'); //await til at ikke gå videre før, at vi har fået data'en
  const albums = await response.json(); //laver response til et JS object. 

  //dom selector af vores tbody i favsongs.html
  const tableBody = document.getElementById('predefined-songs-data');

  // slicer  0-10, for hver album hodler vi denes properties: albumName, artistName, artistWebsite, ProductioNYear,Tracklsit
  // index er fx. 0,1,2,3 - altså positionen, denbne bruger vi senere til at indsætte. Vent og se!
  albums.slice(0, 10).forEach((album, index) => {

      //laver const med album, tjekker om album tracklist eksiterer, hvis ja så længden, hvis nej så 0. ? tjekker om eksiterer
      const trackCount = album.trackList ? album.trackList.length : 0;

      const row = document.createElement('tr'); //laver tablerow
      //get row's innerhtml og assigner værdier table data vha $album og trackCount
      row.innerHTML = ` 
          <td>${album.albumName}</td>
          <td>${album.artistName}</td>
          <td>${trackCount}</td>
          <td>${album.productionYear}</td>
      `;

      //assigner rows til tableBody
      tableBody.appendChild(row);
      
      //ved click på row ('tr'), så kalder vi helperfunction
      //arrow function, hvor vi kalder vores funktion toogleTraacksVislibility med index og album.trackList array af objekter
      row.addEventListener('click', () => toggleTracksVisibility(index, album.trackList));

      //laver trackRows variabel, der laver table row
      const trackRow = document.createElement('tr'); 
      trackRow.classList.add('track-list-row');  //laver alle trackRows til klassen track-list-row
      trackRow.style.display = 'none'; //deafaulter til skjul
      
      //tager trackRow's intterHTML og generer til tabledata og laver den colunne bredde på 15. 
      //herefter bruger vi unordererd list og indsætter indeks, 0,1,2,3 osv. ind i vores 
      trackRow.innerHTML = ` 
          <td colspan="15"> 
              <ul id="track-list-${index}"></ul>
          </td>
      `;

      //tilføjer hver trackRow til vores fælles tableBody / predefined-song-data (id)
      tableBody.appendChild(trackRow);
  });
}

//hovedet tager to argumenter vores index, og vores array af tracklist objekter, sae albums.json, 
function toggleTracksVisibility(albumIndex, trackList) {
  // DOM selector, her selecter vi track-list og alle dens siblings, vi insætter 
  const trackRow = document.querySelector(`.track-list-row:nth-child(${albumIndex * 2 + 2})`);
  const trackListContainer = document.getElementById(`track-list-${albumIndex}`);
  
  // strictly, at vi ikke viser vores rows. 
  if (trackRow.style.display === 'none') {
      // Vis tracklist
      trackRow.style.display = ''; //styler med blank style
      if (trackListContainer.childElementCount === 0) { //hvis ingen child elements i trackListContainer
          trackList.forEach(x => { //for hver sang
              const trackItem = document.createElement('li'); //dom laver li 
              trackItem.textContent = `${x.trackNumber}. ${x.trackTitle}`; //sætter hver track til nummer. tracktilte, string
              trackListContainer.appendChild(trackItem); //appender til trackListContianer
          });
      }
  } else {
      // Skjul tracklist
      trackRow.style.display = 'none'; //sætter css style display :none  - inner line css
  }
}

displayFavAlbums();
