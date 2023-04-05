
export const klik_na_karticu = (kartica,kosarica)=>{
  
    const obrada = new CustomEvent("obrada",{
        detail:{'type':'dodaj_u_kosaricu','ob':kartica.product,}
    })
    shop.dispatchEvent(obrada);

  
    const span_element =  kartica.parentElement.parentElement.children[1].children[2];
    
    const obrada2 = new CustomEvent("obrada",{
        detail:{'type':'update_span','span':span_element,'id':kartica.product.id_product}
    })
    shop.dispatchEvent(obrada2);
    
   
    const obrada3 = new CustomEvent("obrada",{
        detail:{'type':'update_ukupna_kolicina'}
    })
    shop.dispatchEvent(obrada3);

}

export const onInput=e=>{
    const id= e.currentTarget.dataset.id;
    const value =Number.parseInt( e.currentTarget.value);
    const ukupno_red =  e.currentTarget.parentElement.nextSibling;
const narudzba_ukupno =  e.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1];
  const obrada = new CustomEvent("obrada",{
    detail:{'type':'udate_kolicinu_u_kosarici','id':id,'value':value,'ukupno_red':ukupno_red,'ukupno_narudzba':narudzba_ukupno}
})
shop.dispatchEvent(obrada);


}



export const onBrisi = e=>{

const id = e.currentTarget.dataset.id;
const red = e.currentTarget.parentElement.parentElement;
const narudzba_ukupno =  e.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1];
const obrada = new CustomEvent("obrada",{
    detail:{'type':'obrisi_redak','id':id,'red':red,'ukupno_narudzba':narudzba_ukupno}
})
shop.dispatchEvent(obrada);

}
////////////
export const onNaruci = e=>{

const obrada = new CustomEvent("obrada",{
    detail:{'type':'naruci'}
})
shop.dispatchEvent(obrada);


}



