package com.escom.mediAid.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    
    
    public String guardarImagenNoticia(Integer noticiaId, MultipartFile imagen) throws IOException {

        String nombreArchivo = "slide_" + noticiaId + ".jpg";

        String ruta = System.getProperty("user.dir")
                + File.separator + "public"
                + File.separator + "Noticias";

        File carpeta = new File(ruta);
        if (!carpeta.exists()) {
            carpeta.mkdirs();
        }

        Path path = Paths.get(ruta, nombreArchivo);

        BufferedImage original = ImageIO.read(imagen.getInputStream());
        if (original == null) {
            throw new IOException("El archivo no es una imagen válida");
        }

        BufferedImage jpgImage = new BufferedImage(
                original.getWidth(),
                original.getHeight(),
                BufferedImage.TYPE_INT_RGB
        );

        Graphics2D graphics = jpgImage.createGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, original.getWidth(), original.getHeight());
        graphics.drawImage(original, 0, 0, null);
        graphics.dispose();

        ImageIO.write(jpgImage, "jpg", path.toFile());

        // ESTA ES LA URL QUE SE GUARDARÁ EN BD
        return "/public/Noticias/" + nombreArchivo;
    }

}
