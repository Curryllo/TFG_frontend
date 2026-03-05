# TaxaApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**list**](#list) | **GET** /taxa/ | |
|[**retrieve**](#retrieve) | **GET** /taxa/{id}/ | |
|[**rootTreeRetrieve**](#roottreeretrieve) | **GET** /taxa/tree/ | |
|[**treeRetrieve**](#treeretrieve) | **GET** /taxa/{id}/tree/ | |

# **list**
> PaginatedTaxonList list()


### Example

```typescript
import {
    TaxaApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new TaxaApi(configuration);

let isRelevant: boolean; // (optional) (default to undefined)
let page: number; //Un número de página dentro del conjunto de resultados paginado. (optional) (default to undefined)
let pageSize: number; //Número de resultados a devolver por página. (optional) (default to undefined)
let rank: Array<TaxaListRankParameter>; // (optional) (default to undefined)

const { status, data } = await apiInstance.list(
    isRelevant,
    page,
    pageSize,
    rank
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **isRelevant** | [**boolean**] |  | (optional) defaults to undefined|
| **page** | [**number**] | Un número de página dentro del conjunto de resultados paginado. | (optional) defaults to undefined|
| **pageSize** | [**number**] | Número de resultados a devolver por página. | (optional) defaults to undefined|
| **rank** | **Array&lt;TaxaListRankParameter&gt;** |  | (optional) defaults to undefined|


### Return type

**PaginatedTaxonList**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
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
> Taxon retrieve()


### Example

```typescript
import {
    TaxaApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new TaxaApi(configuration);

let id: number; //Un valor de entero único que identifique este taxon. (default to undefined)

const { status, data } = await apiInstance.retrieve(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Un valor de entero único que identifique este taxon. | defaults to undefined|


### Return type

**Taxon**

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

# **rootTreeRetrieve**
> TaxonTreeNode rootTreeRetrieve()


### Example

```typescript
import {
    TaxaApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new TaxaApi(configuration);

const { status, data } = await apiInstance.rootTreeRetrieve();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**TaxonTreeNode**

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

# **treeRetrieve**
> TaxonTreeNode treeRetrieve()


### Example

```typescript
import {
    TaxaApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new TaxaApi(configuration);

let id: number; //Un valor de entero único que identifique este taxon. (default to undefined)

const { status, data } = await apiInstance.treeRetrieve(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Un valor de entero único que identifique este taxon. | defaults to undefined|


### Return type

**TaxonTreeNode**

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

