const datos = [
  "Dato 1", "Dato 2", "Dato 3", "Dato 4", "Dato 5",
  "Dato 6", "Dato 7", "Dato 8", "Dato 9", "Dato 10",
  "Dato 11", "Dato 12", "Dato 13", "Dato 14", "Dato 15",
  "Dato 16", "Dato 17", "Dato 18", "Dato 19", "Dato 20"
];

function mostrarDatosEnColumnas() {
  const numDatos = datos.length;
  const numColumnas = Math.min(4, numDatos); // máximo 4 columnas
  const columnas = Array.from({ length: numColumnas }, () => []);

  // Repartir datos entre columnas (para distribución tipo columna)
  datos.forEach((dato, index) => {
    columnas[index % numColumnas].push(dato);
  });

  const row = document.getElementById("data-row");
  row.innerHTML = ""; // limpiar contenido previo

  columnas.forEach(col => {
    const colDiv = document.createElement("div");
    colDiv.className = `col-md-${12 / numColumnas}`;

    col.forEach(dato => {
      const p = document.createElement("p");
      p.textContent = dato;
      p.className = "data-item"; // clase para estilos
      colDiv.appendChild(p);
    });

    row.appendChild(colDiv);
  });
}

// patron para cargar los datos de las colmunas
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

addLoadEvent(mostrarDatosEnColumnas);
