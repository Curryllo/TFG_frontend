# PingApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**retrieve**](#retrieve) | **GET** /ping/ | |

# **retrieve**
> retrieve()

Simple ping endpoint to check API connectivity

### Example

```typescript
import {
    PingApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PingApi(configuration);

const { status, data } = await apiInstance.retrieve();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** |  |  -  |
|**204** | No response body |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

