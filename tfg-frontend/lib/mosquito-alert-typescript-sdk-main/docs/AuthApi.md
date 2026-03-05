# AuthApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changePassword**](#changepassword) | **POST** /auth/password/change/ | |
|[**obtainToken**](#obtaintoken) | **POST** /auth/token/ | |
|[**refreshToken**](#refreshtoken) | **POST** /auth/token/refresh/ | |
|[**signupGuest**](#signupguest) | **POST** /auth/signup/guest/ | |
|[**verifyToken**](#verifytoken) | **POST** /auth/token/verify/ | |

# **changePassword**
> changePassword(passwordChangeRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    PasswordChangeRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let passwordChangeRequest: PasswordChangeRequest; //

const { status, data } = await apiInstance.changePassword(
    passwordChangeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **passwordChangeRequest** | **PasswordChangeRequest**|  | |


### Return type

void (empty response body)

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**401** |  |  -  |
|**403** |  |  -  |
|**404** |  |  -  |
|**204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtainToken**
> AppUserTokenObtainPair obtainToken(appUserTokenObtainPairRequest)

Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    AppUserTokenObtainPairRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let appUserTokenObtainPairRequest: AppUserTokenObtainPairRequest; //

const { status, data } = await apiInstance.obtainToken(
    appUserTokenObtainPairRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appUserTokenObtainPairRequest** | **AppUserTokenObtainPairRequest**|  | |


### Return type

**AppUserTokenObtainPair**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |
|**401** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **refreshToken**
> TokenRefresh refreshToken(tokenRefreshRequest)

Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    TokenRefreshRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let tokenRefreshRequest: TokenRefreshRequest; //

const { status, data } = await apiInstance.refreshToken(
    tokenRefreshRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tokenRefreshRequest** | **TokenRefreshRequest**|  | |


### Return type

**TokenRefresh**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |
|**401** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signupGuest**
> GuestRegistration signupGuest(guestRegistrationRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    GuestRegistrationRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let guestRegistrationRequest: GuestRegistrationRequest; //

const { status, data } = await apiInstance.signupGuest(
    guestRegistrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guestRegistrationRequest** | **GuestRegistrationRequest**|  | |


### Return type

**GuestRegistration**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**404** |  |  -  |
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verifyToken**
> verifyToken(tokenVerifyRequest)

Takes a token and indicates if it is valid.  This view provides no information about a token\'s fitness for a particular use.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    TokenVerifyRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let tokenVerifyRequest: TokenVerifyRequest; //

const { status, data } = await apiInstance.verifyToken(
    tokenVerifyRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tokenVerifyRequest** | **TokenVerifyRequest**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**404** |  |  -  |
|**200** | No response body |  -  |
|**401** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

