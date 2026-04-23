
/* =========================
   STORAGE
   ========================= */

function getContactos() {
  return JSON.parse(localStorage.getItem("contactos")) || [];
}

function saveContactos(data) {
  localStorage.setItem("contactos", JSON.stringify(data));
}

/* =========================
   VCF (CONTACTO REAL)
   ========================= */

function generarVCF(nombre, telefono, correo) {
  return `BEGIN:VCARD
VERSION:3.0
FN:${nombre}
TEL:${telefono}
EMAIL:${correo || ""}
END:VCARD`;
}

/* =========================
   VALIDACIÓN GLOBAL
   ========================= */

function validarNumero(numero, pais) {
  try {
    const phone = libphonenumber.parsePhoneNumber(numero, pais);
    return phone.isValid() ? phone : false;
  } catch {
    return false;
  }
}