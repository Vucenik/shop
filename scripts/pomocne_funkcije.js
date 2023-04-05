import { napravi_karticu} from './napravi_karticu.js';

 ////////////////
 export const promijeni_naslov_kategorije=(naslov)=>{
    const naslov_kategorija = document.getElementById("naslov_kategorija");
    naslov_kategorija.textContent=naslov;
};
/////////////
export const obrisi_elemente = kontejner=>{
    while(kontejner.firstElementChild){
        kontejner.firstElementChild.remove();

    }
};


export const izracunaj_narudzbu=(kosarica=[])=>{
    return kosarica.reduce((ak,val)=>{
        return ak+(val.cijena*val.kolicina);
    },0)
}

export const izracunaj_kolicinu = (kosarica=[])=>{
    return kosarica.reduce((ak,val)=>{
        return ak+val.kolicina;
    
    },0)}

export const update_ukupna_kolicina =(kosarica)=>{
        const cart_span= document.getElementById("cart-span");
        const ukupna_kolicina = izracunaj_kolicinu(kosarica);
        cart_span.textContent=ukupna_kolicina;
        const kosarica_json = JSON.stringify(kosarica);
        localStorage.setItem("kosarica",kosarica_json);
    } 
   export  const produkt_u_kosarici2 = (kosarica=[],id_product)=>{
        let rezultat=[false];
        for(let i=0;i<kosarica.length;i++){
            if(id_product===kosarica[i].id_product){
                rezultat=[true,i];
                break;
            }
        }
        return rezultat;
    }

   
export const dodaj_u_kosaricu = (ob,kosarica=kosarica)=>{
    
    const u_kosarici =produkt_u_kosarici2(kosarica,ob.id_product);
    if(u_kosarici[0]){
       const nova_kosarica = [...kosarica];
       nova_kosarica[u_kosarici[1]].kolicina=nova_kosarica[u_kosarici[1]].kolicina +1;
      // return [...kosarica,{...kosarica[u_kosarici[1]],kolicina:kosarica[u_kosarici[1]].kolicina+1}];
      return nova_kosarica;
     
    }else{
   
       return [...kosarica,{name:ob.name,cijena:ob.cijena,id_product:ob.id_product,kolicina:1}];
    }
   
         
   } 

   
export const produkt_u_kosarici = (kosarica=[],id_product)=>{
    let rezultat=[false];
    for(let i=0;i<kosarica.length;i++){
        if(id_product===kosarica[i].id_product){
            rezultat=[true,kosarica[i].kolicina];
            break;
        }
    }
    return rezultat;
}

/// ruta
export const ruta =(data,kosarica)=>{
    const ruta = window.location.hash.split('/');
    const index=Number.parseInt( ruta[2])-1;
    const katalog = data.categories;
   
    if(ruta[1]==='katalog'&&index>=0){
      
        const products =katalog[index].products.map((product,i)=>(Object.assign(product,{id_product:`${katalog[index].name}-${index}-${i}`})));
 
   const obrada = new CustomEvent("obrada",{
    detail:{'type':'promijeni_naslov_kategorije','naslov':katalog[index].name}
})
shop.dispatchEvent(obrada);
       

       
        const kontejner_proizvoda=document.getElementById("kontejner_proizvoda");
         obrisi_elemente(kontejner_proizvoda);
        for (const product of products){

       
        const u_kosarici = produkt_u_kosarici(kosarica,product.id_product);

     
        const kartica = napravi_karticu(product,u_kosarici);
        kontejner_proizvoda.appendChild(kartica);
      
    }
}
    if(ruta[1]==='cart.html'){
      
        const obrada = new CustomEvent("obrada",{
            detail:{'type':'promijeni_naslov_kategorije','naslov':'Košarica'}
        })
        shop.dispatchEvent(obrada);

        naslov_kategorija.textContent='Košarica';

        obrisi_elemente(kontejner_proizvoda);
     
       fetch(ruta[1])
       .then(x=>x.text())
       .then(x=>{
      
        const obrada5 = new CustomEvent("obrada",{
            detail:{'type':'napravi_tablicu','html':x}
        })
        shop.dispatchEvent(obrada5);
        return x

    })
     
       .catch(x=>console.log(x));
        
    }
    }

    export const update_input=(id,val,kosarica)=>{
        const update_kosarica=[...kosarica];
           update_kosarica[id].kolicina=val;
        return update_kosarica;    
    
    }

    
   export  const obrisi_iz_kosarice = (index,kosarica)=>{
        return kosarica.filter((el,i)=>{
           return i!==index;
       });
     
   }