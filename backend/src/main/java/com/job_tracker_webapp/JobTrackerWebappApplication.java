package com.job_tracker_webapp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class JobTrackerWebappApplication {

	private static Dotenv dotenv = Dotenv.load();
	private static String dbUrl = dotenv.get("DATABASE_URL");

	public static void main(String[] args) {
		SpringApplication.run(JobTrackerWebappApplication.class, args);
	}

}
