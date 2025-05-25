/*
Next Café
NEXT Members:
Quizon, FR
Belen, Mariane
Banasan, Nicolas
*/

//Login
const valUser = ["admin", "ewanmuna", "Next123"];
const valPassword = ["NextTimePo"];

let username = prompt("Enter Username: ");
let password = prompt("Enter Pasword: ");

while (!valUser.includes(username) || !valPassword.includes(password)){
    alert("Invalid or Incorrect Password or Username! Try Again!");
    username = prompt("Enter Username: ");
    password = prompt("Enter Pasword: ");
}
alert("Welcome to the Next Cafe!");

//NEXT Café Menu
let menu = {
    Coffee: {
        "Americano": { price: 45, stock: 100 },
        "Cappuccino": { price: 60, stock: 100 },
        "Mocha": { price: 50, stock: 100 },
        "Espresso": { price: 30, stock: 100 },
        "Latte": { price: 40, stock: 100 }
    },
    Desserts: {
        "Strawberry Shortcake": { price: 120, stock: 75 },
        "Tiramisu Shortcake": { price: 130, stock: 75 },
        "Macarons": { price: 10, stock: 100 },
        "Brownies": { price: 15, stock: 75 },
        "Cupcakes": { price: 20, stock: 100 }
    },
    IceCream: {
        "Vanilla IceCream": { price: 25, stock: 60 },
        "Strawberry IceCream": { price: 30, stock: 60 },
        "Cookies and Cream IceCream": { price: 35, stock: 60 },
        "Chocolate IceCream": { price: 40, stock: 60 },
        "Cheese IceCream": { price: 45, stock: 60 }
    },
    Beverages: {
        "Grape Juice": { price: 15, stock: 90 },
        "Orange Juice": { price: 20, stock: 90 },
        "Apple Juice": { price: 25, stock: 90 },
        "Leafy Green": { price: 30, stock: 90 },
        "Pearl and Cucumber": { price: 35, stock: 90 }
    }
};
//Displaying Menu
console.log("Cafe Menu");
for (let category in menu) {
    console.log(`\n${category}`);
    for (let item in menu[category]) {
        let number = menu[category][item];
        console.log(`${item} - ${number.price} PHP`);
    }
}

// Order 
cart = [];
order();
function order() {
    let run = true;
    while (run) {
        let choose = prompt("Choose the following options:\n1. Add To Cart\n2. Remove Item\n3. Receipt\n4. Cancel");

        switch (choose) {
            //Adding to cart
            case "1":
                add();
                break;
            //Removing Item
            case "2":
                removeItem();
                break;
            //Displaying Reciept
            case "3":
                if (cart.length === 0) {
                    alert("Your Cart is Empty.");
                    continue;
                }

                let print;
                do {
                    print = prompt("Print a Receipt? (y/n):").toLowerCase();
                    if (print !== "y" && print !== "n") {
                        alert("Invalid. Must be y or n.");
                    }
                } while (print !== "y" && print !== "n");

                if (print === "y") {
                    let mess = "---NEXT Café---\nRECEIPT\n";
                    let total = 0;

                    for (let i = 0; i < cart.length; i++) {
                        let item = cart[i];
                        let itemTot = item.price * item.quantity;
                        total += itemTot;
                        mess += `${item.name} (${item.quantity} x ${item.price} PHP = ${itemTot} PHP)\n`;
                    }

                    mess += `\nTotal: ${total} PHP\n`;
                    mess += "---------------\n\n";
                    console.log(mess);

                    let checkout;
                    do {
                        checkout = prompt("Proceed to Checkout? (y/n):").toLowerCase();
                        if (checkout !== "y" && checkout !== "n") {
                            alert("Invalid. Must be y or n.");
                        }
                    } while (checkout !== "y" && checkout !== "n");

                    if (checkout === "y") {
                        alert("Proceed to the Cashier to pay your order.")
                        alert("Thank You. Come Again!")
                        run = false;   
                    } else {
                        alert("Returning to Menu...")
                        continue;
                    }
                } else {
                    alert("Returning to Menu...");
                    continue;
                }
                break;

            //Cancelling order
            case "4":
                if (cart.length !== 0) {
                    let cancel;
                    do {
                        cancel = prompt("Do you want to Cancel the Order? (y/n):").toLowerCase();
                        if (cancel !== "y" && cancel !== "n") {
                            alert("Invalid. Must be y or n.");
                        }
                    } while (cancel !== "y" && cancel !== "n");

                    if (cancel === "y") {
                        cart = [];
                        alert("Removing all items from the Cart.");
                        alert("Order canceled.");
                    } else {
                        alert("Returning to Menu...");
                        continue;
                    }
                }

                //Exit
                let exit;
                do {
                    exit = prompt("Exit the program? (y/n):").toLowerCase();
                    if (exit !== "y" && exit !== "n") {
                        alert("Invalid. Must be y or n.");
                    }
                } while (exit !== "y" && exit !== "n");

                if (exit === "y") {
                    alert("Exiting the program...");
                    alert("Thank You for Using NEXT Café Order System.");
                    run = false;
                }
                break;

            default:
                alert("Invalid Prompt. Choose only 1, 2, 3, or 4.");
        }
    }
}


