package com.job_tracker_webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Properties;

@SpringBootApplication
public class JobTrackerWebappApplication {

    public static void main(String[] args) {
        // Load environment variables from .env file
        Dotenv dotenv = Dotenv.load();

        // Set system properties for Spring Boot to use
        Properties properties = System.getProperties();
        properties.setProperty("DB_HOST", dotenv.get("DB_HOST", "localhost"));
        properties.setProperty("DB_PORT", dotenv.get("DB_PORT", "5432"));
        properties.setProperty("DB_NAME", dotenv.get("DB_NAME", "neondb"));
        properties.setProperty("DB_USER", dotenv.get("DB_USER", "neondb_owner"));
        properties.setProperty("DB_PASS", dotenv.get("DB_PASS", ""));
        properties.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL", ""));

        // Print loaded database URL to verify environment variables
        System.out.println("✅ Database URL: " + dotenv.get("DATABASE_URL", "Not Set"));

        // Start Spring Boot application
        SpringApplication.run(JobTrackerWebappApplication.class, args);
    }
}
