# BreedingSiteGeoModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uuid** | **string** |  | [readonly] [default to undefined]
**point** | [**Point**](Point.md) |  | [default to undefined]
**received_at** | **string** |  | [readonly] [default to undefined]
**site_type** | [**BreedingSiteSiteType**](BreedingSiteSiteType.md) |  | [default to undefined]
**has_water** | **boolean** | Either if the user perceived water in the breeding site. | [optional] [default to undefined]

## Example

```typescript
import { BreedingSiteGeoModel } from 'mosquito-alert';

const instance: BreedingSiteGeoModel = {
    uuid,
    point,
    received_at,
    site_type,
    has_water,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
