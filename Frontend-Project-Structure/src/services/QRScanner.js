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
  export const processQR = async (qrText, scanner, setFormData, setIsQrValidated) => {
    if (qrText.startsWith("https://servicios.dae.ipn.mx/")) {
      console.log("Credencial de estudiante");
      await stopQrScanner(scanner);
      await isAlumnoCredential(qrText, setFormData, setIsQrValidated);
    }
    else{
      alert("El código QR no es un código QR válido.");
      await stopQrScanner(scanner);
    }
  };
//================================================== Credencial de alumno ==================================================
const isAlumnoCredential = async (qrText, setFormData, setIsQrValidated) => {
    try {
      const htmlCredential = await httpClient.post("/proxy/qr", { url: qrText });

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCredential.data, "text/html");

      const boleta = doc.querySelector(".boleta")?.textContent.trim();
      const curp = doc.querySelector(".curp")?.textContent.trim();
      const nombreCompleto = doc.querySelector(".nombre")?.textContent.trim();

      // 🔹 Usar tu función para separar nombre y apellidos
      if (nombreCompleto && curp) {
        const { nombres, apellidoPaterno, apellidoMaterno } = separarNombrePorCURP(nombreCompleto, curp);
        setFormData(prev => ({
          ...prev,
          nombre: nombres,
          apellidoP: apellidoPaterno,
          apellidoM: apellidoMaterno,
          boleta: boleta,
          rol: 'ESTUDIANTE'
        }));
      } else {
        // Si no hay nombre o CURP, solo llenar boleta
        setFormData(prev => ({ ...prev, boleta }));
      }

      setIsQrValidated(true);
    } catch (err) {
      console.error("Error al obtener datos del QR:", err);
    }
};

//================================================== Separar nombre completo por CURP ==================================================
function separarNombrePorCURP(nombreCompleto, curp) {
	if (!nombreCompleto || !curp || curp.length < 4) {
		return { nombres: nombreCompleto, apellidoPaterno: "", apellidoMaterno: "" };
	}

	const particulas = ["de", "del", "de la", "la", "los", "las", "y"];
	const partes = nombreCompleto.trim().split(/\s+/);

	if (partes.length === 1) return { nombres: partes[0], apellidoPaterno: "", apellidoMaterno: "" };
	if (partes.length === 2) return { nombres: partes[0], apellidoPaterno: partes[1], apellidoMaterno: "" };

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