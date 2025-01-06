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
