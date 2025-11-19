// src/pages/register/qrUtils.js
import { Html5Qrcode } from "html5-qrcode";
import { httpClient } from "./httpClient";
//================================================== Inicializador de camara ==================================================
export const initQrScanner = (scannerRef, element) => {
	if (!scannerRef.current) {
		scannerRef.current = new Html5Qrcode(element);
	}
	return scannerRef.current;
};

//================================================== Detener y limpiar cámara ==================================================
export const stopQrScanner = async (scanner) => {
	if (!scanner) return;
	try {
		await scanner.stop();
		await scanner.clear();
	} catch (err) {
		console.warn("No había cámara corriendo:", err);
	}
};

//================================================== Procesar QR ==================================================
  export const processQR = async (qrText, setFormData, setIsQrValidated) => {
    if (qrText.startsWith("https://servicios.dae.ipn.mx/")) {
      console.log("Credencial de estudiante");
      await isAlumnoCredential(qrText, setFormData, setIsQrValidated);
    }
    else if (qrText.startsWith("https://www.dsapp.ipn.mx/")) {
      console.log("Credencial de empleado");
      await isEmpleadoCredential(qrText, setFormData, setIsQrValidated);
    }
    else{
      alert("El código QR no es un código QR válido.");
    }
  };
//================================================== Credencial de alumno ==================================================
const isAlumnoCredential = async (qrText, setFormData, setIsQrValidated) => {
  try {
    // --- Intento rápido ---
    let htmlCredential = await httpClient.post("/proxy/qrFast", { url: qrText });
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlCredential.data, "text/html");

    let boleta = doc.querySelector(".boleta")?.textContent.trim();
    let curp = doc.querySelector(".curp")?.textContent.trim();
    let nombreCompleto = doc.querySelector(".nombre")?.textContent.trim();
    let fotoSrc = doc.querySelector('img[width="60%"]')?.getAttribute("src");

    // --- Si los campos mínimos no están, intentar con qrSlow ---
    if (!nombreCompleto || !curp || !boleta) {
      console.log("Campos no encontrados en qrFast, intentando qrSlow...");
      htmlCredential = await httpClient.post("/proxy/qrSlow", { url: qrText });
      parser = new DOMParser();
      doc = parser.parseFromString(htmlCredential.data, "text/html");

      boleta = doc.querySelector(".boleta")?.textContent.trim();
      curp = doc.querySelector(".curp")?.textContent.trim();
      nombreCompleto = doc.querySelector(".nombre")?.textContent.trim();
      fotoSrc = doc.querySelector('img[width="60%"]')?.getAttribute("src");


      if (!nombreCompleto || !curp || !boleta) {
        throw new Error("No se pudieron obtener los datos del QR ni con qrFast ni con qrSlow");
      }
    }

    // 🔹 Usar tu función para separar nombre y apellidos
    if (nombreCompleto && curp) {
      const { nombres, apellidoPaterno, apellidoMaterno } = separarNombrePorCURP(nombreCompleto, curp);
      setFormData(prev => ({
        ...prev,
        nombre: nombres,
        apellidoP: apellidoPaterno,
        apellidoM: apellidoMaterno,
        boleta: boleta,
        foto: fotoSrc || "/src/assets/images/noUsrPhoto.png",
        rol: 'ESTUDIANTE'
      }));
    } else {
      // Si no hay nombre o CURP, solo llenar boleta
      setFormData(prev => ({ ...prev, boleta }));
    }

    setIsQrValidated(true);

  } catch (err) {
    console.error("Error al obtener datos del QR (alumno):", err);
    // Opcional: setIsQrValidated(false);
  }
};

//================================================== Credencial de empleado ==================================================
const isEmpleadoCredential = async (qrText, setFormData, setIsQrValidated) => {
  try {
    // --- Intento rápido ---
    let htmlCredential = await httpClient.post("/proxy/qrFast", { url: qrText });
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlCredential.data, "text/html");

    // Función para extraer campos
    const getFieldValue = (labelText) => {
      const strong = [...doc.querySelectorAll("span.card strong")]
        .find(el => el.textContent.replace(/\s+/g, "").startsWith(labelText.replace(/\s+/g, "")));
      if (!strong) return null;
      const span = strong.parentElement;
      let node = span.nextSibling;
      while (node && node.nodeType !== 1) node = node.nextSibling;
      if (node && node.classList.contains("input-group")) return node.textContent.trim();
      return null;
    };

    let nombreCompleto = getFieldValue("Nombre");
    let numeroEmpleado = getFieldValue("Númerodeempleado");

    // --- Si los campos mínimos no están, intentar con qrSlow ---
    if (!nombreCompleto || !numeroEmpleado) {
      console.log("Campos no encontrados en qrFast, intentando qrSlow...");
      htmlCredential = await httpClient.post("/proxy/qrSlow", { url: qrText });
      parser = new DOMParser();
      doc = parser.parseFromString(htmlCredential.data, "text/html");
      nombreCompleto = getFieldValue("Nombre");
      numeroEmpleado = getFieldValue("Númerodeempleado");
      if (!nombreCompleto || !numeroEmpleado) {
        throw new Error("No se pudieron obtener los datos del QR ni con qrFast ni con qrSlow");
      }
    }

    // Foto
    const src = doc.querySelector("img.estilo_foto")?.getAttribute("src");
    const foto = src ? "https://www.dsapp.ipn.mx/" + src : "";

    // Separar nombres como alumno, pero sin CURP
    const { nombres, apellidoPaterno, apellidoMaterno } = separarNombrePorCURP(nombreCompleto, null);
    const rol = await promptTipoEmpleado();
    // Setear en formData
    setFormData(prev => ({
      ...prev,
      nombre: nombres,
      apellidoP: apellidoPaterno,
      apellidoM: apellidoMaterno,
      boleta: numeroEmpleado,
      foto: foto,
      rol: rol
    }));

    setIsQrValidated(true);

  } catch (err) {
    console.error("Error al obtener datos del QR (empleado):", err);
    // Opcional: setIsQrValidated(false);
  }
};

