const API_STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    ERROR_CODE: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    USER_NOT_VERIFIED: 403,
};

const RESPONSE_MESSAGES = {
    // General validation / auth messages (used across controllers)
    FIELD_REQUIRED: "All fields are required",
    EMAIL_REQUIRED: "Please provide a valid email address",
    INVALID_EMAIL: "Please provide a valid email address",
    INVALID_PASSWORD: "Password must be at least 6 characters long",
    EMAIL_AND_PASSWORD_REQUIRED: "Email and password are required",

    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
    // User / session messages
    USER_ALREADY_EXISTS: "User with this email already exists",
    USER_NOT_FOUND: "User not found",
    USER_UPDATED_SUCCESS: "User updated successfully",
    LOGIN_SUCCESS: "Login successful",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    TOKEN_REFRESHED_SUCCESS: "Access token refreshed successfully",
    LOGOUT_SUCCESS: "Logout successful",
    USER_NOT_VERIFIED: "User is not verified. Please verify your email.",
    // OTP / password reset
    OTP_REQUIRED: "OTP is required",
    INVALID_OTP: "Invalid OTP or OTP expired",
    INVALID_OR_EXPIRED_OTP: "Invalid OTP or OTP expired",
    NEW_PASSWORD_REQUIRED: "New password is required",
    EMAIL_SEND_SUCCESS: "Email send successfully",
    EMAIL_SEND_FAILED: "Email send failed",

    // Auth / token
    ACCESS_DENIED: "Access denied",
    TOKEN_EXPIRED: "Token expired",
};

module.exports = {
    API_STATUS_CODES,
    RESPONSE_MESSAGES
};

