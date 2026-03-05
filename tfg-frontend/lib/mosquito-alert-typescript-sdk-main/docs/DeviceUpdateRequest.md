# DeviceUpdateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**fcm_token** | **string** |  | [default to undefined]
**os** | [**DeviceOsRequest**](DeviceOsRequest.md) |  | [default to undefined]
**mobile_app** | [**MobileAppRequest**](MobileAppRequest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { DeviceUpdateRequest } from 'mosquito-alert';

const instance: DeviceUpdateRequest = {
    name,
    fcm_token,
    os,
    mobile_app,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
