# PermissionsApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**retrieveMine**](#retrievemine) | **GET** /me/permissions/ | |

# **retrieveMine**
> UserPermission retrieveMine()

Get Current User\'s Permissions

### Example

```typescript
import {
    PermissionsApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PermissionsApi(configuration);

const { status, data } = await apiInstance.retrieveMine();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserPermission**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

