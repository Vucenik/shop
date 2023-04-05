/*
shop.js
Shop
Vlatko Vučenik
Last Modified:4.04.2023 
*/ 

import {data} from './data.js';
import { obrisi_elemente } from './pomocne_funkcije.js';
import { obrada_event } from './event.js';
import {napravi_katalog} from './view_funkcije.js';

// kreiramo novi centar za obradu eventa za jefitini relej
let kosarica =localStorage.hasOwnProperty('kosarica')?JSON.parse( localStorage.getItem("kosarica")):[];
window.shop= new EventTarget();
window.shop.addEventListener('obrada',obrada_event(kosarica,data));



window.addEventListener("hashchange",e=>{
    const obrada = new CustomEvent("obrada",{
        detail:{'type':'ruta'}
    })
    shop.dispatchEvent(obrada);
})


// init stranice
 const kategorije = document.getElementById("kategorije");

window.location.hash="#";
window.location.hash="#/katalog/3";
//update_ukupna_kolicina();
obrisi_elemente(kategorije);
napravi_katalog(data.categories,kategorije);

const obrada = new CustomEvent("obrada",{
    detail:{'type':'update_ukupna_kolicina'}
})
shop.dispatchEvent(obrada);


