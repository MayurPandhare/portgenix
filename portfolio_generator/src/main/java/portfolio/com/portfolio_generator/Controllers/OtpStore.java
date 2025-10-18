package portfolio.com.portfolio_generator.Controllers;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class OtpStore {
    
    private final Map<String, OtpEntry> otpMap = new ConcurrentHashMap<>();
    private final long OTP_EXPIRY_DURATION = 3 * 60 * 1000; // 3 minutes in milliseconds

    public String saveOtp(String otp) {
        String otpToken = UUID.randomUUID().toString();
        long expiryTime = System.currentTimeMillis() + OTP_EXPIRY_DURATION;
        otpMap.put(otpToken, new OtpEntry(otp, expiryTime));
        return otpToken;
    }

    public boolean verifyOtp(String otpToken, String otp) {
        OtpEntry entry = otpMap.get(otpToken);

        if (entry == null) {
            return false;
        }

        if (System.currentTimeMillis() > entry.getExpiryTime()) {
            otpMap.remove(otpToken); // remove expired OTP
            return false;
        }

        boolean isValid = entry.getOtp().equals(otp);
        if (isValid) {
            otpMap.remove(otpToken); // remove OTP after successful verification
        }

        return isValid;
    }

    private static class OtpEntry {
        private final String otp;
        private final long expiryTime;

        public OtpEntry(String otp, long expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        public String getOtp() {
            return otp;
        }

        public long getExpiryTime() {
            return expiryTime;
        }
    }
}
