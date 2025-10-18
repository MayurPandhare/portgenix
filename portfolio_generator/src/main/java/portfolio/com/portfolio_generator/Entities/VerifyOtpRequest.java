package portfolio.com.portfolio_generator.Entities;

public class VerifyOtpRequest {
    private String otpToken;
    private String otp;
    public String getOtpToken() {
        return otpToken;
    }
    public void setOtpToken(String otpToken) {
        this.otpToken = otpToken;
    }
    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
}
