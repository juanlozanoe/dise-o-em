// Función para generar valores aleatorios entre min y max, sin ceros
function generarValoresAleatorios(num, min = 100, max = 1000) {
  const valores = [];
  for (let i = 0; i < num; i++) {
    let val = 0;
    while (val === 0) {
      val = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    valores.push(val);
  }
  return valores;
}

let chartInstance = null; // Guardar instancia del gráfico para destruirla luego

function mostrarConsumo() {
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const conceptos = ["Ingreso Total", "Egreso Total"];

  const dataConcepts = {};
  conceptos.forEach(concepto => {
    dataConcepts[concepto] = generarValoresAleatorios(years.length);
  });

  // Tabla línea de tiempo
  const lineaTiempoTable = document.getElementById("linea-tiempo-table");
  lineaTiempoTable.innerHTML = "";

  // Crear encabezado
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const emptyTh = document.createElement("th");
  emptyTh.textContent = "Concepto";
  headerRow.appendChild(emptyTh);
  years.forEach(year => {
    const th = document.createElement("th");
    th.textContent = year;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  lineaTiempoTable.appendChild(thead);

  // Crear cuerpo
  const tbody = document.createElement("tbody");
  for (const concepto in dataConcepts) {
    const tr = document.createElement("tr");
    const tdConcepto = document.createElement("td");
    tdConcepto.textContent = concepto;
    tr.appendChild(tdConcepto);

    dataConcepts[concepto].forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }
  lineaTiempoTable.appendChild(tbody);

  // Tabla normal
  const normalBody = document.getElementById("normal-table-body");
  normalBody.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const tr = document.createElement("tr");

    const tdItem = document.createElement("td");
    tdItem.textContent = `Ítem ${i + 1}`;

    const tdValor = document.createElement("td");
    tdValor.textContent = (Math.random() * 1000).toFixed(2);

    tr.appendChild(tdItem);
    tr.appendChild(tdValor);
    normalBody.appendChild(tr);
  }

  // Crear gráfico de línea con Chart.js
  const ctx = document.getElementById('linea-tiempo-chart').getContext('2d');

  // Si ya existe un gráfico, destruirlo para evitar sobreposición
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: conceptos.map((concepto, index) => ({
        label: concepto,
        data: dataConcepts[concepto],
        borderColor: index === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        backgroundColor: 'transparent',
        tension: 0.3,
      })),
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Función para mostrar el contenido correcto según el botón
function mostrarContenido(num) {
  const boxes = document.querySelectorAll(".content-box");
  boxes.forEach(box => box.classList.remove("active"));
  document.getElementById(`contenido${num}`).classList.add("active");

  if (num === 1) {
    mostrarConsumo();
  }
}
// patron para cargar el consumo 
function addLoadEvent(func) {
  const oldonload = window.onload;
  if (typeof oldonload !== 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

addLoadEvent(mostrarConsumo);