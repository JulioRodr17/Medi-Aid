package com.escom.mediAid.services;

import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.dtos.LoginDTO;
import com.escom.mediAid.dtos.UsuarioDTO;
import com.escom.mediAid.models.Rol;
import com.escom.mediAid.repositories.UsuarioRepository;
import com.escom.mediAid.security.JwtUtil;
import com.escom.mediAid.repositories.RolRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;
    private final RolRepository rolRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private FotoService fotoService;

    public UsuarioService(UsuarioRepository usuarioRepo, RolRepository rolRepo) {
        this.usuarioRepo = usuarioRepo;
        this.rolRepo = rolRepo;
    }

    public List<Usuario> listar() {
        return usuarioRepo.findAll();
    }

    public Optional<Usuario> buscarPorCorreo(String correo) {
        return usuarioRepo.findByCorreo(correo);
    }

    public Optional<Usuario> buscarPorBoleta(String boleta) {
        return usuarioRepo.findByBoleta(boleta);
    }

    public Map<String, Object> registrar(UsuarioDTO dto) {
        // --- Validaciones ---
        if (dto.getNombre() == null || dto.getNombre().trim().isEmpty())
            throw new IllegalArgumentException("El nombre es obligatorio");

        if (dto.getApellidoPaterno() == null || dto.getApellidoPaterno().trim().isEmpty())
            throw new IllegalArgumentException("El apellido paterno es obligatorio");

        if (dto.getBoleta() == null || !Pattern.matches("^[0-9]{4,20}$", dto.getBoleta()))
            throw new IllegalArgumentException("Boleta inválida");

        if (dto.getCorreo() == null || !Pattern.matches("^[\\w-.]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,4}$", dto.getCorreo()))
            throw new IllegalArgumentException("Correo inválido");

        if (dto.getTelefono() != null && !dto.getTelefono().trim().isEmpty()) {
            if (!Pattern.matches("^(\\+52)?\\s?\\d{10}$", dto.getTelefono()))
                throw new IllegalArgumentException("Teléfono inválido");
            if (usuarioRepo.existsByTelefono(dto.getTelefono()))
                throw new IllegalArgumentException("Teléfono ya registrado");
        }

        if (usuarioRepo.existsByCorreo(dto.getCorreo()))
            throw new IllegalArgumentException("Correo ya registrado");

        if (usuarioRepo.existsByBoleta(dto.getBoleta()))
            throw new IllegalArgumentException("Boleta ya registrada");

        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,}$";
        if (!Pattern.matches(passwordRegex, dto.getContrasena()))
            throw new IllegalArgumentException("La contraseña no cumple con los requisitos de seguridad");

        // --- Hash de la contraseña ---
        String hashedPassword = passwordEncoder.encode(dto.getContrasena());

        // --- Buscar el Rol ---
        Rol rol = rolRepo.findByNombreRol(dto.getRol())
                .orElseThrow(() -> new IllegalArgumentException("Rol no válido: " + dto.getRol()));

        // --- Crear la entidad Usuario ---
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellidoPaterno(dto.getApellidoPaterno());
        usuario.setApellidoMaterno(dto.getApellidoMaterno());
        usuario.setBoleta(dto.getBoleta());
        usuario.setCorreo(dto.getCorreo());
        usuario.setTelefono(dto.getTelefono());
        usuario.setContrasena(hashedPassword);
        usuario.setRol(rol);
        
        String foto = dto.getFoto();
        String rutaFotoFinal;
        if (foto != null && (foto.startsWith("http://") || foto.startsWith("https://"))) rutaFotoFinal = foto;
        else if (foto != null && foto.startsWith("data:image")) rutaFotoFinal = fotoService.guardarUsrPhotoBas64(dto.getBoleta(), foto);
        else rutaFotoFinal = "UserPhotos/default.png";
        usuario.setFoto(rutaFotoFinal);

        // --- Guardar en BD ---
        usuarioRepo.save(usuario);

        // --- Generar token JWT ---
        String token = JwtUtil.generateToken(
                usuario.getId(),
                usuario.getRol().getNombreRol(),
                usuario.getRol().getAdmin()
        );

        // --- Construir respuesta (igual que login) ---
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", usuario.getId());
        userData.put("nombre", usuario.getNombre());
        userData.put("apellidoPaterno", usuario.getApellidoPaterno());
        userData.put("apellidoMaterno", usuario.getApellidoMaterno());
        userData.put("boleta", usuario.getBoleta());
        userData.put("correo", usuario.getCorreo());
        userData.put("telefono", usuario.getTelefono());
        userData.put("foto", usuario.getFoto());
        userData.put("rol", usuario.getRol().getNombreRol());
        userData.put("admin", usuario.getRol().getAdmin());
        userData.put("fechaCreacion", usuario.getFechaCreacion());
        userData.put("token", token);

        return userData;
    }

    
    public Map<String, Object> login(LoginDTO loginDTO) {
        Usuario usuario = usuarioRepo.findByCorreo(loginDTO.getCorreo())
                .orElseThrow(() -> new IllegalArgumentException("El correo no se encuentra registrado"));

        if (!passwordEncoder.matches(loginDTO.getContrasena(), usuario.getContrasena())) {
            throw new IllegalArgumentException("La contraseña está equivocada");
        }

        // Generar token JWT
        String token = JwtUtil.generateToken(
                usuario.getId(),
                usuario.getRol().getNombreRol(),
                usuario.getRol().getAdmin()
        );

        // Construir objeto usuario que se enviará al frontend
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", usuario.getId());
        userData.put("nombre", usuario.getNombre());
        userData.put("apellidoPaterno", usuario.getApellidoPaterno());
        userData.put("apellidoMaterno", usuario.getApellidoMaterno());
        userData.put("boleta", usuario.getBoleta());
        userData.put("correo", usuario.getCorreo());
        userData.put("telefono", usuario.getTelefono());
        userData.put("rol", usuario.getRol().getNombreRol());
        userData.put("foto", usuario.getFoto());
        userData.put("admin", usuario.getRol().getAdmin());
        userData.put("fechaCreacion", usuario.getFechaCreacion());
        userData.put("token", token);

        return userData;
    }
}
