import React from 'react';
import './AvisoDePrivacidad.css';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose} >
      <div className="modal-content"  onClick={handleContentClick}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-Privacy">

          <h3>Política de Uso y Privacidad de Datos para el Proyecto de Donación de Medicamentos Cerrados al Servicio Médico</h3>

          <p><strong>Versión 1.0</strong><br />
          <strong>Fecha de emisión:</strong> 04 de Diciembre de 2025<br />
          <strong>Proyecto:</strong> Trabajo Terminal de la Escuela Superior de Cómputo (ESCOM), Instituto Politécnico Nacional (IPN) – Plataforma de Donación de Medicamentos No Utilizados (Cerrados) al Servicio Médico del IPN.<br />
          <strong>Responsable:</strong> MediAid, en representación del proyecto académico, con domicilio en la ESCOM-IPN, Av. Juan de Dios Bátiz s/n, Unidad Profesional Adolfo López Mateos, Zacatenco, Gustavo A. Madero, C.P. 07738, Ciudad de México.<br />
          <strong>Contacto:</strong> escomediaid@gmail.com | Teléfono: 5557296000 52014</p>

          <p>Esta Política de Uso y Privacidad de Datos (en adelante, "Política") regula el tratamiento de datos personales en el marco del proyecto de donación de medicamentos cerrados (no abiertos, no caducados y en buen estado) destinados al Servicio Médico del IPN. El proyecto busca facilitar la recolección segura y eficiente de donaciones de medicamentos no utilizados por estudiantes, personal y comunidad politécnica, para su redistribución a beneficiarios del servicio médico institucional, promoviendo la sostenibilidad y el apoyo a la salud comunitaria.</p>

          <p>Esta Política se alinea con la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</em>, la <em>Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO)</em> –aplicable al IPN como sujeto obligado–, y las directrices del Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI). Como proyecto académico, se integra al Aviso de Privacidad Integral del IPN.</p>

          <h4>1. Identificación del Responsable del Tratamiento de Datos</h4>
          <p>El responsable del tratamiento de datos personales es el equipo del proyecto de Trabajo Terminal de ESCOM-IPN (en adelante, "Responsable"). Actúa como extensión del IPN para fines académicos y operativos. El Oficial de Protección de Datos Personales del IPN supervisará el cumplimiento general.</p>

          <h4>2. Datos Personales Recabados</h4>
          <p>En el proceso de donación, se recabarán los siguientes datos personales de los donantes (titulares), de manera voluntaria y limitada al mínimo necesario:</p>
          <ul>
            <li><strong>Datos de identificación básica:</strong> Nombre completo, matrícula o número de empleado (si aplica), correo electrónico institucional o personal. Finalidad: Identificar al donante y validar su vinculación con la comunidad IPN.</li>
            <li><strong>Datos de contacto:</strong> Teléfono, dirección física (opcional, solo para recogida de donaciones). Finalidad: Coordinar la entrega o recogida de medicamentos.</li>
            <li><strong>Datos sobre la donación:</strong> Descripción de medicamentos (nombre, cantidad, fecha de caducidad, lote), foto o escaneo de empaque (anonimizada). Finalidad: Verificar el estado de los medicamentos y registrar la donación para trazabilidad.</li>
            <li><strong>Datos sensibles (salud):</strong> Información sobre prescripciones médicas o condiciones de salud (solo si el donante lo proporciona voluntariamente). Finalidad: Asegurar que los medicamentos sean aptos para redistribución; se tratan con máximo secreto profesional.</li>
          </ul>
          <p>No se recabarán datos de menores de edad sin consentimiento de padres o tutores. Los datos de medicamentos no incluyen información de receptores finales para preservar anonimato.</p>

          <h4>3. Finalidades del Tratamiento de Datos</h4>
          <p>Los datos se tratarán exclusivamente para las siguientes finalidades primarias:</p>
          <ul>
            <li>Gestión de donaciones: Registrar, validar y coordinar la recepción, almacenamiento y distribución de medicamentos al Servicio Médico del IPN.</li>
            <li>Trazabilidad y seguridad: Verificar el cumplimiento de normas sanitarias (COFEPRIS) para donaciones de medicamentos no controlados, asegurando que sean cerrados y no caducados.</li>
            <li>Reportes académicos: Análisis agregado (anonimizado) para el Trabajo Terminal, como volumen de donaciones o impacto en el servicio médico.</li>
            <li>Mejora del proyecto: Envío de confirmaciones, agradecimientos o actualizaciones sobre el uso de la donación.</li>
          </ul>
          <p>Finalidades secundarias (opcionales): Contacto para futuras campañas de donación, con consentimiento expreso.</p>

          <h4>4. Base Legal y Consentimiento</h4>
          <ul>
            <li>Consentimiento expreso del titular (art. 8 LFPDPPP).</li>
            <li>Interés legítimo para fines académicos y de salud pública (art. 16 LGPDPPSO).</li>
            <li>Cumplimiento de obligaciones institucionales del IPN.</li>
          </ul>
          <p>El consentimiento se obtiene mediante formulario digital o físico al momento de la donación, con opción de revocación en cualquier momento. Para datos sensibles de salud, se aplica secreto médico (art. 79 LFPDPPP).</p>

          <h4>5. Transferencia de Datos</h4>
          <ul>
            <li>Interna: Datos se comparten solo con el Servicio Médico del IPN y la Dirección de Protección de Datos del IPN para validación y distribución.</li>
            <li>Externa: No se transferirán a terceros sin consentimiento, salvo requerimientos legales.</li>
            <li>Internacional: No aplica.</li>
          </ul>

          <h4>6. Medidas de Seguridad</h4>
          <ul>
            <li>Almacenamiento en servidores seguros del IPN o plataformas encriptadas.</li>
            <li>Acceso restringido por roles.</li>
            <li>Encriptación de datos en tránsito y reposo.</li>
            <li>Auditorías periódicas durante el proyecto.</li>
          </ul>
          <p>En caso de brecha de seguridad, se notificará al INAI y a los titulares en 72 horas.</p>

          <h4>7. Derechos ARCO y Procedimiento</h4>
          <ul>
            <li>Cómo ejercerlos: Envía solicitud por correo a [donacionmedicamentos@escom.ipn.mx] o al Oficial de Datos del IPN, con identificación oficial. Respuesta en máximo 20 días hábiles.</li>
            <li>Revocación: Para optar out de comunicaciones, usa el enlace en correos o solicita por escrito.</li>
            <li>Quejas: Ante el INAI si no se resuelve.</li>
          </ul>

          <h4>8. Uso de la Plataforma y Obligaciones del Usuario</h4>
          <ul>
            <li>Uso permitido: Solo para donaciones legítimas de medicamentos cerrados, no controlados.</li>
            <li>Prohibiciones: No donar medicamentos abiertos, caducados o recetados para otros.</li>
            <li>Responsabilidad: El donante es responsable de la veracidad de la información.</li>
            <li>Duración de retención: Datos se conservan 5 años, luego se cancelan.</li>
          </ul>

          <h4>9. Cambios a la Política</h4>
          <p>Esta Política puede actualizarse; notificaciones se enviarán por correo. La versión vigente se publica en la plataforma del proyecto.</p>

          <h4>10. Aceptación</h4>
          <p>Al participar en la donación, aceptas esta Política. Para dudas, contacta al Responsable.</p>

          <p><strong>Referencias normativas clave:</strong><br />
          - LFPDPPP (DOF 05/07/2010)<br />
          - LGPDPPSO (DOF 26/01/2017)<br />
          - Aviso de Privacidad IPN<br />
          - Guías INAI para datos en salud</p>

        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
