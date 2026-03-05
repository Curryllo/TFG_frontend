# BreedingSite


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uuid** | **string** |  | [readonly] [default to undefined]
**short_id** | **string** |  | [readonly] [default to undefined]
**user_uuid** | **string** |  | [readonly] [default to undefined]
**created_at** | **string** |  | [default to undefined]
**created_at_local** | **string** | The date and time when the record was created, displayed without timezone field. | [readonly] [default to undefined]
**sent_at** | **string** |  | [default to undefined]
**received_at** | **string** |  | [readonly] [default to undefined]
**updated_at** | **string** | Date and time when the report was last modified | [readonly] [default to undefined]
**location** | [**Location**](Location.md) |  | [default to undefined]
**note** | **string** |  | [readonly] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**published** | **boolean** |  | [readonly] [default to undefined]
**photos** | [**Array&lt;SimplePhoto&gt;**](SimplePhoto.md) |  | [readonly] [default to undefined]
**site_type** | [**BreedingSiteSiteType**](BreedingSiteSiteType.md) |  | [default to undefined]
**has_water** | **boolean** | Either if the user perceived water in the breeding site. | [optional] [default to undefined]
**in_public_area** | **boolean** | Either if the breeding site is found in a public area. | [optional] [default to undefined]
**has_near_mosquitoes** | **boolean** | Either if the user perceived mosquitoes near the breeding site (less than 10 meters). | [optional] [default to undefined]
**has_larvae** | **boolean** | Either if the user perceived larvaes the breeding site. | [optional] [default to undefined]

## Example

```typescript
import { BreedingSite } from 'mosquito-alert';

const instance: BreedingSite = {
    uuid,
    short_id,
    user_uuid,
    created_at,
    created_at_local,
    sent_at,
    received_at,
    updated_at,
    location,
    note,
    tags,
    published,
    photos,
    site_type,
    has_water,
    in_public_area,
    has_near_mosquitoes,
    has_larvae,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
