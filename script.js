// Products Database
const products = [
  {
    id: 1,
    name: "Cimento CP II 50kg",
    category: "cimento",
    price: 35.90,
    description: "Cimento Caue CP II para uso geral",
    image: "imagens/cimento-caue.jpg",
  },
  {
    id: 2,
    name: "Tijolo baiano 8 Furos",
    category: "tijolos",
    price: 1.10,
    description: "Tijolo cerâmico 8 furos 9x19x19cm",
    image: "imagens/tijolo-8.jpg",
  },
  {
    id: 3,
    name: "Areia Média - 1m³",
    category: "cimento",
    price: 119.90,
    description: "Areia média lavada para construção",
    image: "imagens/areia.jpg",
  },
  {
    id: 4,
    name: "Disco de desbaste diamantado",
    category: "ferramentas",
    price: 110.00,
    description: "Disco de desbaste diamantado UZZY",
    image: "imagens/disco.jpg",
  },
  {
    id: 5,
    name: "Tubo PVC 100mm 6m",
    category: "hidraulica",
    price: 79.9,
    description: "Tubo PVC esgoto 100mm x 6 metros",
    image: "imagens/tubo100.jpg",
  },
  {
    id: 6,
    name: "Fio Elétrico 2,5mm 100m",
    category: "eletrica",
    price: 280.00,
    description: "Fio elétrico flexível 2,5mm rolo 100m",
    image: "imagens/cabo.2,5.jpg",
  },
  {
    id: 7,
    name: "Bloquinho 6 furos 11,5x14x24cm",
    category: "tijolos",
    price: 1.15,
    description: "Tijolo ceramico",
    image: "imagens/tijolo-6.jpg",
  },
  {
    id: 8,
    name: "Spray Maza",
    category: "ferramentas",
    price: 19.9,
    description: "Spray Maza 400ml",
    image: "imagens/spray.jpg",
  },
  {
    id: 9,
    name: "Lampada de 9W LED",
    category: "eletrica",
    price: 3.90,
    description: "Lâmpada LED 9W Bivolt E27",
    image: "imagens/lampada 9.jpg",
  },
  {
    id: 10,
    name: "Disjuntor 63A Bipolar",
    category: "eletrica",
    price: 29.90,
    description: "Disjuntor bipolar 63A DIN",
    image: "imagens/dijuntor.jpg",
  },
  {
    id: 11,
    name: "Argamassa AC II 20kg",
    category: "cimento",
    price: 24.90,
    description: "Argamassa colante AC II ",
    image: "imagens/argamassa-AC.jpg",
  },
  {
    id: 12,
    name: "Trena 5m Profissional",
    category: "ferramentas",
    price: 19.00,
    description: "Trena Lufkin 5 metros profissional",
    image: "imagens/trena.5.jpg",
  },
]


let cart = []


const lucide = {
  createIcons: () => {
  
  },
}


document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  loadCart()
  updateCartUI()
})


function loadProducts(filter = "all") {
  const grid = document.getElementById("productsGrid")
  const filteredProducts = filter === "all" ? products : products.filter((p) => p.category === filter)

  grid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                    <button class="btn-add" onclick="addToCart(${product.id})">Adicionar</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}


function filterProducts(category) {
 
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  loadProducts(category)
}


function getCategoryName(category) {
  const names = {
    cimento: "Cimento e Argamassa",
    tijolos: "Tijolos ",
    ferramentas: "Ferramentas",
    hidraulica: "Hidráulica",
    eletrica: "Elétrica",
  }
  return names[category] || category
}


function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  saveCart()
  updateCartUI()


  toggleCart(true)
}
function adicionarProduto(nome, precoBase) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


    let produto = carrinho.find(p => p.nome === nome);

    if (produto) {
        produto.quantidade++;
    } else {
        produto = { nome, preco: precoBase, quantidade: 1 };
        carrinho.push(produto);
    }


    if (produto.nome === "Lâmpada") {
        if (produto.quantidade >= 10) {
            produto.preco = 2.99;
        } else {
            produto.preco = 3.90;
        }
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}


