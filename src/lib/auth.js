import { tokenStorage, refreshToken } from "@/api/auth";

/**
 * بررسی معتبر بودن Access Token
 */
export const isAuthenticated = () => {
  return !!tokenStorage.getAccessToken();
};

/**
 * خروج از حساب کاربری
 */
export const logout = () => {
  tokenStorage.clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
};

/**
 * دریافت Access Token برای استفاده در Header
 */
export const getAuthHeader = () => {
  const token = tokenStorage.getAccessToken();
  return token ? `Bearer ${token}` : null;
};

/**
 * تازه‌سازی توکن به صورت دستی
 */
export const refreshAccessToken = async () => {
  const refreshTokenValue = tokenStorage.getRefreshToken();
  if (!refreshTokenValue) {
    logout();
    throw new Error("Refresh token not found");
  }

  try {
    const response = await refreshToken({
      refreshToken: refreshTokenValue,
    });

    if (response.success && response.data) {
      tokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data.accessToken;
    }

    throw new Error("Failed to refresh token");
  } catch (error) {
    logout();
    throw error;
  }
};

