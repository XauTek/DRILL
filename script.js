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

const PRODUCT_SECTIONS = [
  {
    category: "Оборудование",
    idPrefix: "EQ",
    items: [
      {
        name: "Буровая установка Atlas Copco Boomer S1 D",
        description: "Гидравлическая буровая установка для проходки тоннелей сечением до 31 м2 с одной стрелой BUT 29.",
        specs: ["Стрела: 1 x BUT 29", "Буровая система: DCS с антизаклиниванием RPCF", "Установленная мощность: 59-79 кВт"],
        price: 16850000,
        image: "img/Буровая установка 1.webp"
      },
      {
        name: "Буровая установка Atlas Copco Boomer S1 D (COP 2238)",
        description: "Комплектация с перфоратором COP 2238 для более высокой ударной мощности на твердых породах.",
        specs: ["Перфоратор: COP 2238", "Мощность удара: 22 кВт", "Масса установки: около 12 000 кг"],
        price: 7420000,
        image: "img/Буровая установка 2.webp"
      },
      {
        name: "Буровая установка Sandvik DD311",
        description: "Одностреловая проходческая установка для средних тоннелей и выработок.",
        specs: ["Перфоратор: RD520", "Рабочая зона: до 45 м2", "Мощность двигателя: 96 кВт"],
        price: 15300000,
        image: "img/Буровая установка 1.webp"
      },
      {
        name: "Буровая установка Epiroc Boomer M2C",
        description: "Двухстреловая установка для интенсивного бурения в подземных условиях.",
        specs: ["Стрелы: 2 x BUT 45", "Система автоматизации: Rig Control System", "Масса: 18 700 кг"],
        price: 21900000,
        image: "img/Буровая установка 2.webp"
      },
      {
        name: "Буровой станок СБШ-250",
        description: "Карьерный станок вращательного бурения для взрывных скважин большого диаметра.",
        specs: ["Диаметр скважины: 160-250 мм", "Глубина бурения: до 32 м", "Тип привода: дизель-электрический"],
        price: 27400000,
        image: "img/Буровая установка 1.webp"
      },
      {
        name: "Буровая установка Furukawa HCR1200",
        description: "Гусеничная установка для открытых горных работ с высокой производительностью.",
        specs: ["Диаметр бурения: 64-127 мм", "Глубина бурения: до 30 м", "Компрессор: 10.3 м3/мин"],
        price: 19800000,
        image: "img/Буровая установка 2.webp"
      },
      {
        name: "Буровая установка Junjin SD-1300E",
        description: "Универсальная установка для буровзрывных работ и инженерных скважин.",
        specs: ["Диаметр бурения: 90-165 мм", "Угол наклона стрелы: 0-90°", "Усилие подачи: 25 кН"],
        price: 12400000,
        image: "img/Буровая установка 1.webp"
      },
      {
        name: "Буровая установка KAISHAN KG940A",
        description: "Пневматическая установка для карьеров и строительных площадок.",
        specs: ["Диаметр бурения: 105-140 мм", "Глубина бурения: до 25 м", "Расход воздуха: 12 м3/мин"],
        price: 9300000,
        image: "img/Буровая установка 2.webp"
      }
    ]
  },
  {
    category: "Запчасти",
    idPrefix: "SP",
    items: [
      {
        name: "Пневмоударник TD 60 (DTH hammer)",
        description: "Пневмоударник для DTH-бурения из каталога Secoroc, рассчитан на интенсивную работу в породе.",
        specs: ["Модель: TD 60", "Резьба: 3 1/2 API Reg", "Тип инструмента: DTH hammer"],
        price: 49800,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Гидронасос Rexroth A11VO130",
        description: "Аксиально-поршневой насос для гидросистем буровых установок.",
        specs: ["Рабочий объем: 130 см3/об", "Давление: до 350 бар", "Тип управления: пропорциональный"],
        price: 286000,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Гидромотор хода Danfoss OMT 500",
        description: "Орбитальный гидромотор для приводов подачи и вспомогательных узлов.",
        specs: ["Крутящий момент: до 1200 Н·м", "Расход: до 75 л/мин", "Тип вала: шпоночный"],
        price: 119000,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Редуктор вращателя RTH-420",
        description: "Планетарный редуктор вращателя для бурения твердых пород.",
        specs: ["Передаточное число: 1:42", "Макс. момент: 4200 Н·м", "Масса: 78 кг"],
        price: 164000,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Фильтр гидравлический Donaldson P171620",
        description: "Сменный фильтроэлемент для защиты гидросистемы от загрязнений.",
        specs: ["Тонкость фильтрации: 10 мкм", "Рабочее давление: до 250 бар", "Материал: стекловолокно"],
        price: 14800,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Компрессорный клапан Atlas Copco CV-35",
        description: "Запчасть для пневмосистемы буровой установки с повышенным ресурсом.",
        specs: ["Рабочее давление: до 35 бар", "Материал: легированная сталь", "Применение: винтовые компрессоры"],
        price: 27400,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Насос водяного охлаждения WP-220",
        description: "Циркуляционный насос для систем охлаждения буровых двигателей.",
        specs: ["Производительность: 220 л/мин", "Привод: ременной", "Корпус: чугун"],
        price: 46200,
        image: "img/пневмоударник.webp"
      },
      {
        name: "Комплект РВД высокого давления HD-4",
        description: "Набор рукавов высокого давления для гидролиний буровой техники.",
        specs: ["Количество: 4 шт.", "Рабочее давление: 420 бар", "Температура: -40...+120 °C"],
        price: 36800,
        image: "img/пневмоударник.webp"
      }
    ]
  },
  {
    category: "Двигатели",
    idPrefix: "EN",
    items: [
      {
        name: "Двигатель Cummins QSB6.7",
        description: "Шестицилиндровый дизельный двигатель для мобильных буровых и проходческих установок.",
        specs: ["Мощность: 215 л.с.", "Крутящий момент: 990 Н·м", "Экостандарт: Stage IIIA"],
        price: 395000,
        image: "img/Двигатель.webp",
        enginePurpose: "Проходческие установки"
      },
      {
        name: "Двигатель Deutz TCD 2013 L06",
        description: "Надежный промышленный двигатель для карьерных буровых установок.",
        specs: ["Мощность: 240 л.с.", "Крутящий момент: 1050 Н·м", "Охлаждение: жидкостное"],
        price: 418000,
        image: "img/Двигатель.webp",
        enginePurpose: "Карьерные буровые установки"
      },
      {
        name: "Двигатель Weichai WP10",
        description: "Высокомоментный двигатель для буровых станков с высокой нагрузкой.",
        specs: ["Мощность: 336 л.с.", "Крутящий момент: 1420 Н·м", "Топливная система: Common Rail"],
        price: 462000,
        image: "img/Двигатель.webp",
        enginePurpose: "Карьерные буровые установки"
      },
      {
        name: "Двигатель Yuchai YC6MK",
        description: "Экономичный дизельный двигатель для вспомогательной буровой техники.",
        specs: ["Мощность: 270 л.с.", "Крутящий момент: 1200 Н·м", "Ресурс до капремонта: 12 000 м/ч"],
        price: 352000,
        image: "img/Двигатель.webp",
        enginePurpose: "Разведочные буровые установки"
      },
      {
        name: "Двигатель Caterpillar C7.1",
        description: "Двигатель с высокой стабильностью работы для гидравлических буровых.",
        specs: ["Мощность: 275 л.с.", "Крутящий момент: 1170 Н·м", "Электронный блок: ADEM"],
        price: 508000,
        image: "img/Двигатель.webp",
        enginePurpose: "Гидравлические буровые установки"
      },
      {
        name: "Двигатель Perkins 1206F-E70",
        description: "Промышленный двигатель для буровых комплексов и компрессорных модулей.",
        specs: ["Мощность: 225 л.с.", "Крутящий момент: 950 Н·м", "Экостандарт: Stage IV"],
        price: 434000,
        image: "img/Двигатель.webp",
        enginePurpose: "Компрессорные станции"
      },
      {
        name: "Двигатель MTU Series 1000",
        description: "Высоконадежный двигатель для непрерывной работы в тяжелых условиях шахты.",
        specs: ["Мощность: 326 л.с.", "Крутящий момент: 1360 Н·м", "Интервал ТО: 500 м/ч"],
        price: 575000,
        image: "img/Двигатель.webp",
        enginePurpose: "Шахтные буровые комплексы"
      },
      {
        name: "Двигатель Volvo Penta TAD851VE",
        description: "Дизельный двигатель для самоходных буровых установок и спецтехники.",
        specs: ["Мощность: 320 л.с.", "Крутящий момент: 1280 Н·м", "Система впрыска: EMS2"],
        price: 549000,
        image: "img/Двигатель.webp",
        enginePurpose: "Самоходные буровые установки"
      }
    ]
  },
  {
    category: "Услуги-буровой инструмент",
    idPrefix: "SR",
    items: [
      {
        name: "Буровой инструмент COP 32 shank (Flat Front)",
        description: "Коронка из DTH-каталога Secoroc для средне-твердых и абразивных пород.",
        specs: ["Диаметр: 85 мм", "Код продукта: 100-5085-39-1216,10-20", "Масса: 4.5 кг"],
        price: 87500,
        image: "img/Буровой инструмент 1.webp"
      },
      {
        name: "Буровой инструмент Tophammer (Integral drill rod)",
        description: "Интегральная буровая штанга из Tophammer-каталога для проходческих и геологоразведочных задач.",
        specs: ["Hex: 19 мм", "Длина: 400 мм", "Диаметр коронки: 29 мм"],
        price: 120000,
        image: "img/Буровой инструмент 2.webp"
      },
      {
        name: "Буровой инструмент для геологов (Tapered button bit)",
        description: "Инструмент для геологоразведки и бурения в средне-твердых породах из каталога Tophammer.",
        specs: ["Диаметр: 36 мм", "Модель: -14", "Угол конуса: 4°46'"],
        price: 68000,
        image: "img/Буровой инструмент для геологов.webp"
      },
      {
        name: "Буровая коронка DTH 90 мм SD5",
        description: "Кнопочная коронка для DTH-бурения с повышенной стойкостью к износу.",
        specs: ["Диаметр: 90 мм", "Резьба: API 2 3/8", "Количество кнопок: 12"],
        price: 73400,
        image: "img/Буровой инструмент 1.webp"
      },
      {
        name: "Буровая штанга MF-T45 3660 мм",
        description: "Муфтовая буровая штанга для проходческого бурения в твердых породах.",
        specs: ["Резьба: T45", "Длина: 3660 мм", "Материал: легированная сталь"],
        price: 54200,
        image: "img/Буровой инструмент 2.webp"
      },
      {
        name: "Пилотная коронка Retrac 76 мм",
        description: "Коронка для точного старта скважины и удержания траектории бурения.",
        specs: ["Диаметр: 76 мм", "Тип кнопок: сферические", "Посадка: R32"],
        price: 39200,
        image: "img/Буровой инструмент для геологов.webp"
      },
      {
        name: "Переходник Shank Adapter COP 1838",
        description: "Переходник хвостовика для передачи ударной энергии от перфоратора к штанге.",
        specs: ["Совместимость: COP 1838", "Резьба: T38", "Термообработка: индукционная"],
        price: 45800,
        image: "img/Буровой инструмент 1.webp"
      },
      {
        name: "Расширитель скважины Reamer Bit 102 мм",
        description: "Инструмент для расширения пилотных скважин при проходке и анкеровке.",
        specs: ["Диаметр: 102 мм", "Тип резьбы: T45", "Назначение: расширение скважин"],
        price: 61700,
        image: "img/Буровой инструмент 2.webp"
      }
    ]
  }
];

