export function getcart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

export function savecart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addtocart(product) {
    const cart = getcart();
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            cart[i].qty = cart[i].qty + 1;
            found = true;
            break;
        }
    }

   
    if (found===false) {
        cart.push({
            id: product.id,
            brand:product.brand,
            name: product.name,
            price: product.price,
            image:product.image,
            qty: 1
        });
    }
    savecart(cart);
}

export function updateqty(id, qty) {
    const cart = getcart();
    const newcart = [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            if (qty > 0) {
                cart[i].qty = qty;
                newcart.push(cart[i]);
            }
        }
        else{
            newcart.push(cart[i]);
        }
    }

    savecart(newcart);

}

export function removeitem(id){
    const cart=getcart();
    const newcart=[];

    for(let i=0;i<cart.length;i++){
        if(cart[i].id!==id){
            newcart.push(cart[i]);
        }
    }
    savecart(newcart);
}

export function gettotal(){
    const cart=getcart();
    let total =0;

    for(let i=0;i<cart.length;i++){
        total=total + cart[i].price*cart[i].qty;
    }
    return total;
}