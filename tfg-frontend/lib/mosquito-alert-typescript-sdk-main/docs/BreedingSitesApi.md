# BreedingSitesApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /breeding-sites/ | |
|[**destroy**](#destroy) | **DELETE** /breeding-sites/{uuid}/ | |
|[**geoList**](#geolist) | **GET** /breeding-sites/geo/ | |
|[**list**](#list) | **GET** /breeding-sites/ | |
|[**listMine**](#listmine) | **GET** /me/breeding-sites/ | |
|[**retrieve**](#retrieve) | **GET** /breeding-sites/{uuid}/ | |

# **create**
> BreedingSite create()


### Example

```typescript
import {
    BreedingSitesApi,
    Configuration,
    LocationRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BreedingSitesApi(configuration);

let createdAt: string; // (default to undefined)
let sentAt: string; // (default to undefined)
let location: LocationRequest; // (default to undefined)
let photos: Array<File>; // (default to undefined)
let siteType: BreedingSiteRequestSiteType; // (default to undefined)
let note: string; // (optional) (default to undefined)
let tags: Array<string>; // (optional) (default to undefined)
let hasWater: boolean; //Either if the user perceived water in the breeding site. (optional) (default to undefined)
let inPublicArea: boolean; //Either if the breeding site is found in a public area. (optional) (default to undefined)
let hasNearMosquitoes: boolean; //Either if the user perceived mosquitoes near the breeding site (less than 10 meters). (optional) (default to undefined)
let hasLarvae: boolean; //Either if the user perceived larvaes the breeding site. (optional) (default to undefined)

const { status, data } = await apiInstance.create(
    createdAt,
    sentAt,
    location,
    photos,
    siteType,
    note,
    tags,
    hasWater,
    inPublicArea,
    hasNearMosquitoes,
    hasLarvae
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdAt** | [**string**] |  | defaults to undefined|
| **sentAt** | [**string**] |  | defaults to undefined|
| **location** | **LocationRequest** |  | defaults to undefined|
| **photos** | **Array&lt;File&gt;** |  | defaults to undefined|
| **siteType** | **BreedingSiteRequestSiteType** |  | defaults to undefined|
| **note** | [**string**] |  | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **hasWater** | [**boolean**] | Either if the user perceived water in the breeding site. | (optional) defaults to undefined|
| **inPublicArea** | [**boolean**] | Either if the breeding site is found in a public area. | (optional) defaults to undefined|
| **hasNearMosquitoes** | [**boolean**] | Either if the user perceived mosquitoes near the breeding site (less than 10 meters). | (optional) defaults to undefined|
| **hasLarvae** | [**boolean**] | Either if the user perceived larvaes the breeding site. | (optional) defaults to undefined|


### Return type

**BreedingSite**

### Authorization

[tokenAuth](../README.md#tokenAuth), [cookieAuth](../README.md#cookieAuth), [jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data, application/x-www-form-urlencoded
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
    BreedingSitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BreedingSitesApi(configuration);

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
> Array<BreedingSiteGeoModel> geoList()


### Example

```typescript
import {
    BreedingSitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BreedingSitesApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let hasLarvae: boolean; // (optional) (default to undefined)
let hasNearMosquitoes: boolean; // (optional) (default to undefined)
let hasPhotos: boolean; //Has any photo (optional) (default to undefined)
let hasWater: boolean; // (optional) (default to undefined)
let orderBy: Array<BitesListOrderByParameter>; //Ordenamiento   (optional) (default to undefined)
let point: Array<number>; //Point represented in **x,y** format. Represents **point** in **Distance to point filter** (optional) (default to undefined)
let receivedAtAfter: string; //Received at (optional) (default to undefined)
let receivedAtBefore: string; //Received at (optional) (default to undefined)
let search: string; //Un término de búsqueda. (optional) (default to undefined)
let shortId: string; //Short ID (optional) (default to undefined)
let siteType: Array<BreedingsitesListSiteTypeParameter>; //Breeding site type.   (optional) (default to undefined)
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
    hasLarvae,
    hasNearMosquitoes,
    hasPhotos,
    hasWater,
    orderBy,
    point,
    receivedAtAfter,
    receivedAtBefore,
    search,
    shortId,
    siteType,
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
| **hasLarvae** | [**boolean**] |  | (optional) defaults to undefined|
| **hasNearMosquitoes** | [**boolean**] |  | (optional) defaults to undefined|
| **hasPhotos** | [**boolean**] | Has any photo | (optional) defaults to undefined|
| **hasWater** | [**boolean**] |  | (optional) defaults to undefined|
| **orderBy** | **Array&lt;BitesListOrderByParameter&gt;** | Ordenamiento   | (optional) defaults to undefined|
| **point** | **Array&lt;number&gt;** | Point represented in **x,y** format. Represents **point** in **Distance to point filter** | (optional) defaults to undefined|
| **receivedAtAfter** | [**string**] | Received at | (optional) defaults to undefined|
| **receivedAtBefore** | [**string**] | Received at | (optional) defaults to undefined|
| **search** | [**string**] | Un término de búsqueda. | (optional) defaults to undefined|
| **shortId** | [**string**] | Short ID | (optional) defaults to undefined|
| **siteType** | **Array&lt;BreedingsitesListSiteTypeParameter&gt;** | Breeding site type.   | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** | Múltiples valores separados por comas. | (optional) defaults to undefined|
| **updatedAtAfter** | [**string**] | Update at | (optional) defaults to undefined|
| **updatedAtBefore** | [**string**] | Update at | (optional) defaults to undefined|
| **userUuid** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<BreedingSiteGeoModel>**

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
> PaginatedBreedingSiteList list()


### Example

```typescript
import {
    BreedingSitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BreedingSitesApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let format: BitesListFormatParameter; // (optional) (default to undefined)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let hasLarvae: boolean; // (optional) (default to undefined)
let hasNearMosquitoes: boolean; // (optional) (default to undefined)
let hasPhotos: boolean; //Has any photo (optional) (default to undefined)
let hasWater: boolean; // (optional) (default to undefined)
let orderBy: Array<BitesListOrderByParameter>; //Ordenamiento   (optional) (default to undefined)
let page: number; //Un número de página dentro del conjunto de resultados paginado. (optional) (default to undefined)
let pageSize: number; //Número de resultados a devolver por página. (optional) (default to undefined)
let point: Array<number>; //Point represented in **x,y** format. Represents **point** in **Distance to point filter** (optional) (default to undefined)
let receivedAtAfter: string; //Received at (optional) (default to undefined)
let receivedAtBefore: string; //Received at (optional) (default to undefined)
let search: string; //Un término de búsqueda. (optional) (default to undefined)
let shortId: string; //Short ID (optional) (default to undefined)
let siteType: Array<BreedingsitesListSiteTypeParameter>; //Breeding site type.   (optional) (default to undefined)
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
    hasLarvae,
    hasNearMosquitoes,
    hasPhotos,
    hasWater,
    orderBy,
    page,
    pageSize,
    point,
    receivedAtAfter,
    receivedAtBefore,
    search,
    shortId,
    siteType,
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
| **hasLarvae** | [**boolean**] |  | (optional) defaults to undefined|
| **hasNearMosquitoes** | [**boolean**] |  | (optional) defaults to undefined|
| **hasPhotos** | [**boolean**] | Has any photo | (optional) defaults to undefined|
| **hasWater** | [**boolean**] |  | (optional) defaults to undefined|
| **orderBy** | **Array&lt;BitesListOrderByParameter&gt;** | Ordenamiento   | (optional) defaults to undefined|
| **page** | [**number**] | Un número de página dentro del conjunto de resultados paginado. | (optional) defaults to undefined|
| **pageSize** | [**number**] | Número de resultados a devolver por página. | (optional) defaults to undefined|
| **point** | **Array&lt;number&gt;** | Point represented in **x,y** format. Represents **point** in **Distance to point filter** | (optional) defaults to undefined|
| **receivedAtAfter** | [**string**] | Received at | (optional) defaults to undefined|
| **receivedAtBefore** | [**string**] | Received at | (optional) defaults to undefined|
| **search** | [**string**] | Un término de búsqueda. | (optional) defaults to undefined|
| **shortId** | [**string**] | Short ID | (optional) defaults to undefined|
| **siteType** | **Array&lt;BreedingsitesListSiteTypeParameter&gt;** | Breeding site type.   | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** | Múltiples valores separados por comas. | (optional) defaults to undefined|
| **updatedAtAfter** | [**string**] | Update at | (optional) defaults to undefined|
| **updatedAtBefore** | [**string**] | Update at | (optional) defaults to undefined|
| **userUuid** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedBreedingSiteList**

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
> PaginatedBreedingSiteList listMine()

Get Current User\'s Breeding Sites

### Example

```typescript
import {
    BreedingSitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BreedingSitesApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let format: BitesListFormatParameter; // (optional) (default to undefined)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let hasLarvae: boolean; // (optional) (default to undefined)
let hasNearMosquitoes: boolean; // (optional) (default to undefined)
let hasPhotos: boolean; //Has any photo (optional) (default to undefined)
let hasWater: boolean; // (optional) (default to undefined)
let orderBy: Array<BitesListOrderByParameter>; //Ordenamiento   (optional) (default to undefined)
let page: number; //Un número de página dentro del conjunto de resultados paginado. (optional) (default to undefined)
let pageSize: number; //Número de resultados a devolver por página. (optional) (default to undefined)
let point: Array<number>; //Point represented in **x,y** format. Represents **point** in **Distance to point filter** (optional) (default to undefined)
let receivedAtAfter: string; //Received at (optional) (default to undefined)
let receivedAtBefore: string; //Received at (optional) (default to undefined)
let search: string; //Un término de búsqueda. (optional) (default to undefined)
let shortId: string; //Short ID (optional) (default to undefined)
let siteType: Array<BreedingsitesListSiteTypeParameter>; //Breeding site type.   (optional) (default to undefined)
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
    hasLarvae,
    hasNearMosquitoes,
    hasPhotos,
    hasWater,
    orderBy,
    page,
    pageSize,
    point,
    receivedAtAfter,
    receivedAtBefore,
    search,
    shortId,
    siteType,
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
| **hasLarvae** | [**boolean**] |  | (optional) defaults to undefined|
| **hasNearMosquitoes** | [**boolean**] |  | (optional) defaults to undefined|
| **hasPhotos** | [**boolean**] | Has any photo | (optional) defaults to undefined|
| **hasWater** | [**boolean**] |  | (optional) defaults to undefined|
| **orderBy** | **Array&lt;BitesListOrderByParameter&gt;** | Ordenamiento   | (optional) defaults to undefined|
| **page** | [**number**] | Un número de página dentro del conjunto de resultados paginado. | (optional) defaults to undefined|
| **pageSize** | [**number**] | Número de resultados a devolver por página. | (optional) defaults to undefined|
| **point** | **Array&lt;number&gt;** | Point represented in **x,y** format. Represents **point** in **Distance to point filter** | (optional) defaults to undefined|
| **receivedAtAfter** | [**string**] | Received at | (optional) defaults to undefined|
| **receivedAtBefore** | [**string**] | Received at | (optional) defaults to undefined|
| **search** | [**string**] | Un término de búsqueda. | (optional) defaults to undefined|
| **shortId** | [**string**] | Short ID | (optional) defaults to undefined|
| **siteType** | **Array&lt;BreedingsitesListSiteTypeParameter&gt;** | Breeding site type.   | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** | Múltiples valores separados por comas. | (optional) defaults to undefined|
| **updatedAtAfter** | [**string**] | Update at | (optional) defaults to undefined|
| **updatedAtBefore** | [**string**] | Update at | (optional) defaults to undefined|
| **userUuid** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedBreedingSiteList**

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
> BreedingSite retrieve()


### Example

```typescript
import {
    BreedingSitesApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new BreedingSitesApi(configuration);

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

**BreedingSite**

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

