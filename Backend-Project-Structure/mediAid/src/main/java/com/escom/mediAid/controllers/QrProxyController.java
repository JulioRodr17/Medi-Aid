package com.escom.mediAid.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.microsoft.playwright.*;

@RestController
@RequestMapping("/api/proxy")
public class QrProxyController {
	
    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/qrFast")
    public ResponseEntity<String> proxyQrFast(@RequestBody Map<String, String> body) {
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


    @PostMapping("/qrSlow")
    public ResponseEntity<String> proxyQrSlow(@RequestBody Map<String, String> body) {
        String url = body.get("url");
        if (url == null || url.isEmpty()) {
            return ResponseEntity.badRequest().body("Falta la URL");
        }

        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
                    .setHeadless(true));
            Page page = browser.newPage();
            page.navigate(url);
            page.waitForSelector(".input-group", new Page.WaitForSelectorOptions()
                    .setTimeout(1000)); // 5 segundos máximo, ajusta según necesites
            String html = page.content();

            browser.close();
            return ResponseEntity.ok(html);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al renderizar la página: " + e.getMessage());
        }
    }
}