// Add To Cart category choosing process
function add() {
    while (true) {
    let choose = prompt("Choose a Category you want to Add:\n1. Coffee\n2. Desserts\n3. Ice Cream\n4. Beverages\n5. Return");
    switch (choose) {
        // Coffee
        case "1":
            coffee();
            break;        
        case "2":
            desserts();
            break;
        case "3":
            iceCream();
            break;
        case "4":
            beverages();
            break;
        case "5":
            return;
        default:
            alert("Invalid. Choose from 1, 2, 3, and 4");
        }
    }
}

// Add to Cart
function addToCart(itemName, category, price, quantity) {
    let exists = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === itemName) {
            cart[i].quantity += quantity;
            exists = true;
            break;
        }
    }

    if (!exists) {
        cart.push({name: itemName, category: category, price: price, quantity: quantity});
    }
    menu[category][itemName].stock -= quantity;
    alert(`Added to the Cart.\nYour Order (${itemName}):\nPrice of Item: ${price}\nQuantity Ordered: ${quantity}\nAmount Total: ${price * quantity}`);
}

//Coffee Catecory
function coffee() {
    while (true) {
        let select = prompt("What item would you like:\n1. Americano\n2. Cappuccino\n3. Mocha\n4. Espresso\n5. Latte\n6. Return");
        let itemName = "";
        let category = "Coffee";

        switch (select) {
            case "1":
                itemName = "Americano";
                break;
            case "2":
                itemName = "Cappuccino";
                break;
            case "3":
                itemName = "Mocha";
                break;
            case "4":
                itemName = "Espresso";
                break;
            case "5":
                itemName = "Latte";
                break;
            case "6":
                return;
            default:
                alert("Invalid selection. Choose between 1-6.");
                continue;
        }

        if (menu[category][itemName].stock === 0) {
            alert(`${itemName} is out of stock`);
            continue;
        }

        let qty;
        do {
            qty = parseInt(prompt(`${itemName} Stock: ${menu[category][itemName].stock}\nHow many would you like:`));
            if (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock) {
                alert("Invalid. Please enter a valid number");
            }
        } while (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock);

        addToCart(itemName, category, menu[category][itemName].price, qty);
    }
}
// Desserts Category
function desserts() {
    while (true) {
        let select = prompt("What item would you like:\n1. Strawberry Shortcake\n2. Tiramisu Shortcake\n3. Macarons\n4. Brownies\n5. Cupcakes\n6. Return");
        let itemName = "";
        let category = "Desserts";

        switch (select) {
            case "1":
                itemName = "Strawberry Shortcake";
                break;
            case "2":
                itemName = "Tiramisu Shortcake";
                break;
            case "3":
                itemName = "Macarons";
                break;
            case "4":
                itemName = "Brownies";
                break;
            case "5":
                itemName = "Cupcakes";
                break;
            case "6":
                return;
            default:
                alert("Invalid selection. Choose between 1-6.");
                continue;
        }

        if (menu[category][itemName].stock === 0) {
            alert(`${itemName} is out of stock`);
            continue;
        }

        let qty;
        do {
            qty = parseInt(prompt(`${itemName} Stock: ${menu[category][itemName].stock}\nHow many would you like:`));
            if (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock) {
                alert("Invalid. Please enter a valid number");
            }
        } while (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock);

        addToCart(itemName, category, menu[category][itemName].price, qty);
    }
}
//Ice Cream Category
function iceCream() {
    while (true) {
        let select = prompt("What Ice Cream Flavor would you like:\n1. Vanilla\n2. Strawberry\n3. Cookies and Cream\n4. Chocolate\n5. Cheese\n6. Return");
        let itemName = "";
        let category = "IceCream";

        switch (select) {
            case "1":
                itemName = "Vanilla IceCream";
                break;
            case "2":
                itemName = "Strawberry IceCream";
                break;
            case "3":
                itemName = "Cookies and Cream IceCream";
                break;
            case "4":
                itemName = "Chocolate IceCream";
                break;
            case "5":
                itemName = "Cheese IceCream";
                break;
            case "6":
                return;
            default:
                alert("Invalid selection. Choose between 1-6.");
                continue;
        }

        if (menu[category][itemName].stock === 0) {
            alert(`${itemName} is out of stock`);
            continue;
        }

        let qty;
        do {
            qty = parseInt(prompt(`${itemName} Stock: ${menu[category][itemName].stock}\nHow many would you like:`));
            if (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock) {
                alert("Invalid. Please enter a valid number");
            }
        } while (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock);

        addToCart(itemName, category, menu[category][itemName].price, qty);
    }
}

