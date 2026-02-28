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
    name: "Буровая установка IMG DrillMaster 320",
    description: "Самоходная установка для открытых горных работ с высокой производительностью.",
    specs: ["Мощность двигателя: 320 кВт", "Глубина бурения: до 42 м", "Диаметр бурения: 115-165 мм"],
    price: 16850000,
    image: "https://images.unsplash.com/photo-1581093588401-22d1f89c8f7b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "EQ-002",
    category: "Оборудование",
    name: "Компрессорная станция IMG AirRock 900",
    description: "Передвижной компрессор для буровых комплексов и пневмоинструмента.",
    specs: ["Давление: 25 бар", "Производительность: 25 м3/мин", "Дизельный привод: Cummins"],
    price: 7420000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "SP-001",
    category: "Запчасти",
    name: "Гидронасос высокого давления HP-450",
    description: "Насос для буровых установок и карьерной техники.",
    specs: ["Рабочее давление: до 450 бар", "Материал корпуса: легированная сталь", "Ресурс: 8000 моточасов"],
    price: 365000,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "SP-002",
    category: "Запчасти",
    name: "Комплект фильтров IMG ServicePack",
    description: "Комплект расходников для планового ТО буровой техники.",
    specs: ["Масляный фильтр: 2 шт", "Топливный фильтр: 2 шт", "Воздушный фильтр: 1 шт"],
    price: 49800,
    image: "https://images.unsplash.com/photo-1530006498959-b7884e829a04?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "SR-001",
    category: "Услуги-буровой инструмент",
    name: "Коронка буровая усиленная IMG DTH-165",
    description: "Поставка бурового инструмента для сложных пород.",
    specs: ["Тип: DTH", "Диаметр: 165 мм", "Твердосплавные вставки: 16 шт"],
    price: 87500,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "SR-002",
    category: "Услуги-буровой инструмент",
    name: "Сервис: диагностика буровой установки",
    description: "Выездной сервис и техническая экспертиза состояния оборудования.",
    specs: ["Срок выполнения: 1-2 дня", "Отчет по узлам: да", "Рекомендации по ремонту: да"],
    price: 120000,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
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