function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartUI()
}


function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartUI()
    }
  }
}

function clearCart() {
  if (confirm("Deseja realmente limpar o carrinho?")) {
    cart = []
    saveCart()
    updateCartUI()
  }
}


function updateCartUI() {
  const cartCount = document.getElementById("cartCount")
  const listaCarrinho = document.getElementById("listaCarrinho")
  const valorTotal = document.getElementById("valorTotal")


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems


  if (cart.length === 0) {
    listaCarrinho.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>'
  } else {
    listaCarrinho.innerHTML = cart
      .map(
        (item) => `
            <li class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                    </div>
                </div>
            </li>
        `,
      )
      .join("")
  }


  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  valorTotal.textContent = `R$ ${total.toFixed(2)}`
}


function toggleCart(forceOpen = false) {
  const sidebar = document.getElementById("sidebarCarrinho")
  const overlay = document.getElementById("overlay")

  if (forceOpen) {
    sidebar.classList.add("aberto")
    overlay.classList.add("ativo")
  } else {
    sidebar.classList.toggle("aberto")
    overlay.classList.toggle("ativo")
  }
}

document.getElementById("abrirCarrinho").addEventListener("click", () => toggleCart())
document.getElementById("fecharCarrinho").addEventListener("click", () => toggleCart())
document.getElementById("overlay").addEventListener("click", () => toggleCart())


function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!")
    return
  }


  const customerName = document.getElementById("customerName").value.trim()
  const customerPhone = document.getElementById("customerPhone").value.trim()
  const customerAddress = document.getElementById("customerAddress").value.trim()

 
  if (!customerName || !customerPhone || !customerAddress) {
    alert("Por favor, preencha todas as informações de entrega!")
    return
  }


  showWhatsAppModal()
}

function showWhatsAppModal() {
  const modal = document.getElementById("whatsappModal")
  modal.classList.add("active")
  lucide.createIcons()
}

function closeWhatsAppModal() {
  const modal = document.getElementById("whatsappModal")
  modal.classList.remove("active")
}

function confirmWhatsAppSend() {

  const customerName = document.getElementById("customerName").value.trim()
  const customerPhone = document.getElementById("customerPhone").value.trim()
  const customerAddress = document.getElementById("customerAddress").value.trim()


  const paymentMethod = document.querySelector('input[name="payment"]:checked').value
  const paymentNames = {
    dinheiro: "Dinheiro",
    cartao: "Cartão",
    pix: "PIX",
  }


  let message = "*🏗️ PEDIDO HIDROLUZ*\n\n"

  message += "*👤 DADOS DO CLIENTE*\n"
  message += `Nome: ${customerName}\n`
  message += `Telefone: ${customerPhone}\n`
  message += `Endereço: ${customerAddress}\n\n`

  message += "*📦 PRODUTOS*\n"
  cart.forEach((item) => {
    message += `\n▪️ *${item.name}*\n`
    message += `   Quantidade: ${item.quantity}\n`
    message += `   Preço unitário: R$ ${item.price.toFixed(2)}\n`
    message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n`
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  message += `\n*💰 TOTAL: R$ ${total.toFixed(2)}*\n\n`

  message += `*💳 Forma de Pagamento:* ${paymentNames[paymentMethod]}\n\n`

  message += "_Aguardamos sua confirmação! 🚚_"

  
  const phoneNumber = "5515996639799" 


  const encodedMessage = encodeURIComponent(message)

  closeWhatsAppModal()

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")

  setTimeout(() => {
    cart = []
    saveCart()
    updateCartUI()
    toggleCart()
  }, 1000)
}


function saveCart() {
  localStorage.setItem("hidroluz_cart", JSON.stringify(cart))
}


function loadCart() {
  const savedCart = localStorage.getItem("hidroluz_cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
