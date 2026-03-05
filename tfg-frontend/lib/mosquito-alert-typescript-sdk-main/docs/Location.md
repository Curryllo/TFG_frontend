# Location


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**source** | [**LocationSource**](LocationSource.md) |  | [default to undefined]
**point** | [**Point**](Point.md) |  | [default to undefined]
**timezone** | [**LocationTimezone**](LocationTimezone.md) |  | [default to undefined]
**display_name** | **string** |  | [readonly] [default to undefined]
**country** | [**Country**](Country.md) |  | [readonly] [default to undefined]
**adm_boundaries** | [**Array&lt;AdmBoundary&gt;**](AdmBoundary.md) |  | [readonly] [default to undefined]

## Example

```typescript
import { Location } from 'mosquito-alert';

const instance: Location = {
    source,
    point,
    timezone,
    display_name,
    country,
    adm_boundaries,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
