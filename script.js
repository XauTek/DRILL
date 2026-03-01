const FALLBACK_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#f4eddc'/>
      <stop offset='100%' stop-color='#bea16f'/>
    </linearGradient>
  </defs>
  <rect width='1200' height='700' fill='url(#g)'/>
  <rect x='70' y='70' width='1060' height='560' rx='20' fill='none' stroke='#8b5f24' stroke-width='8'/>
  <text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='#1c1b18' font-size='66' font-family='Arial'>IMG</text>
  <text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' fill='#4b4a44' font-size='34' font-family='Arial'>Горно-шахтное оборудование</text>
</svg>
`);

const DEFAULT_PRODUCTS = [
  {
    id: "EQ-001",
    category: "Оборудование",
    name: "Буровая установка Atlas Copco Boomer S1 D",
    description: "Гидравлическая буровая установка для проходки тоннелей сечением до 31 м2 с одной стрелой BUT 29.",
    specs: ["Стрела: 1 x BUT 29", "Буровая система: DCS с антизаклиниванием RPCF", "Установленная мощность: 59-79 кВт"],
    price: 16850000,
    image: "img/Буровая установка 1.webp"
  },
  {
    id: "EQ-002",
    category: "Оборудование",
    name: "Буровая установка Atlas Copco Boomer S1 D (COP 2238)",
    description: "Комплектация с перфоратором COP 2238 для более высокой ударной мощности на твердых породах.",
    specs: ["Перфоратор: COP 2238", "Мощность удара: 22 кВт", "Масса установки: около 12 000 кг"],
    price: 7420000,
    image: "img/Буровая установка 2.webp"
  },
  {
    id: "SP-001",
    category: "Запчасти",
    name: "Двигатель буровой установки 7.2L Common Rail",
    description: "Дизельный двигатель для буровой техники с турбонаддувом и жидкостным охлаждением.",
    specs: ["Мощность: 299 л.с. (220 кВт) при 2200 об/мин", "Крутящий момент: 1250 Н·м при 1600 об/мин", "Экостандарт: Euro IV"],
    price: 365000,
    image: "img/Двигатель.webp"
  },
  {
    id: "SP-002",
    category: "Запчасти",
    name: "Пневмоударник TD 60 (DTH hammer)",
    description: "Пневмоударник для DTH-бурения из каталога Secoroc, рассчитан на интенсивную работу в породе.",
    specs: ["Модель: TD 60", "Резьба: 3 1/2 API Reg", "Тип инструмента: DTH hammer"],
    price: 49800,
    image: "img/пневмоударник.webp"
  },
  {
    id: "SR-001",
    category: "Услуги-буровой инструмент",
    name: "Буровой инструмент COP 32 shank (Flat Front)",
    description: "Коронка из DTH-каталога Secoroc для средне-твердых и абразивных пород.",
    specs: ["Диаметр: 85 мм", "Код продукта: 100-5085-39-1216,10-20", "Масса: 4.5 кг"],
    price: 87500,
    image: "img/Буровой инструмент 1.webp"
  },
  {
    id: "SR-002",
    category: "Услуги-буровой инструмент",
    name: "Буровой инструмент Tophammer (Integral drill rod)",
    description: "Интегральная буровая штанга из Tophammer-каталога для проходческих и геологоразведочных задач.",
    specs: ["Hex: 19 мм", "Длина: 400 мм", "Диаметр коронки: 29 мм"],
    price: 120000,
    image: "img/Буровой инструмент 2.webp"
  },
  {
    id: "SR-003",
    category: "Услуги-буровой инструмент",
    name: "Буровой инструмент для геологов (Tapered button bit)",
    description: "Инструмент для геологоразведки и бурения в средне-твердых породах из каталога Tophammer.",
    specs: ["Диаметр: 36 мм", "Модель: -14", "Угол конуса: 4°46'"],
    price: 68000,
    image: "img/Буровой инструмент для геологов.webp"
  }
];

let products = [...DEFAULT_PRODUCTS];
let currentFilter = "all";

const catalogGrid = document.getElementById("catalogGrid");
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");

function formatPrice(value) {
  const number = typeof value === "number" ? value : Number(String(value).replace(/[^\d.-]/g, ""));
  if (Number.isNaN(number)) {
    return "Цена по запросу";
  }
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(number);
}

function normalizeSpecs(specsRaw) {
  if (Array.isArray(specsRaw)) return specsRaw;
  return String(specsRaw)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderProducts() {
  const list = currentFilter === "all" ? products : products.filter((item) => item.category === currentFilter);

  if (!list.length) {
    catalogGrid.innerHTML = "<p>По выбранному фильтру товары не найдены.</p>";
    return;
  }

  catalogGrid.innerHTML = list
    .map((item) => `
      <article class="product-card">
        <img src="${item.image || FALLBACK_IMAGE}" alt="${item.name}" onerror="this.src='${FALLBACK_IMAGE}'">
        <div class="card-body">
          <p class="card-category">${item.category}</p>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.description}</p>
          <p class="card-price">${formatPrice(item.price)}</p>
          <button class="btn btn-primary" data-id="${item.id}">Подробнее</button>
        </div>
      </article>
    `)
    .join("");
}

function openModalById(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  document.getElementById("modalImage").src = product.image || FALLBACK_IMAGE;
  document.getElementById("modalImage").onerror = (event) => {
    event.target.src = FALLBACK_IMAGE;
  };
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalPrice").textContent = formatPrice(product.price);

  const specsElement = document.getElementById("modalSpecs");
  specsElement.innerHTML = normalizeSpecs(product.specs).map((spec) => `<li>${spec}</li>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function setStatus(element, text, type) {
  element.textContent = text;
  element.classList.remove("error", "success");
  if (type) element.classList.add(type);
}

function validateFullName(value) {
  return /^[А-Яа-яЁёA-Za-z\s\-]{5,}$/.test(value.trim());
}

function validatePhone(value) {
  const cleaned = value.replace(/[\s()-]/g, "");
  return /^(\+7|8)\d{10}$/.test(cleaned);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const fullNameInput = document.getElementById("fullName");
  const phoneInput = document.getElementById("phone");
  const status = document.getElementById("formStatus");

  const fullName = fullNameInput.value;
  const phone = phoneInput.value;

  if (!validateFullName(fullName)) {
    setStatus(status, "Введите корректное ФИО (минимум 5 символов).", "error");
    return;
  }

  if (!validatePhone(phone)) {
    setStatus(status, "Телефон должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX.", "error");
    return;
  }

  try {
    const response = await fetch("send_request.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName.trim(),
        phone: phone.trim()
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Ошибка отправки заявки.");
    }

    setStatus(status, "Заявка отправлена. Менеджер свяжется с вами в ближайшее время.", "success");
    event.target.reset();
  } catch (error) {
    setStatus(status, error.message || "Ошибка отправки заявки. Повторите позже.", "error");
  }
}

function initEvents() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  catalogGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;
    openModalById(button.dataset.id);
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document.getElementById("requestForm").addEventListener("submit", handleFormSubmit);
}

renderProducts();
initEvents();
