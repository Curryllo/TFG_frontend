# PartnersApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**list**](#list) | **GET** /partners/ | |
|[**retrieve**](#retrieve) | **GET** /partners/{id}/ | |

# **list**
> PaginatedPartnerList list()


### Example

```typescript
import {
    PartnersApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PartnersApi(configuration);

let page: number; //Un número de página dentro del conjunto de resultados paginado. (optional) (default to undefined)
let pageSize: number; //Número de resultados a devolver por página. (optional) (default to undefined)

const { status, data } = await apiInstance.list(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Un número de página dentro del conjunto de resultados paginado. | (optional) defaults to undefined|
| **pageSize** | [**number**] | Número de resultados a devolver por página. | (optional) defaults to undefined|


### Return type

**PaginatedPartnerList**

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

# **retrieve**
> Partner retrieve()


### Example

```typescript
import {
    PartnersApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new PartnersApi(configuration);

let id: number; //Un valor de entero único que identifique este organization pin. (default to undefined)

const { status, data } = await apiInstance.retrieve(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Un valor de entero único que identifique este organization pin. | defaults to undefined|


### Return type

**Partner**

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

