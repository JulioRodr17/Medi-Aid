import React, { useState, useRef, useEffect } from "react";
import './QrModal.css';
import { initQrScanner, stopQrScanner, processQR } from "../../services/QRScanner";

const QrModal = ({ isOpen, onClose, setFormData, setIsQrValidated }) => {
  const [isQrLoading, setIsQrLoading] = useState(false);
  const scannerRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 550, width: "90%", padding: 20, borderRadius: 10, textAlign: "center" }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div id="reader" style={{ maxWidth: 500, maxHeight: 400, margin: "0 auto" }}> </div>
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
