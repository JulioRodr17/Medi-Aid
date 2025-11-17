package com.escom.mediAid.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/proxy")
public class QrProxyController {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/qr")
    public ResponseEntity<String> proxyQr(@RequestBody Map<String, String> body) {
    	System.out.println("Servicion actiuvo proxy");
        String url = body.get("url");
        if (url == null || url.isEmpty()) {
            return ResponseEntity.badRequest().body("Falta la URL");
        }

        try {
            String html = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(html);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
