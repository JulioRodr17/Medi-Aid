import React, { useState, useRef, useEffect } from "react";
import './QrModal.css';
import { initQrScanner, stopQrScanner, processQR } from "../../services/QRScanner";

const QrModal = ({ isOpen, onClose, setFormData, setIsQrValidated }) => {
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // zoom inicial
  const [canZoom, setCanZoom] = useState(false); // <- AGREGAR ESTO
  const scannerRef = useRef(null);
  
// ================================================== EFECTO DE INICIALIZACION ==================================================
  useEffect(() => {
    if (!isOpen) return;

    const initScanner = async () => {
      const scanner = initQrScanner(scannerRef, "reader");
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 400 },
          async (decodedText) => {
            setIsQrLoading(true);
            if (scannerRef.current) {
              await stopQrScanner(scannerRef.current);
              scannerRef.current = null;
            }
            await processQR(decodedText, setFormData, setIsQrValidated);
            setIsQrLoading(false);
          }
        );
      } catch (err) {
	   onClose();
        console.error("Error al iniciar cámara:", err);
        setIsQrLoading(false);
	   alert("No se detectó la camara en el dispositivo");
      }
    };

    initScanner();

    return async () => {
      if (scannerRef.current) {
		await stopQrScanner(scannerRef.current);
		scannerRef.current = null;
	 }
	 onClose();
    };
  }, [isOpen, setFormData, setIsQrValidated, onClose]);

// ================================================== EFECTO DE PRUEBA DE COLOCAR EL ZOOM ==================================================
  useEffect(() => {
    let cancelled = false;

    const applyZoom = async () => {
      const video = document.querySelector("#reader video");
      if (!video || !video.srcObject) {
        // Si no hay video aún, reintentar después de 200ms
        if (!cancelled) setTimeout(applyZoom, 200);
        return;
      }

      const [videoTrack] = video.srcObject.getVideoTracks();
      const capabilities = videoTrack.getCapabilities();

      if (capabilities.zoom) {
        if (!canZoom) setCanZoom(true);
        // Ajustar zoomLevel inicial si es menor que el mínimo soportado
        const minZoom = capabilities.zoom.min || 1;
        if (zoomLevel < minZoom) setZoomLevel(minZoom);

        videoTrack.applyConstraints({ advanced: [{ zoom: zoomLevel }] })
          .catch(err => console.warn("Zoom no aplicable:", err));
      } else {
        setCanZoom(false);
      }
    };

    applyZoom();

    return () => { cancelled = true };
  }, [zoomLevel, canZoom]);

// ================================================== RETORNA EL ELMENTO HTML ==================================================
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 550, width: "90%", padding: 20, borderRadius: 10, textAlign: "center" }}>
        <button className="modal-close" onClick={onClose}>×</button>

        {canZoom && (
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(Number(e.target.value))}
            style={{ width: '80%', margin: '10px 0' }}
          />
        )}

        <div id="reader" style={{ maxWidth: 500, maxHeight: 400, margin: "0 auto" }}></div>

        {isQrLoading && (
          <div className="qr-loading">
            <div className="qr-spinner"></div>
            <p className="qr-loading-text">Cargando...</p>
            <p className="qr-subtext">Esto podría demorar algunos segundos, por favor espere.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrModal;
