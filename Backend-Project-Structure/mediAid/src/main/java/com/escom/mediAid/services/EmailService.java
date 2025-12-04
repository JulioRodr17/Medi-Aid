package com.escom.mediAid.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.rutaReact}") 
    private String rutaReact;

    public void sendVerificationEmail(String toEmail, String token) {
    	System.out.println("Valor de rutaReact = " + rutaReact);
        try {
            String subject = "Verifica tu correo";
            String verificationUrl = rutaReact + "/verify?token=" + token;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            String htmlBody = """
            <html>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5;">
                <div style="background-color:#0052cc; padding:20px; text-align:left;">
				    <a href="%s" style="text-decoration:none; display:inline-block; vertical-align:middle;">
				        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
				            <tr>
				                <td style="vertical-align:middle; padding-right:10px;">
				                    <img src="cid:logoImage" alt="MediAid Logo" style="height:60px; display:block; border-radius:50%%;">
				                </td>
				                <td style="vertical-align:middle;">
				                    <h1 style="color:white; margin:0; font-size:28px; font-weight:bold;">
				                        MediAid
				                    </h1>
				                </td>
				            </tr>
				        </table>
				    </a>
				</div>


                <div style="background:#ffffff; margin:20px auto; padding:25px; max-width:600px; border-radius:8px;">
                    <h2 style="color:#333333; font-size:22px; margin-top:0;">¡Bienvenido!</h2>

                    <p style="color:#444444; font-size:15px; line-height:1.6;">
                        Gracias por registrarte en <strong>MediAid</strong>.
                    </p>

                    <p style="color:#444444; font-size:15px; line-height:1.6;">
                        Para activar tu cuenta, da clic en el siguiente botón:
                    </p>
                    
                    <p style="text-align:center; margin:25px 0;">
                        <a href="%s"
                           style="background-color:#0052cc; padding:12px 25px; color:white;
                                  font-size:15px; font-weight:bold; text-decoration:none;
                                  border-radius:6px; display:inline-block;">
                           Verificar mi cuenta
                        </a>
                    </p>

                    <p style="color:#777777; font-size:13px; line-height:1.6;">
                        Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:<br>
                        %s
                    </p>
                    
                    <p style="font-size:15px; color:#333333; margin-top:30px;">
                        Atentamente,<br>
                        <strong>Equipo MediAid</strong>
                    </p>
                </div>

                <div style="text-align:center; font-size:12px; color:#777777; padding:10px;">
                    © MediAid – Todos los derechos reservados.
                </div>
            </body>
            </html>
            """.formatted(rutaReact, verificationUrl, verificationUrl);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            // Adjuntar imagen embebida usando ClassPathResource
            ClassPathResource logo = new ClassPathResource("static/logoMediAid.jpeg");
            helper.addInline("logoImage", logo);

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            String subject = "Restablece tu contraseña";
            String resetUrl = rutaReact + "/restablecerContrasena?token=" + token; // URL de tu front para reset

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            String htmlBody = """
            <html>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5;">
                <div style="background-color:#0052cc; padding:20px; text-align:left;">
                    <a href="%s" style="text-decoration:none; display:inline-block; vertical-align:middle;">
                        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                            <tr>
                                <td style="vertical-align:middle; padding-right:10px;">
                                    <img src="cid:logoImage" alt="MediAid Logo" style="height:60px; display:block; border-radius:50%%;">
                                </td>
                                <td style="vertical-align:middle;">
                                    <h1 style="color:white; margin:0; font-size:28px; font-weight:bold;">
                                        MediAid
                                    </h1>
                                </td>
                            </tr>
                        </table>
                    </a>
                </div>

                <div style="background:#ffffff; margin:20px auto; padding:25px; max-width:600px; border-radius:8px;">
                    <h2 style="color:#333333; font-size:22px; margin-top:0;">Restablece tu contraseña</h2>

                    <p style="color:#444444; font-size:15px; line-height:1.6;">
                        Hemos recibido una solicitud para restablecer tu contraseña, si no has sido tú, puedes ignorar este correo.
                    </p>

                    <p style="text-align:center; margin:25px 0;">
                        <a href="%s"
                           style="background-color:#0052cc; padding:12px 25px; color:white;
                                  font-size:15px; font-weight:bold; text-decoration:none;
                                  border-radius:6px; display:inline-block;">
                           Restablecer mi contraseña
                        </a>
                    </p>

                    <p style="color:#777777; font-size:13px; line-height:1.6;">
                        Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:<br>
                        %s
                    </p>

                    <p style="font-size:15px; color:#333333; margin-top:30px;">
                        Atentamente,<br>
                        <strong>Equipo MediAid</strong>
                    </p>
                </div>

                <div style="text-align:center; font-size:12px; color:#777777; padding:10px;">
                    © MediAid – Todos los derechos reservados.
                </div>
            </body>
            </html>
            """.formatted(resetUrl, resetUrl, resetUrl);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            // Adjuntar imagen embebida
            ClassPathResource logo = new ClassPathResource("static/logoMediAid.jpeg");
            helper.addInline("logoImage", logo);

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