const DEFAULT_PRODUCTS = PRODUCT_SECTIONS.flatMap((section) =>
  section.items.map((item, index) => ({
    ...item,
    id: `${section.idPrefix}-${String(index + 1).padStart(3, "0")}`,
    category: section.category
  }))
);

let products = [...DEFAULT_PRODUCTS];
let currentFilter = "Оборудование";
let currentEnginePurpose = "all";

const catalogGrid = document.getElementById("catalogGrid");
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const enginePurposeSortWrap = document.getElementById("enginePurposeSortWrap");
const enginePurposeSort = document.getElementById("enginePurposeSort");

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

function toggleEngineSortVisibility() {
  if (!enginePurposeSortWrap) return;
  enginePurposeSortWrap.hidden = currentFilter !== "Двигатели";
}

function fillEnginePurposeSort() {
  if (!enginePurposeSort) return;

  const purposes = [...new Set(
    products
      .filter((item) => item.category === "Двигатели")
      .map((item) => item.enginePurpose)
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, "ru"));

  enginePurposeSort.innerHTML = [
    '<option value="all">Все назначения</option>',
    ...purposes.map((purpose) => `<option value="${purpose}">${purpose}</option>`)
  ].join("");

  if (!purposes.includes(currentEnginePurpose)) {
    currentEnginePurpose = "all";
  }
  enginePurposeSort.value = currentEnginePurpose;
}

