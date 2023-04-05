
import { update_input,obrisi_iz_kosarice, obrisi_elemente,izracunaj_narudzbu,update_ukupna_kolicina,produkt_u_kosarici2,dodaj_u_kosaricu,produkt_u_kosarici,ruta,promijeni_naslov_kategorije } from './pomocne_funkcije.js';
import { ispuni_tablicu } from './view_funkcije.js';
import { klik_na_karticu,onInput,onBrisi,onNaruci } from './event_funkcije.js';




export const obrada_event = ((kosarica=[],data)=>e=>{
   
    switch(e.detail.type){
        case 'ruta':
ruta(data,kosarica);
            break;
        case 'promijeni_naslov_kategorije':
            promijeni_naslov_kategorije(e.detail.naslov);
            break;
        case 'klik_na_karticu':
            const kartica = e.detail.kartica;
            klik_na_karticu(kartica,kosarica);
          
            break;
        case 'dodaj_u_kosaricu':
          const ob = e.detail.ob;
          kosarica=dodaj_u_kosaricu(ob,kosarica);
            break;
        case 'update_span':
          const span = e.detail.span;
          const id = e.detail.id;
          const u_kosarici=produkt_u_kosarici2(kosarica,id);
       
          const kolicina= kosarica[u_kosarici[1]].kolicina;
          span.classList.add("prikaz-span");
          span.textContent=kolicina;
            break;
        case 'update_ukupna_kolicina':
            update_ukupna_kolicina(kosarica);
            break;
        case 'napravi_tablicu':
            const html_tablica = e.detail.html;
            ispuni_tablicu(kosarica,onInput,onBrisi,onNaruci,html_tablica);
            break;
      
        case 'udate_kolicinu_u_kosarici':
            const id1 = e.detail.id;
            const value = e.detail.value;
            const ukupno_red =e.detail.ukupno_red;
            const ukupno_narudzba=e.detail.ukupno_narudzba;
const produkt_podaci=  produkt_u_kosarici2(kosarica,id1);
         
      if(produkt_podaci[0]){
        kosarica=update_input(produkt_podaci[1],value,kosarica);
              const ob = kosarica[produkt_podaci[1]];
 
      const ukupno = ob.kolicina*ob.cijena;
      ukupno_red.textContent=`${ukupno.toFixed(2)} €`;
      ukupno_narudzba.textContent =izracunaj_narudzbu(kosarica).toFixed(2)+ ' €'; 
     
      const obrada3 = new CustomEvent("obrada",{
        detail:{'type':'update_ukupna_kolicina'}
    })
    shop.dispatchEvent(obrada3);
    }
      
            break;
            case 'obrisi_redak':
                const id2 = e.detail.id;
                const red = e.detail.red;
                const product_podaci= produkt_u_kosarici2(kosarica,id2);
                const ukupno_narudzba2=e.detail.ukupno_narudzba;
                if(product_podaci[0]){
                    kosarica = obrisi_iz_kosarice(product_podaci[1],kosarica);
                   //  update_ukupna_kolicina();
                     ukupno_narudzba2.textContent =izracunaj_narudzbu(kosarica).toFixed(2)+ ' €'; 
                 red.remove();

                 const obrada3 = new CustomEvent("obrada",{
                    detail:{'type':'update_ukupna_kolicina'}
                })
                shop.dispatchEvent(obrada3);
                 }
                break;
                case 'naruci':
                    kosarica = [];

                    const obrada3 = new CustomEvent("obrada",{
                        detail:{'type':'update_ukupna_kolicina'}
                    })
                    shop.dispatchEvent(obrada3);
                     

                     alert("Narudžba poslana");
                     window.location.href="#/katalog/1";
                    break;
                
    };

})