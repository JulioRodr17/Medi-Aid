package com.escom.mediAid.services;

import org.springframework.stereotype.Service;
import java.io.*;
import java.util.Base64;

@Service
public class FotoService {

    public String guardarUsrPhotoBas64(String boleta, String base64) {
        try {
            // Quitar encabezado data:image/jpeg;base64,
            String cleanBase64 = base64.replaceFirst("^data:image/\\w+;base64,", "");
            byte[] decoded = Base64.getDecoder().decode(cleanBase64);

            // Carpeta donde guardar
            String folderPath = "public/UserPhotos";
            File folder = new File(folderPath);
            if (!folder.exists()) folder.mkdirs();

            String fileName = boleta + ".jpg";
            File file = new File(folder, fileName);

            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(decoded);
            }

            // Ruta pública para guardar en BD
            return "/public/UserPhoto/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("Error guardando la foto del usuario", e);
        }
    }
}