function renderProducts() {
  if (!catalogGrid) return;

  let list = products.filter((item) => item.category === currentFilter);

  if (currentFilter === "Двигатели" && currentEnginePurpose !== "all") {
    list = list.filter((item) => item.enginePurpose === currentEnginePurpose);
  }

  if (!list.length) {
    catalogGrid.innerHTML = "<p>По выбранному фильтру товары не найдены.</p>";
    return;
  }

  catalogGrid.innerHTML = list
    .map((item) => {
      const purposeLabel = item.category === "Двигатели" && item.enginePurpose
        ? `<p class="card-category">Назначение: ${item.enginePurpose}</p>`
        : `<p class="card-category">${item.category}</p>`;

      return `
      <article class="product-card">
        <img src="${item.image || FALLBACK_IMAGE}" alt="${item.name}" onerror="this.src='${FALLBACK_IMAGE}'">
        <div class="card-body">
          ${purposeLabel}
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.description}</p>
          <p class="card-price">${formatPrice(item.price)}</p>
          <button class="btn btn-primary" data-id="${item.id}">Подробнее</button>
        </div>
      </article>
    `;
    })
    .join("");
}

function openModalById(id) {
  if (!modal) return;
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
  const specs = normalizeSpecs(product.specs);
  if (product.category === "Двигатели" && product.enginePurpose) {
    specs.unshift(`Назначение: ${product.enginePurpose}`);
  }
  specsElement.innerHTML = specs.map((spec) => `<li>${spec}</li>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
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
      document.querySelectorAll(".filter-btn").forEach((item) => item.setAttribute("aria-selected", "false"));
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      currentFilter = btn.dataset.filter;
      toggleEngineSortVisibility();
      renderProducts();
    });
  });

  if (enginePurposeSort) {
    enginePurposeSort.addEventListener("change", () => {
      currentEnginePurpose = enginePurposeSort.value;
      renderProducts();
    });
  }

  if (catalogGrid) {
    catalogGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-id]");
      if (!button) return;
      openModalById(button.dataset.id);
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
  });

  const requestForm = document.getElementById("requestForm");
  if (requestForm) {
    requestForm.addEventListener("submit", handleFormSubmit);
  }
}

fillEnginePurposeSort();
toggleEngineSortVisibility();
renderProducts();
initEvents();
