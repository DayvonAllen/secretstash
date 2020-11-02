package com.dna.dev.secretstash;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class SecretStashApplication implements CommandLineRunner {
    private final Environment environment;

    public SecretStashApplication(Environment environment) {
        this.environment = environment;
    }

    public static void main(String[] args) {
        SpringApplication.run(SecretStashApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(environment.getProperty("salt"));
    }
}
