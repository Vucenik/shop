export const napravi_karticu=(products,u_kosarici=[false])=>{
    const fragment = document.createDocumentFragment();
    const figure = Object.assign(document.createElement('figure'),{
        className:"proizvod"
    });
    const div =Object.assign( document.createElement('div'),{
        className:"flip"
    });
    const button =document.createElement('button');
    button.addEventListener('click',e=>{
        const obrada = new CustomEvent("obrada",{
            detail:{'type':'klik_na_karticu','kartica':e.currentTarget}
        })
        shop.dispatchEvent(obrada);
    });
    Object.defineProperty(button,'product',
        {
            value:products
        }
    );
    const img=Object.assign(document.createElement('img'),{
        src:"./images/"+products.image,
        alt:products.name
    })
    div.appendChild(button);
    div.appendChild(img);
    //produkt_u_kosarici(kosarica,products.id_product);
    const figcaption= document.createElement('figcaption');
    const span1=document.createElement('span');
    span1.textContent=products.name;
    const span2 = document.createElement('span');
    span2.textContent=products.cijena+" €";
    const span3 = document.createElement('span');
    span3.textContent=u_kosarici[0]&&u_kosarici[1]>0?u_kosarici[1]:"";
    if(u_kosarici[0]&&u_kosarici[1]>0)span3.classList.add("prikaz-span");
    figcaption.appendChild(span1);
    figcaption.appendChild(span2);
    figcaption.appendChild(span3);
    figure.appendChild(div);
    figure.appendChild(figcaption);
    fragment.appendChild(figure);
    
    return figure;




}