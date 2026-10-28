package br.xsquad.faq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Serve apenas arquivos estáticos de src/main/resources/static
@SpringBootApplication
public class FaqApplication {
    public static void main(String[] args) {
        SpringApplication.run(FaqApplication.class, args);
    }
}
