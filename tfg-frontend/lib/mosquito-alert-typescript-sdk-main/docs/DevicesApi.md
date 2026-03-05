# DevicesApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /devices/ | |
|[**partialUpdate**](#partialupdate) | **PATCH** /devices/{device_id}/ | |
|[**retrieve**](#retrieve) | **GET** /devices/{device_id}/ | |
|[**update**](#update) | **PUT** /devices/{device_id}/ | |

# **create**
> Device create(deviceRequest)


### Example

```typescript
import {
    DevicesApi,
    Configuration,
    DeviceRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new DevicesApi(configuration);

let deviceRequest: DeviceRequest; //

const { status, data } = await apiInstance.create(
    deviceRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deviceRequest** | **DeviceRequest**|  | |


### Return type

**Device**

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
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **partialUpdate**
> DeviceUpdate partialUpdate()


### Example

```typescript
import {
    DevicesApi,
    Configuration,
    PatchedDeviceUpdateRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new DevicesApi(configuration);

let deviceId: string; // (default to undefined)
let patchedDeviceUpdateRequest: PatchedDeviceUpdateRequest; // (optional)

const { status, data } = await apiInstance.partialUpdate(
    deviceId,
    patchedDeviceUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchedDeviceUpdateRequest** | **PatchedDeviceUpdateRequest**|  | |
| **deviceId** | [**string**] |  | defaults to undefined|


### Return type

**DeviceUpdate**

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
> Device retrieve()


### Example

```typescript
import {
    DevicesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new DevicesApi(configuration);

let deviceId: string; // (default to undefined)

const { status, data } = await apiInstance.retrieve(
    deviceId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deviceId** | [**string**] |  | defaults to undefined|


### Return type

**Device**

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
> DeviceUpdate update(deviceUpdateRequest)


### Example

```typescript
import {
    DevicesApi,
    Configuration,
    DeviceUpdateRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new DevicesApi(configuration);

let deviceId: string; // (default to undefined)
let deviceUpdateRequest: DeviceUpdateRequest; //

const { status, data } = await apiInstance.update(
    deviceId,
    deviceUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deviceUpdateRequest** | **DeviceUpdateRequest**|  | |
| **deviceId** | [**string**] |  | defaults to undefined|


### Return type

**DeviceUpdate**

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

