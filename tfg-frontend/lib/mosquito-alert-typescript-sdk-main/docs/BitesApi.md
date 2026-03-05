# BitesApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /bites/ | |
|[**destroy**](#destroy) | **DELETE** /bites/{uuid}/ | |
|[**geoList**](#geolist) | **GET** /bites/geo/ | |
|[**list**](#list) | **GET** /bites/ | |
|[**listMine**](#listmine) | **GET** /me/bites/ | |
|[**retrieve**](#retrieve) | **GET** /bites/{uuid}/ | |

# **create**
> Bite create(biteRequest)


### Example

```typescript
import {
    BitesApi,
    Configuration,
    BiteRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BitesApi(configuration);

let biteRequest: BiteRequest; //

const { status, data } = await apiInstance.create(
    biteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **biteRequest** | **BiteRequest**|  | |


### Return type

**Bite**

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

# **destroy**
> destroy()


### Example

```typescript
import {
    BitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BitesApi(configuration);

let uuid: string; // (default to undefined)

const { status, data } = await apiInstance.destroy(
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

# **geoList**
> Array<BiteGeoModel> geoList()


### Example

```typescript
import {
    BitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BitesApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let orderBy: Array<BitesListOrderByParameter>; //Ordenamiento   (optional) (default to undefined)
let point: Array<number>; //Point represented in **x,y** format. Represents **point** in **Distance to point filter** (optional) (default to undefined)
let receivedAtAfter: string; //Received at (optional) (default to undefined)
let receivedAtBefore: string; //Received at (optional) (default to undefined)
let search: string; //Un término de búsqueda. (optional) (default to undefined)
let shortId: string; //Short ID (optional) (default to undefined)
let tags: Array<string>; //Múltiples valores separados por comas. (optional) (default to undefined)
let updatedAtAfter: string; //Update at (optional) (default to undefined)
let updatedAtBefore: string; //Update at (optional) (default to undefined)
let userUuid: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.geoList(
    boundaryUuid,
    countryId,
    createdAtAfter,
    createdAtBefore,
    dist,
    geoPrecision,
    orderBy,
    point,
    receivedAtAfter,
    receivedAtBefore,
    search,
    shortId,
    tags,
    updatedAtAfter,
    updatedAtBefore,
    userUuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **boundaryUuid** | [**string**] |  | (optional) defaults to undefined|
| **countryId** | [**number**] |  | (optional) defaults to undefined|
| **createdAtAfter** | [**string**] | Created at | (optional) defaults to undefined|
| **createdAtBefore** | [**string**] | Created at | (optional) defaults to undefined|
| **dist** | [**number**] | Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. | (optional) defaults to 1000|
| **geoPrecision** | [**number**] | Latitude/Longitude precision | (optional) defaults to undefined|
| **orderBy** | **Array&lt;BitesListOrderByParameter&gt;** | Ordenamiento   | (optional) defaults to undefined|
| **point** | **Array&lt;number&gt;** | Point represented in **x,y** format. Represents **point** in **Distance to point filter** | (optional) defaults to undefined|
| **receivedAtAfter** | [**string**] | Received at | (optional) defaults to undefined|
| **receivedAtBefore** | [**string**] | Received at | (optional) defaults to undefined|
| **search** | [**string**] | Un término de búsqueda. | (optional) defaults to undefined|
| **shortId** | [**string**] | Short ID | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** | Múltiples valores separados por comas. | (optional) defaults to undefined|
| **updatedAtAfter** | [**string**] | Update at | (optional) defaults to undefined|
| **updatedAtBefore** | [**string**] | Update at | (optional) defaults to undefined|
| **userUuid** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<BiteGeoModel>**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/geo+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**401** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list**
> PaginatedBiteList list()


### Example

```typescript
import {
    BitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BitesApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let format: BitesListFormatParameter; // (optional) (default to undefined)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let orderBy: Array<BitesListOrderByParameter>; //Ordenamiento   (optional) (default to undefined)
let page: number; //Un número de página dentro del conjunto de resultados paginado. (optional) (default to undefined)
let pageSize: number; //Número de resultados a devolver por página. (optional) (default to undefined)
let point: Array<number>; //Point represented in **x,y** format. Represents **point** in **Distance to point filter** (optional) (default to undefined)
let receivedAtAfter: string; //Received at (optional) (default to undefined)
let receivedAtBefore: string; //Received at (optional) (default to undefined)
let search: string; //Un término de búsqueda. (optional) (default to undefined)
let shortId: string; //Short ID (optional) (default to undefined)
let tags: Array<string>; //Múltiples valores separados por comas. (optional) (default to undefined)
let updatedAtAfter: string; //Update at (optional) (default to undefined)
let updatedAtBefore: string; //Update at (optional) (default to undefined)
let userUuid: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.list(
    boundaryUuid,
    countryId,
    createdAtAfter,
    createdAtBefore,
    dist,
    format,
    geoPrecision,
    orderBy,
    page,
    pageSize,
    point,
    receivedAtAfter,
    receivedAtBefore,
    search,
    shortId,
    tags,
    updatedAtAfter,
    updatedAtBefore,
    userUuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **boundaryUuid** | [**string**] |  | (optional) defaults to undefined|
| **countryId** | [**number**] |  | (optional) defaults to undefined|
| **createdAtAfter** | [**string**] | Created at | (optional) defaults to undefined|
| **createdAtBefore** | [**string**] | Created at | (optional) defaults to undefined|
| **dist** | [**number**] | Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. | (optional) defaults to 1000|
| **format** | **BitesListFormatParameter** |  | (optional) defaults to undefined|
| **geoPrecision** | [**number**] | Latitude/Longitude precision | (optional) defaults to undefined|
| **orderBy** | **Array&lt;BitesListOrderByParameter&gt;** | Ordenamiento   | (optional) defaults to undefined|
| **page** | [**number**] | Un número de página dentro del conjunto de resultados paginado. | (optional) defaults to undefined|
| **pageSize** | [**number**] | Número de resultados a devolver por página. | (optional) defaults to undefined|
| **point** | **Array&lt;number&gt;** | Point represented in **x,y** format. Represents **point** in **Distance to point filter** | (optional) defaults to undefined|
| **receivedAtAfter** | [**string**] | Received at | (optional) defaults to undefined|
| **receivedAtBefore** | [**string**] | Received at | (optional) defaults to undefined|
| **search** | [**string**] | Un término de búsqueda. | (optional) defaults to undefined|
| **shortId** | [**string**] | Short ID | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** | Múltiples valores separados por comas. | (optional) defaults to undefined|
| **updatedAtAfter** | [**string**] | Update at | (optional) defaults to undefined|
| **updatedAtBefore** | [**string**] | Update at | (optional) defaults to undefined|
| **userUuid** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedBiteList**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** |  |  -  |
|**401** |  |  -  |
|**404** |  |  -  |
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listMine**
> PaginatedBiteList listMine()

Get Current User\'s Bites

### Example

```typescript
import {
    BitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BitesApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let format: BitesListFormatParameter; // (optional) (default to undefined)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let orderBy: Array<BitesListOrderByParameter>; //Ordenamiento   (optional) (default to undefined)
let page: number; //Un número de página dentro del conjunto de resultados paginado. (optional) (default to undefined)
let pageSize: number; //Número de resultados a devolver por página. (optional) (default to undefined)
let point: Array<number>; //Point represented in **x,y** format. Represents **point** in **Distance to point filter** (optional) (default to undefined)
let receivedAtAfter: string; //Received at (optional) (default to undefined)
let receivedAtBefore: string; //Received at (optional) (default to undefined)
let search: string; //Un término de búsqueda. (optional) (default to undefined)
let shortId: string; //Short ID (optional) (default to undefined)
let tags: Array<string>; //Múltiples valores separados por comas. (optional) (default to undefined)
let updatedAtAfter: string; //Update at (optional) (default to undefined)
let updatedAtBefore: string; //Update at (optional) (default to undefined)
let userUuid: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.listMine(
    boundaryUuid,
    countryId,
    createdAtAfter,
    createdAtBefore,
    dist,
    format,
    geoPrecision,
    orderBy,
    page,
    pageSize,
    point,
    receivedAtAfter,
    receivedAtBefore,
    search,
    shortId,
    tags,
    updatedAtAfter,
    updatedAtBefore,
    userUuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **boundaryUuid** | [**string**] |  | (optional) defaults to undefined|
| **countryId** | [**number**] |  | (optional) defaults to undefined|
| **createdAtAfter** | [**string**] | Created at | (optional) defaults to undefined|
| **createdAtBefore** | [**string**] | Created at | (optional) defaults to undefined|
| **dist** | [**number**] | Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. | (optional) defaults to 1000|
| **format** | **BitesListFormatParameter** |  | (optional) defaults to undefined|
| **geoPrecision** | [**number**] | Latitude/Longitude precision | (optional) defaults to undefined|
| **orderBy** | **Array&lt;BitesListOrderByParameter&gt;** | Ordenamiento   | (optional) defaults to undefined|
| **page** | [**number**] | Un número de página dentro del conjunto de resultados paginado. | (optional) defaults to undefined|
| **pageSize** | [**number**] | Número de resultados a devolver por página. | (optional) defaults to undefined|
| **point** | **Array&lt;number&gt;** | Point represented in **x,y** format. Represents **point** in **Distance to point filter** | (optional) defaults to undefined|
| **receivedAtAfter** | [**string**] | Received at | (optional) defaults to undefined|
| **receivedAtBefore** | [**string**] | Received at | (optional) defaults to undefined|
| **search** | [**string**] | Un término de búsqueda. | (optional) defaults to undefined|
| **shortId** | [**string**] | Short ID | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** | Múltiples valores separados por comas. | (optional) defaults to undefined|
| **updatedAtAfter** | [**string**] | Update at | (optional) defaults to undefined|
| **updatedAtBefore** | [**string**] | Update at | (optional) defaults to undefined|
| **userUuid** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedBiteList**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/csv


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
> Bite retrieve()


### Example

```typescript
import {
    BitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BitesApi(configuration);

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

**Bite**

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

