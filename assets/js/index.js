// Variables
let presupuesto = 0;
let gastos = [];
let saldo = 0;

// Función para calcular el presupuesto
const calcularPresupuesto = () => {
  const presupuestoInput = document.getElementById('presupuesto');
  presupuesto = parseFloat(presupuestoInput.value);
  document.getElementById('presupuesto-valor').innerText = presupuesto.toFixed(2);
  saldo = presupuesto;
  actualizarSaldo();
  presupuestoInput.value = '';
};

// Función para agregar un gasto
const agregarGasto = () => {
  const nombreInput = document.getElementById('nombre-gasto');
  const valorInput = document.getElementById('valor-gasto');
  const nombre = nombreInput.value;
  const valor = parseFloat(valorInput.value);

  if (nombre !== '' && !isNaN(valor) && valor > 0) {
    const gasto = { nombre, valor };
    gastos.push(gasto);
    actualizarGastos();
    saldo -= valor;
    actualizarSaldo();
    nombreInput.value = '';
    valorInput.value = '';
  }
};

// Función para actualizar la lista de gastos
const actualizarGastos = () => {
  const listaGastos = document.getElementById('lista');
  listaGastos.innerHTML = '';

  gastos.forEach((gasto, index) => {
    const { nombre, valor } = gasto;
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>${nombre}: $${valor.toFixed(2)}</div>
      <div class="borrar" onclick="borrarGasto(${index})">
      <i class="fa-solid fa-trash"></i>
      </div>
    `;
    listaGastos.appendChild(listItem);
  });
};

// Función para actualizar el saldo
const actualizarSaldo = () => {
  document.getElementById('gastos-valor').innerText = gastos.reduce((total, gasto) => total + gasto.valor, 0).toFixed(2);
  document.getElementById('saldo-valor').innerText = saldo.toFixed(2);
};

// Función para borrar un gasto
const borrarGasto = (index) => {
  gastos.splice(index, 1);
  actualizarGastos();
  saldo = presupuesto - gastos.reduce((total, gasto) => total + gasto.valor, 0);
  actualizarSaldo();
};

// Event listeners
document.getElementById('calcular').addEventListener('click', calcularPresupuesto);
document.getElementById('anadir-gasto').addEventListener('click', agregarGasto);
