# PhotosApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**predictionDestroy**](#predictiondestroy) | **DELETE** /photos/{uuid}/prediction/ | |
|[**predictionPartialUpdate**](#predictionpartialupdate) | **PATCH** /photos/{uuid}/prediction/ | |
|[**predictionRetrieve**](#predictionretrieve) | **GET** /photos/{uuid}/prediction/ | |
|[**predictionUpdate**](#predictionupdate) | **PUT** /photos/{uuid}/prediction/ | |
|[**retrieve**](#retrieve) | **GET** /photos/{uuid}/ | |

# **predictionDestroy**
> predictionDestroy()


### Example

```typescript
import {
    PhotosApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PhotosApi(configuration);

let uuid: string; // (default to undefined)

const { status, data } = await apiInstance.predictionDestroy(
    uuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

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
|**204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **predictionPartialUpdate**
> PhotoPrediction predictionPartialUpdate()


### Example

```typescript
import {
    PhotosApi,
    Configuration,
    PatchedPhotoPredictionRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PhotosApi(configuration);

let uuid: string; // (default to undefined)
let patchedPhotoPredictionRequest: PatchedPhotoPredictionRequest; // (optional)

const { status, data } = await apiInstance.predictionPartialUpdate(
    uuid,
    patchedPhotoPredictionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchedPhotoPredictionRequest** | **PatchedPhotoPredictionRequest**|  | |
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

**PhotoPrediction**

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

# **predictionRetrieve**
> PhotoPrediction predictionRetrieve()


### Example

```typescript
import {
    PhotosApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PhotosApi(configuration);

let uuid: string; // (default to undefined)

const { status, data } = await apiInstance.predictionRetrieve(
    uuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

**PhotoPrediction**

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

# **predictionUpdate**
> PhotoPrediction predictionUpdate(photoPredictionRequest)


### Example

```typescript
import {
    PhotosApi,
    Configuration,
    PhotoPredictionRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PhotosApi(configuration);

let uuid: string; // (default to undefined)
let photoPredictionRequest: PhotoPredictionRequest; //

const { status, data } = await apiInstance.predictionUpdate(
    uuid,
    photoPredictionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **photoPredictionRequest** | **PhotoPredictionRequest**|  | |
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

**PhotoPrediction**

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
> Photo retrieve()


### Example

```typescript
import {
    PhotosApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PhotosApi(configuration);

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

**Photo**

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

