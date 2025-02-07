package com.job_tracker_webapp.services;

import com.job_tracker_webapp.dto.LoginRequest;
import com.job_tracker_webapp.dto.RegisterRequest;
import com.job_tracker_webapp.dto.AuthResponse;
import com.job_tracker_webapp.entity.Role;
import com.job_tracker_webapp.entity.User;
import com.job_tracker_webapp.exception.InvalidCredentialsException;
import com.job_tracker_webapp.exception.UserAlreadyExistsException;
import com.job_tracker_webapp.repository.UserRepository;
import com.job_tracker_webapp.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists!");
        }
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already taken!");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))  // ✅ Secure password hashing
                .role(Role.USER)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password!");
        }

        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token);
    }
}
