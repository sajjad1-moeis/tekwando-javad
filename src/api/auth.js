import ky from "ky";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://o2lounge.ir/api";

// ایجاد instance اصلی API
const api = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;

        if (response) {
          try {
            const errorData = await response.json();
            error.message = errorData.errors || errorData.message || error.message;
            error.data = errorData;
          } catch {}
        }
        return error;
      },
    ],
  },
});

// API با Authentication (برای درخواست‌هایی که نیاز به توکن دارند)
const authenticatedApi = api.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});

// ==================== ثبت‌نام (3 مرحله‌ای) ====================

export const registerStep1 = async (data) => {
  return api.post("auth/register-step1", { json: data }).json();
};

export const verifyOtp = async (data) => {
  return api.post("auth/verify-otp", { json: data }).json();
};

export const completeRegistration = async (data) => {
  return api.post("auth/complete-registration", { json: data }).json();
};

// ==================== ورود ====================

export const login = async (data) => {
  return api.post("auth/login", { json: data }).json();
};

// ==================== بازیابی رمز عبور ====================

/**
 * مرحله 1: ارسال شماره تلفن برای بازیابی رمز عبور و دریافت OTP
 * @param {Object} data - { phoneNumber }
 * @returns {Promise} Response با phoneNumber, expiresInSeconds, otpCode (فقط در Development)
 */
export const passwordRecovery = async (data) => {
  return api.post("auth/forgot-password", { json: data }).json();
};

/**
 * مرحله 2: تایید OTP برای بازیابی رمز عبور
 * @param {Object} data - { phoneNumber, otpCode }
 * @returns {Promise} Response با phoneNumber, isVerified
 */
export const verifyPasswordRecoveryOtp = async (data) => {
  return api.post("auth/verify-password-recovery-otp", { json: data }).json();
};

/**
 * مرحله 3: تنظیم رمز عبور جدید
 * @param {Object} data - { phoneNumber, password, confirmPassword }
 * @returns {Promise} Response با accessToken, refreshToken, expiresIn, user
 */
export const resetPassword = async (data) => {
  return api.post("auth/reset-password", { json: data }).json();
};

// ==================== مدیریت توکن‌ها ====================

export const refreshToken = async (data) => {
  return api.post("auth/refresh-token", { json: data }).json();
};

/**
 * دریافت اطلاعات کاربر جاری
 * @returns {Promise} Response با اطلاعات کاربر
 */
export const getMe = async () => {
  return authenticatedApi.get("auth/me").json();
};

// ==================== مدیریت توکن‌ها در LocalStorage ====================

export const tokenStorage = {
  setTokens: (accessToken, refreshToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  },

  getAccessToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  },

  getRefreshToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  },

  clearTokens: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
};

// ==================== Interceptor برای تازه‌سازی خودکار توکن ====================

// ایجاد API instance با interceptor برای تازه‌سازی خودکار
export const apiWithAutoRefresh = authenticatedApi.extend({
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        const originalRequest = error.request;

        // اگر 401 دریافت کردیم و هنوز retry نکرده‌ایم
        if (response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshTokenValue = tokenStorage.getRefreshToken();
            if (!refreshTokenValue) {
              tokenStorage.clearTokens();
              if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
              }
              return Promise.reject(error);
            }

            // تازه‌سازی توکن
            const refreshResponse = await refreshToken({
              refreshToken: refreshTokenValue,
            });

            if (refreshResponse.success && refreshResponse.data) {
              // ذخیره توکن‌های جدید
              tokenStorage.setTokens(refreshResponse.data.accessToken, refreshResponse.data.refreshToken);

              // تکرار درخواست اصلی با توکن جدید
              originalRequest.headers.set("Authorization", `Bearer ${refreshResponse.data.accessToken}`);
              return api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh Token منقضی شده - هدایت به صفحه ورود
            tokenStorage.clearTokens();
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }
            return Promise.reject(refreshError);
          }
        }

        // مدیریت خطای اصلی
        if (response) {
          try {
            const errorData = await response.json();
            error.message = errorData.message || error.message;
            error.data = errorData;
          } catch {
            // If response is not JSON, keep original error
          }
        }
        return error;
      },
    ],
  },
});

export default {
  registerStep1,
  verifyOtp,
  completeRegistration,
  login,
  passwordRecovery,
  verifyPasswordRecoveryOtp,
  resetPassword,
  refreshToken,
  getMe,
  tokenStorage,
  apiWithAutoRefresh,
};
