import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthApi, type AuthApiRefreshTokenRequest } from "./api";
import { Configuration } from "./configuration";
import { setBearerAuthToObject } from "./common";

export function attachAuthInterceptor(
  instance: AxiosInstance,
  options: {
    configuration: Configuration;
    refreshToken: () => string | Promise<string>;
    updateAccessToken: (accessToken: string) => void | Promise<void>;
  }
) {
  const authApi = new AuthApi(options.configuration);
  let isRefreshing = false;
  let failedQueue: {
    resolve: (token: string) => void;
    reject: (err: any) => void;
  }[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });
    failedQueue = [];
  };

  // The Bearer token is already set on the request functions.
  //   instance.interceptors.request.use((config) => {
  //     return (async () => {
  //       await setBearerAuthToObject(config, options.configuration);
  //       return config;
  //     })();
  //   });

  instance.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      if (!err.response) {
        return Promise.reject(err); // Reject network errors
      }
      const originalRequest = err.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(async (token) => {
            originalRequest.headers = originalRequest.headers || {};
            await setBearerAuthToObject(
              originalRequest.headers,
              options.configuration
            );
            return instance(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = await options.refreshToken();

          if (refreshToken === "") {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await authApi.refreshToken({
            tokenRefreshRequest: {
              refresh: refreshToken,
            },
          } as AuthApiRefreshTokenRequest);

          const newToken = refreshResponse.data.access;
          await options.updateAccessToken(newToken);

          processQueue(null, newToken);

          originalRequest.headers = originalRequest.headers || {};
          await setBearerAuthToObject(
            originalRequest.headers,
            options.configuration
          );

          return instance(originalRequest);
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);
    }
  );
}
