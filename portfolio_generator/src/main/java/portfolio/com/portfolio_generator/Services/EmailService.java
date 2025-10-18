package portfolio.com.portfolio_generator.Services;
import java.util.Properties;

import org.springframework.stereotype.Service;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    public void sendEmail(String subject, String message, String to) {
        // ✅ Use your actual Mailtrap credentials here
        final String username = "2481c4d6270e1f";
        final String password = "e189cacb8f0add";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); // secure connection
        props.put("mail.smtp.host", "smtp.mailtrap.io");
        props.put("mail.smtp.port", "2525"); // or 587 if needed

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("portgenix.in@gmail.com"));
            mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            mimeMessage.setSubject(subject);
            mimeMessage.setContent(message, "text/html; charset=utf-8");

            Transport.send(mimeMessage);
            System.out.println("✅ OTP email sent successfully!");

        } catch (MessagingException e) {
            System.out.println("❌ Failed to send email:");
            e.printStackTrace();
        }
    }
}
