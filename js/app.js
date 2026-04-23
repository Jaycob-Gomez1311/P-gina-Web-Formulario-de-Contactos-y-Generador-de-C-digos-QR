
const form = document.getElementById("form");
const paisSelect = document.getElementById("pais");
const qrDiv = document.getElementById("qr");
const descargarBtn = document.getElementById("descargar");

let canvasQR;

/* =========================
   PAÍSES
   ========================= */

const countryNames = {
  DO: "🇩🇴 República Dominicana",
  US: "🇺🇸 Estados Unidos",
  MX: "🇲🇽 México",
  ES: "🇪🇸 España",
  AR: "🇦🇷 Argentina",
  CO: "🇨🇴 Colombia",
  CL: "🇨🇱 Chile",
  PE: "🇵🇪 Perú",
  BR: "🇧🇷 Brasil",
  FR: "🇫🇷 Francia",
  DE: "🇩🇪 Alemania",
  IT: "🇮🇹 Italia",
  GB: "🇬🇧 Reino Unido",
  CA: "🇨🇦 Canadá"
};

Object.keys(countryNames).forEach(code => {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = countryNames[code];
  paisSelect.appendChild(option);
});

/* =========================
   SUBMIT
   ========================= */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const pais = paisSelect.value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;

  const valido = validarNumero(telefono, pais);

  if (!valido) {
    alert("Número inválido");
    return;
  }

  const vcf = generarVCF(nombre, valido.number, correo);

  QRCode.toCanvas(vcf, { width: 220 }, (err, canvas) => {

    qrDiv.innerHTML = "";
    qrDiv.appendChild(canvas);

    canvasQR = canvas;
    descargarBtn.classList.remove("hidden");
  });

  const contactos = getContactos();

  contactos.push({
    nombre,
    telefono: valido.number,
    correo,
    pais
  });

  saveContactos(contactos);
  form.reset();
});

/* =========================
   DESCARGAR QR
   ========================= */

descargarBtn.addEventListener("click", () => {
  const a = document.createElement("a");
  a.download = "contacto.png";
  a.href = canvasQR.toDataURL();
  a.click();
});