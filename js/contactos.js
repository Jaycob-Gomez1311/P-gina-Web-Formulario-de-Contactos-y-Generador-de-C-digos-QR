
let editIndex = null;
const lista = document.getElementById("lista");

document.addEventListener("DOMContentLoaded", render);

/* =========================
   RENDER
   ========================= */

function render() {
  const contactos = getContactos();
  lista.innerHTML = "";

  contactos.forEach((c, i) => {

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${c.nombre}</strong><br>
      📞 ${c.telefono}<br>
      ✉️ ${c.correo || ""}

      <br><br>

      <button onclick="generarQR(${i})">QR</button>
      <button onclick="editar(${i})">Editar</button>
      <button onclick="eliminar(${i})">Eliminar</button>

      <div id="qr-${i}"></div>
    `;

    lista.appendChild(div);
  });
}

/* =========================
   QR
   ========================= */

function generarQR(i) {
  const c = getContactos()[i];
  const vcf = generarVCF(c.nombre, c.telefono, c.correo);

  QRCode.toCanvas(vcf, { width: 150 }, (err, canvas) => {

    const cont = document.getElementById(`qr-${i}`);
    cont.innerHTML = "";
    cont.appendChild(canvas);

    const btn = document.createElement("button");
    btn.textContent = "Descargar";

    btn.onclick = () => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = "qr.png";
      a.click();
    };

    cont.appendChild(btn);
  });
}

/* =========================
   ELIMINAR
   ========================= */

function eliminar(i) {
  const contactos = getContactos();
  contactos.splice(i, 1);
  saveContactos(contactos);
  render();
}

/* =========================
   EDITAR
   ========================= */

function editar(i) {
  const c = getContactos()[i];

  editIndex = i;

  editNombre.value = c.nombre;
  editTelefono.value = c.telefono;
  editCorreo.value = c.correo;

  modal.classList.remove("hidden");
}

/* =========================
   GUARDAR
   ========================= */

guardarEdit.onclick = () => {

  const contactos = getContactos();

  contactos[editIndex] = {
    ...contactos[editIndex],
    nombre: editNombre.value,
    telefono: editTelefono.value,
    correo: editCorreo.value
  };

  saveContactos(contactos);

  modal.classList.add("hidden");

  render();
};

/* =========================
   CERRAR
   ========================= */

cerrarModal.onclick = () => {
  modal.classList.add("hidden");
};