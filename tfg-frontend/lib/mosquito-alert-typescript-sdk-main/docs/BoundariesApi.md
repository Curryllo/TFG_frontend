# BoundariesApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createTemporary**](#createtemporary) | **POST** /boundaries/ | |

# **createTemporary**
> TemporaryBoundary createTemporary(temporaryBoundaryRequest)

Create a temporary boundary

### Example

```typescript
import {
    BoundariesApi,
    Configuration,
    TemporaryBoundaryRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BoundariesApi(configuration);

let temporaryBoundaryRequest: TemporaryBoundaryRequest; //

const { status, data } = await apiInstance.createTemporary(
    temporaryBoundaryRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **temporaryBoundaryRequest** | **TemporaryBoundaryRequest**|  | |


### Return type

**TemporaryBoundary**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**401** |  |  -  |
|**404** |  |  -  |
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

