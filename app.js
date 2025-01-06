// Menyimpan keranjang belanja
let cart = [];

// Ambil elemen-elemen DOM
const cartItemsElement = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const bayarButton = document.getElementById('bayar');
const paymentModal = document.getElementById('payment-modal');
const receiptModal = document.getElementById('receipt-modal');
const receiptItemsElement = document.getElementById('receipt-items');
const finalTotalElement = document.getElementById('final-total');

// Fungsi untuk menambahkan produk ke keranjang
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.getAttribute('data-name');
        const price = parseInt(event.target.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
    });
});

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    // Bersihkan daftar produk di keranjang
    cartItemsElement.innerHTML = '';
    let total = 0;
    
    // Tampilkan produk yang ada di keranjang
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = ${item.name} - Rp ${item.price.toLocaleString()};
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    // Update total harga
    totalElement.textContent = total.toLocaleString();
}

// Menampilkan modal pembayaran saat tombol "Bayar" diklik
bayarButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
    } else {
        paymentModal.style.display = 'block';
    }
});

// Menangani pilihan metode pembayaran
document.getElementById('cash').addEventListener('click', () => {
    showReceipt();
});
document.getElementById('debit').addEventListener('click', () => {
    showReceipt();
});
document.getElementById('qris').addEventListener('click', () => {
    showReceipt();
});

// Menampilkan struk pembelian
function showReceipt() {
    paymentModal.style.display = 'none';
    receiptModal.style.display = 'block';
    
    receiptItemsElement.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = ${item.name} - Rp ${item.price.toLocaleString()};
        receiptItemsElement.appendChild(li);
        total += item.price;
    });

    finalTotalElement.textContent = total.toLocaleString();
}
// Show payment modal when cart icon is clicked
document.getElementById('cart-icon').addEventListener('click', function() {
    const cartItems = document.getElementById('cart-items').innerHTML;
    const total = document.getElementById('total').textContent;

    if (cartItems.trim() === "") {
        alert("Keranjang belanja kosong!");
        return;
    }

    document.getElementById('payment-items').innerHTML = cartItems;
    document.getElementById('payment-total').textContent = total;
    document.getElementById('payment-modal').style.display = 'block';
});

// Handle payment method selection when "Bayar Sekarang" is clicked
document.getElementById('pay-now').addEventListener('click', function() {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'none';
    
    // Display options for cash, transfer, or QRIS
    const paymentMethod = prompt("Pilih metode pembayaran:\n1. Cash\n2. Transfer\n3. QRIS");
    
    if (paymentMethod === "1") {
        // Show cash payment modal
        document.getElementById('cash-payment-modal').style.display = 'block';
    } else if (paymentMethod === "2" || paymentMethod === "3") {
        // Show success message for transfer/QRIS
        document.getElementById('transfer-qris-payment-modal').style.display = 'block';
    } else {
        alert("Metode pembayaran tidak valid.");
    }
});

// Process cash payment
document.getElementById('process-cash-payment').addEventListener('click', function() {
    const receivedMoney = parseInt(document.getElementById('received-money').value);
    const total = parseInt(document.getElementById('payment-total').textContent);
    
    if (isNaN(receivedMoney) || receivedMoney < total) {
        alert("Jumlah uang yang diterima tidak cukup!");
        return;
    }

    const change = receivedMoney - total;
    document.getElementById('cash-change').textContent = `Kembalian: Rp ${change.toLocaleString('id-ID')}`;
    document.getElementById('cash-change').style.display = 'block';
    
    // Hide the cash payment modal
    setTimeout(() => {
        document.getElementById('cash-payment-modal').style.display = 'none';
        showReceipt();
    }, 2000);
});

// Close cash payment modal
document.getElementById('close-cash-payment').addEventListener('click', function() {
    document.getElementById('cash-payment-modal').style.display = 'none';
});

// Close transfer / QRIS payment modal
document.getElementById('close-transfer-qris').addEventListener('click', function() {
    document.getElementById('transfer-qris-payment-modal').style.display = 'none';
    showReceipt();
});

// Show receipt after successful payment
function showReceipt() {
    const cartItems = document.getElementById('cart-items').innerHTML;
    const total = document.getElementById('total').textContent;

    document.getElementById('receipt-items').innerHTML = cartItems;
    document.getElementById('final-total').textContent = total;
    document.getElementById('receipt-modal').style.display = 'block';
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker terdaftar dengan sukses:', registration);
        })
        .catch((error) => {
            console.log('Pendaftaran Service Worker gagal:', error);
        });
    });
}
