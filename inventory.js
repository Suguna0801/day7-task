function Product(name, price, quantity) {
    this.name = name
    this.price = parseFloat(price).toFixed(2)
    this.quantity = parseInt(quantity, 10)
}
Product.prototype.updateQuantity = function(newQuantity) {
    this.quantity = parseInt(newQuantity, 10)
}
Product.prototype.displayDetails = function() {
    return {
        name: this.name,
        price: `$${this.price}`,
        quantity: this.quantity
    }
}
let inventory = []
let currentRow = null;
function renderInventory() {
    const tableBody = document.getElementById('inventory-list').getElementsByTagName('tbody')[0]
    tableBody.innerHTML = ''
    inventory.forEach((product, index) => {
        const productDetails = product.displayDetails()
        const newRow = tableBody.insertRow()
        const cell1 = newRow.insertCell(0)
        const cell2 = newRow.insertCell(1)
        const cell3 = newRow.insertCell(2)
        const cell4 = newRow.insertCell(3)
        cell1.innerHTML = productDetails.name
        cell2.innerHTML = productDetails.price
        cell3.innerHTML = productDetails.quantity
        cell4.innerHTML = `<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`
        cell4.querySelector('.edit-btn').addEventListener('click', function() {
            editProduct(newRow, index)
        })
        cell4.querySelector('.delete-btn').addEventListener('click', function() {
            deleteProduct(index)
        })
    })
}
document.getElementById('add-product-btn').addEventListener('click', function() {
    const name = document.getElementById('product-name').value
    const price = document.getElementById('product-price').value
    const quantity = document.getElementById('product-quantity').value
    if (name === '' || price === '' || quantity === '') {
        alert('Please fill all fields')
        return
    }
    if (currentRow === null) {
        const newProduct = new Product(name, price, quantity)
        inventory.push(newProduct)
    } else {
        inventory[currentRow].name = name
        inventory[currentRow].price = parseFloat(price).toFixed(2)
        inventory[currentRow].quantity = parseInt(quantity, 10)
        currentRow = null
    }
    renderInventory()
    resetForm()
})
function editProduct(row, index) {
    currentRow = index
    const product = inventory[index];
    document.getElementById('product-name').value = product.name
    document.getElementById('product-price').value = product.price
    document.getElementById('product-quantity').value = product.quantity
    document.getElementById('add-product-btn').textContent = 'Update Product'
}
function deleteProduct(index) {
     {
        inventory.splice(index, 1)
        renderInventory()
    }
}
function resetForm() {
    document.getElementById('product-name').value = ''
    document.getElementById('product-price').value = ''
    document.getElementById('product-quantity').value = ''
    currentRow = null
    document.getElementById('add-product-btn').textContent = 'Add Product'; 
}
