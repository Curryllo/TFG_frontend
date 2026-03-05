# AssignedObservation


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uuid** | **string** |  | [readonly] [default to undefined]
**short_id** | **string** |  | [readonly] [default to undefined]
**created_at** | **string** |  | [default to undefined]
**created_at_local** | **string** | The date and time when the record was created, displayed without timezone field. | [readonly] [default to undefined]
**received_at** | **string** |  | [readonly] [default to undefined]
**location** | [**SimplifiedLocation**](SimplifiedLocation.md) |  | [default to undefined]
**note** | **string** |  | [readonly] [default to undefined]
**photos** | [**Array&lt;SimplePhoto&gt;**](SimplePhoto.md) |  | [readonly] [default to undefined]
**user** | [**MinimalUser**](MinimalUser.md) |  | [readonly] [default to undefined]

## Example

```typescript
import { AssignedObservation } from 'mosquito-alert';

const instance: AssignedObservation = {
    uuid,
    short_id,
    created_at,
    created_at_local,
    received_at,
    location,
    note,
    photos,
    user,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
