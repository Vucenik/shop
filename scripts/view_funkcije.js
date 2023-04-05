//pomočna funkcija napravi katalog

import {obrisi_elemente,izracunaj_narudzbu} from "./pomocne_funkcije.js";
export const napravi_katalog=(data=[{name:""}],id_kontejner_kataloga)=>{
    const napravi_li=(ime_kategorije="",id_kategorije=1)=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent=ime_kategorije;
        a.setAttribute("href",`#/katalog/${id_kategorije+1}`);
        li.appendChild(a);
        return li;
    }

    data.forEach((ob,i)=>{
        id_kontejner_kataloga.appendChild(napravi_li(ob.name,i))
    });

}



export const ispuni_tablicu = (kosarica=[],onInput=()=>{},onBrisi=()=>{},onNaruci=()=>{},tablica)=>{

    const tablica_fragment =document.createDocumentFragment();
    
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend',tablica);
    
 
    tablica_fragment.appendChild(div);
    
    const kontejner_tablica=tablica_fragment.getElementById('kontejner_tablica');
    
    obrisi_elemente(kontejner_tablica);
    for (const ob of kosarica){
    const tr= document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent=ob.name;
    tr.appendChild(td1);
    const td2=document.createElement("td");
    td2.textContent=`${ob.cijena} €`;
    tr.appendChild(td2);
    const td3 = document.createElement("td");
    const input = Object.assign(document.createElement('input'),{
        type:'number',
        name:'kolicina',
        min:'1',
        max:'9999',
        value:ob.kolicina,
       
    });
    input.addEventListener('input',onInput);
    input.dataset.id=ob.id_product;
    td3.appendChild(input);
    tr.appendChild(td3);
    const td4=document.createElement('td');
    const ukupno = ob.kolicina*ob.cijena;
    td4.textContent=`${ukupno.toFixed(2)} €`;
    tr.appendChild(td4);
    
    
    
    const td5=document.createElement("td");
    const button = document.createElement("button");
    button.dataset.id= ob.id_product;
    button.addEventListener("click",onBrisi);
    button.textContent='Briši'
    td5.appendChild(button);
    tr.appendChild(td5);
    
    
    
    
    kontejner_tablica.appendChild(tr);
    
    
    }
    
    tablica_fragment.getElementById("tablica_ukupno").textContent = izracunaj_narudzbu(kosarica).toFixed(2)+ ' €';
    tablica_fragment.getElementById("tablica_naruci").addEventListener('click',onNaruci);
    kontejner_proizvoda.appendChild(tablica_fragment);
    console.log(tablica_fragment);
    
    
    
    }



