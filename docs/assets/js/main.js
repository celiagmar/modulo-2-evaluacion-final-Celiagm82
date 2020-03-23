"use strict";const seriesInput=document.querySelector("#series-input"),searchButton=document.querySelector("#search-button"),seriesList=document.querySelector(".series-list"),favList=document.querySelector(".fav-list");let series=null;const imgAvatar="https://via.placeholder.com/210x295/",selectedSeries=readLocalStorage();function getApiInfo(){const e="http://api.tvmaze.com/search/shows?q="+seriesInput.value;fetch(e).then(e=>e.json()).then(e=>{series=e,renderSeries(series)})}function renderSeries(e){seriesList.innerHTML="";for(let t of e)null!==t.show.image?seriesList.innerHTML+=`<li id=${t.show.id} class='list-elem'><div class='img-container'><p>${t.show.name}</p><img src=${t.show.image.medium} alt='portada serie' title='Image serie'></div></li>`:seriesList.innerHTML+=`<li id=${t.show.id} class='list-elem'><div class='img-container'><p>${t.show.name}</p><img src=${imgAvatar} alt='portada serie' title='Image default'></div></li>`,addLiListeners()}function addLiListeners(){const e=document.querySelectorAll(".list-elem");for(let t of e)t.addEventListener("click",selectSerie)}function setLocalStorage(){localStorage.setItem("serieInfo",JSON.stringify(selectedSeries))}function readLocalStorage(){let e=JSON.parse(localStorage.getItem("serieInfo"));return null!==e?e:[]}function selectSerie(e){e.currentTarget.classList.add("favourite");const t=e.currentTarget.id,s=getSerieObject(t);-1===selectedSeries.indexOf(t)?(selectedSeries.push(s.show),setLocalStorage(),renderFav(selectedSeries)):alert("Esa serie ya está en favoritos")}function getSerieObject(e){for(let t of series)if(t.show.id===parseInt(e))return t}function renderFav(e){favList.innerHTML="";for(let t of e)null!==t.image?favList.innerHTML+=`<li id=${t.id}><img src=${t.image.medium}><span>${t.name}</span><button type='button' class='delete-btn'>x</button></li>`:favList.innerHTML+=`<li id=${t.id}><img src=${imgAvatar}><span>${t.name}</span><button type='button' class='delete-btn'>x</button></li>`}renderFav(selectedSeries),searchButton.addEventListener("click",getApiInfo);