# FixRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**coverage_uuid** | **string** |  | [default to undefined]
**created_at** | **string** |  | [default to undefined]
**sent_at** | **string** |  | [default to undefined]
**point** | [**FixLocationRequest**](FixLocationRequest.md) |  | [default to undefined]
**power** | **number** | Power level of phone at time fix recorded, expressed as proportion of full charge. Range: 0-1. | [optional] [default to undefined]

## Example

```typescript
import { FixRequest } from 'mosquito-alert';

const instance: FixRequest = {
    coverage_uuid,
    created_at,
    sent_at,
    point,
    power,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
