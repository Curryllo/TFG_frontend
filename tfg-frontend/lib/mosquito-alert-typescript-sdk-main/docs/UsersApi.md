# UsersApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**partialUpdate**](#partialupdate) | **PATCH** /users/{uuid}/ | |
|[**retrieve**](#retrieve) | **GET** /users/{uuid}/ | |
|[**retrieveMine**](#retrievemine) | **GET** /me/ | |
|[**update**](#update) | **PUT** /users/{uuid}/ | |

# **partialUpdate**
> User partialUpdate()


### Example

```typescript
import {
    UsersApi,
    Configuration,
    PatchedUserRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let uuid: string; // (default to undefined)
let patchedUserRequest: PatchedUserRequest; // (optional)

const { status, data } = await apiInstance.partialUpdate(
    uuid,
    patchedUserRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchedUserRequest** | **PatchedUserRequest**|  | |
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

**User**

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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **retrieve**
> User retrieve()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let uuid: string; // (default to undefined)

const { status, data } = await apiInstance.retrieve(
    uuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

**User**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** |  |  -  |
|**403** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **retrieveMine**
> User retrieveMine()

Get Current User\'s Profile

### Example

```typescript
import {
    UsersApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.retrieveMine();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**User**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** |  |  -  |
|**403** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update**
> User update()


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UserRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let uuid: string; // (default to undefined)
let userRequest: UserRequest; // (optional)

const { status, data } = await apiInstance.update(
    uuid,
    userRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userRequest** | **UserRequest**|  | |
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

**User**

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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

