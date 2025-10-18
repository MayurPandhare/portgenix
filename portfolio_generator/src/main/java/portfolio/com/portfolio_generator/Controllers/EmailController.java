package portfolio.com.portfolio_generator.Controllers;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import portfolio.com.portfolio_generator.Entities.EmailEntity;
import portfolio.com.portfolio_generator.Entities.VerifyOtpRequest;
import portfolio.com.portfolio_generator.Services.EmailService;

@RestController
@CrossOrigin(origins = "http://localhost:4500/" ,  allowCredentials = "true") // Allow CORS for this specific method
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpStore otpStore;
    

  @PostMapping("/send-otp")
public ResponseEntity<String> sendOtp(@RequestBody EmailEntity emailEntity, HttpServletRequest request) {
    
    
    String email = emailEntity.getEmail();
    String otp = String.valueOf(new SecureRandom().nextInt(900000) + 100000);
  

    System.out.println("\n\nsend-otp : "+ otp);


    // Send email (already implemented by you)
    String subject = otp + " is your Portgenix verification code";
    String message = "<div style='border:1px solid #e2e2e2; padding:20px; text-align:center;'>"
        + "<h1 style='font-weight:normal;'>Use this code to verify your email</h1>"
        + "<h2 style='font-size:32px; margin-top:10px;'>" + otp + "</h2>"
        + "</div>";

    emailService.sendEmail(subject, message, email);


    System.out.println("Generated OTP for " + emailEntity.getEmail() + ": " + otp);

    String otpToken = otpStore.saveOtp(otp);

    return ResponseEntity.ok(otpToken);
} 


     @PostMapping("/verify-otp")
   public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest request  ) {

    System.out.println("\n\n Enter to verify otp:");

    System.out.println("\n\nComing [Entered otp] :"+ request.getOtp());
    System.out.println("\n\nComing otp token:"+ request.getOtpToken());

    boolean isValid = otpStore.verifyOtp(request.getOtpToken(), request.getOtp());

        if (isValid) {
            return ResponseEntity.ok("OTP verified successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP.");
        }
   

}


}
