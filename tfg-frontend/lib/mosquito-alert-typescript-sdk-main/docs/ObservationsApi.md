# ObservationsApi

All URIs are relative to *https://api.mosquitoalert.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /observations/ | |
|[**destroy**](#destroy) | **DELETE** /observations/{uuid}/ | |
|[**geoList**](#geolist) | **GET** /observations/geo/ | |
|[**list**](#list) | **GET** /observations/ | |
|[**listMine**](#listmine) | **GET** /me/observations/ | |
|[**retrieve**](#retrieve) | **GET** /observations/{uuid}/ | |

# **create**
> Observation create()


### Example

```typescript
import {
    ObservationsApi,
    Configuration,
    LocationRequest,
    MosquitoAppearanceRequest
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new ObservationsApi(configuration);

let createdAt: string; // (default to undefined)
let sentAt: string; // (default to undefined)
let location: LocationRequest; // (default to undefined)
let photos: Array<File>; // (default to undefined)
let note: string; // (optional) (default to undefined)
let tags: Array<string>; // (optional) (default to undefined)
let eventEnvironment: BiteEventEnvironment; // (optional) (default to undefined)
let eventMoment: BiteEventMoment; // (optional) (default to undefined)
let mosquitoAppearance: MosquitoAppearanceRequest; //User-provided description of the mosquito\\\'s appearance (optional) (default to undefined)

const { status, data } = await apiInstance.create(
    createdAt,
    sentAt,
    location,
    photos,
    note,
    tags,
    eventEnvironment,
    eventMoment,
    mosquitoAppearance
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdAt** | [**string**] |  | defaults to undefined|
| **sentAt** | [**string**] |  | defaults to undefined|
| **location** | **LocationRequest** |  | defaults to undefined|
| **photos** | **Array&lt;File&gt;** |  | defaults to undefined|
| **note** | [**string**] |  | (optional) defaults to undefined|
| **tags** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **eventEnvironment** | **BiteEventEnvironment** |  | (optional) defaults to undefined|
| **eventMoment** | **BiteEventMoment** |  | (optional) defaults to undefined|
| **mosquitoAppearance** | **MosquitoAppearanceRequest** | User-provided description of the mosquito\\\&#39;s appearance | (optional) defaults to undefined|


### Return type

**Observation**

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
    ObservationsApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new ObservationsApi(configuration);

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
> Array<ObservationGeoModel> geoList()


### Example

```typescript
import {
    ObservationsApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new ObservationsApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let hasPhotos: boolean; //Has any photo (optional) (default to undefined)
let identificationTaxonIds: Array<string>; // (optional) (default to undefined)
let identificationTaxonIdsLookup: ObservationsListMineIdentificationTaxonIdsLookupParameter; // (optional) (default to undefined)
let negateIdentificationTaxonIds: boolean; //Negate identification_taxon_ids filter (optional) (default to undefined)
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
    hasPhotos,
    identificationTaxonIds,
    identificationTaxonIdsLookup,
    negateIdentificationTaxonIds,
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
| **hasPhotos** | [**boolean**] | Has any photo | (optional) defaults to undefined|
| **identificationTaxonIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **identificationTaxonIdsLookup** | **ObservationsListMineIdentificationTaxonIdsLookupParameter** |  | (optional) defaults to undefined|
| **negateIdentificationTaxonIds** | [**boolean**] | Negate identification_taxon_ids filter | (optional) defaults to undefined|
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

**Array<ObservationGeoModel>**

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
> PaginatedObservationList list()


### Example

```typescript
import {
    ObservationsApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new ObservationsApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let format: BitesListFormatParameter; // (optional) (default to undefined)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let hasPhotos: boolean; //Has any photo (optional) (default to undefined)
let identificationTaxonIds: Array<string>; // (optional) (default to undefined)
let identificationTaxonIdsLookup: ObservationsListMineIdentificationTaxonIdsLookupParameter; // (optional) (default to undefined)
let negateIdentificationTaxonIds: boolean; //Negate identification_taxon_ids filter (optional) (default to undefined)
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
    hasPhotos,
    identificationTaxonIds,
    identificationTaxonIdsLookup,
    negateIdentificationTaxonIds,
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
| **hasPhotos** | [**boolean**] | Has any photo | (optional) defaults to undefined|
| **identificationTaxonIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **identificationTaxonIdsLookup** | **ObservationsListMineIdentificationTaxonIdsLookupParameter** |  | (optional) defaults to undefined|
| **negateIdentificationTaxonIds** | [**boolean**] | Negate identification_taxon_ids filter | (optional) defaults to undefined|
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

**PaginatedObservationList**

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
> PaginatedObservationList listMine()

Get Current User\'s Observations

### Example

```typescript
import {
    ObservationsApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new ObservationsApi(configuration);

let boundaryUuid: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let createdAtAfter: string; //Created at (optional) (default to undefined)
let createdAtBefore: string; //Created at (optional) (default to undefined)
let dist: number; //Represents **Distance** in **Distance to point** filter. Default value is used only if ***point*** is passed. (optional) (default to 1000)
let format: BitesListFormatParameter; // (optional) (default to undefined)
let geoPrecision: number; //Latitude/Longitude precision (optional) (default to undefined)
let hasPhotos: boolean; //Has any photo (optional) (default to undefined)
let identificationTaxonIds: Array<string>; // (optional) (default to undefined)
let identificationTaxonIdsLookup: ObservationsListMineIdentificationTaxonIdsLookupParameter; // (optional) (default to undefined)
let negateIdentificationTaxonIds: boolean; //Negate identification_taxon_ids filter (optional) (default to undefined)
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
    hasPhotos,
    identificationTaxonIds,
    identificationTaxonIdsLookup,
    negateIdentificationTaxonIds,
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
| **hasPhotos** | [**boolean**] | Has any photo | (optional) defaults to undefined|
| **identificationTaxonIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **identificationTaxonIdsLookup** | **ObservationsListMineIdentificationTaxonIdsLookupParameter** |  | (optional) defaults to undefined|
| **negateIdentificationTaxonIds** | [**boolean**] | Negate identification_taxon_ids filter | (optional) defaults to undefined|
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

**PaginatedObservationList**

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
> Observation retrieve()


### Example

```typescript
import {
    ObservationsApi,
    Configuration
} from 'mosquito-alert';

const configuration = new Configuration();
const apiInstance = new ObservationsApi(configuration);

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

**Observation**

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