//================================================== Separar nombre completo por CURP ==================================================
function separarNombrePorCURP(nombreCompleto, curp = null) {
	// Caso sin nombre o vacío
	if (!nombreCompleto) {
		return { nombres: "", apellidoPaterno: "", apellidoMaterno: "" };
	}

	// Normalizar
	const partes = nombreCompleto.trim().split(/\s+/);

	// Si NO hay CURP → separación básica
	if (!curp || curp.length < 4) {
		if (partes.length === 1) {
			return {
				nombres: partes[0],
				apellidoPaterno: "",
				apellidoMaterno: ""
			};
		}

		if (partes.length === 2) {
			return {
				nombres: partes[0],
				apellidoPaterno: partes[1],
				apellidoMaterno: ""
			};
		}

		// 3 o más
		const apellidoMaterno = partes.pop();
		const apellidoPaterno = partes.pop();
		const nombres = partes.join(" ");

		return { nombres, apellidoPaterno, apellidoMaterno };
	}

	// ------------------------------------------------------------
	// 🟢 Aquí va tu lógica EXACTA cuando sí existe CURP
	// ------------------------------------------------------------

	const particulas = ["de", "del", "de la", "la", "los", "las", "y"];
	if (partes.length === 1)
		return { nombres: partes[0], apellidoPaterno: "", apellidoMaterno: "" };
	if (partes.length === 2)
		return { nombres: partes[0], apellidoPaterno: partes[1], apellidoMaterno: "" };

	const inicialPaternoCURP = curp[0].toUpperCase();

	let apellidoMaterno = partes.pop();
	let apellidoPaterno = partes.pop();

	while (partes.length && particulas.includes(partes[partes.length - 1].toLowerCase())) {
		apellidoPaterno = partes.pop() + " " + apellidoPaterno;
	}

	let nombres = partes.join(" ");

	if (apellidoPaterno[0].toUpperCase() !== inicialPaternoCURP && nombres.length > 0) {
		const primera = nombres.split(" ")[0];
		apellidoPaterno = primera + " " + apellidoPaterno;
		nombres = nombres.split(" ").slice(1).join(" ");
	}

	return { nombres, apellidoPaterno, apellidoMaterno };
}

//======================================================================================================================================================
function promptTipoEmpleado() {
  return new Promise((resolve) => {
    // Crear overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = 10000;

    // Crear modal
    const modal = document.createElement("div");
    modal.style.backgroundColor = "#fff";
    modal.style.padding = "25px 30px";
    modal.style.borderRadius = "12px";
    modal.style.textAlign = "center";
    modal.style.minWidth = "280px";
    modal.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
    modal.style.fontFamily = "Arial, sans-serif";

    const title = document.createElement("p");
    title.textContent = "Elige tu tipo de empleado:";
    title.style.fontSize = "18px";
    title.style.fontWeight = "600";
    title.style.marginBottom = "20px";
    modal.appendChild(title);

    // Botones con estilo
    const createButton = (text, color) => {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.style.margin = "8px";
      btn.style.padding = "10px 22px";
      btn.style.border = "none";
      btn.style.borderRadius = "6px";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "14px";
      btn.style.fontWeight = "500";
      btn.style.backgroundColor = color;
      btn.style.color = "#fff";
      btn.style.transition = "all 0.2s ease";

      btn.onmouseenter = () => (btn.style.backgroundColor = shadeColor(color, -15));
      btn.onmouseleave = () => (btn.style.backgroundColor = color);

      return btn;
    };

    // Función para oscurecer color en hover
    const shadeColor = (color, percent) => {
      const f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent;
      const R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#" + (0x1000000 + (Math.round((t-R)*p/100)+R)*0x10000 + (Math.round((t-G)*p/100)+G)*0x100 + (Math.round((t-B)*p/100)+B)).toString(16).slice(1);
    };

    const btnDocente = createButton("DOCENTE", "#007bff");
    btnDocente.onclick = () => {
      document.body.removeChild(overlay);
      resolve("DOCENTE");
    };

    const btnAdministrativo = createButton("ADMINISTRATIVO", "#28a745");
    btnAdministrativo.onclick = () => {
      document.body.removeChild(overlay);
      resolve("ADMINISTRATIVO");
    };

    modal.appendChild(btnDocente);
    modal.appendChild(btnAdministrativo);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
}