//Beverages Category
function beverages() {
    while (true) {
        let select = prompt("What Beverage would you like:\n1. Grape Juice\n2. Orange Juice\n3. Apple Juice\n4. Leafy Green\n5. Pearl and Cucumber\n6. Return");
        let itemName = "";
        let category = "Beverages";

        switch (select) {
            case "1":
                itemName = "Grape Juice";
                break;
            case "2":
                itemName = "Orange Juice";
                break;
            case "3":
                itemName = "Apple Juice";
                break;
            case "4":
                itemName = "Leafy Green";
                break;
            case "5":
                itemName = "Pearl and Cucumber";
                break;
            case "6":
                return;
            default:
                alert("Invalid selection. Choose between 1-6.");
                continue;
        }

        if (menu[category][itemName].stock === 0) {
            alert(`${itemName} is out of stock`);
            continue;
        }

        let qty;
        do {
            qty = parseInt(prompt(`${itemName} Stock: ${menu[category][itemName].stock}\nHow many would you like:`));
            if (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock) {
                alert("Invalid. Please enter a valid number");
            }
        } while (isNaN(qty) || qty <= 0 || qty > menu[category][itemName].stock);

        addToCart(itemName, category, menu[category][itemName].price, qty);
    }
}


// Remove From Cart
function removeItem() {
    if (cart.length === 0) {
        alert("Your Cart is Empty. No items will be removed.");
        return;
    }
    let rem = true;
    while (rem) {
        let choose = prompt("Remove an Item? (y/n):").toLowerCase();
        switch (choose) {
            case "y":
                rem = false;
                break;
            case "n":
                alert("Returning to Options...")
                return;
            default:
                alert("Invalid. Must be y or n.")
        }
    }
    let itemName = "";
    let validItem = false;

    while (!validItem) {
        let cartCont = "";
        for (let i = 0; i < cart.length; i++) {
            cartCont += cart[i].name + ": PHP" + cart[i].price + " - Quantity: " + cart[i].quantity + "\n";
        }
        itemName = prompt(`Your Cart:\n${cartCont}\n\nEnter the name of the item you want to remove:`);

        if (!isNaN(itemName)) {
            alert("Invalid input. Please enter the item name.");
            continue;
        }

        let itemExists = false;
        for (let category in menu) {
            if (menu[category][itemName]) {
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            alert(`${itemName} not found in the menu. Please check the name and try again.`);
            continue;
        }

        let itemIndex = -1;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name.toLowerCase() === itemName.toLowerCase()) {
                itemIndex = i;
                break;
            }
        }

        if (itemIndex === -1) {
            alert(`${itemName} is not in your cart. Try again.`);
            continue;
        }

        let item = cart[itemIndex];
        let quantityToRemove = 0;
        let validQuantity = false;

        while (!validQuantity) {
            quantityToRemove = parseInt(prompt(`You have ${item.quantity} ${item.name}(s) in your cart.\nHow many would you like to remove?`));

            if (isNaN(quantityToRemove) || quantityToRemove <= 0 || quantityToRemove > item.quantity) {
                alert("Invalid quantity. Enter a number between 1 and the amount in your cart.");
            } else {
                validQuantity = true;
            }
        }

        menu[item.category][item.name].stock += quantityToRemove;

        if (quantityToRemove === item.quantity) {
            cart.splice(itemIndex, 1);
        } else {
            item.quantity -= quantityToRemove;
        }

        alert(`${quantityToRemove} ${item.name}(s) have been removed from your cart.`);
        validItem = true;
    }
}