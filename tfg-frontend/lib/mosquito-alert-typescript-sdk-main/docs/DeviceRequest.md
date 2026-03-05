# DeviceRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**device_id** | **string** | Unique device identifier | [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**fcm_token** | **string** |  | [default to undefined]
**type** | [**DeviceType**](DeviceType.md) |  | [default to undefined]
**manufacturer** | **string** | The manufacturer of the device. | [optional] [default to undefined]
**model** | **string** | The end-user-visible name for the end product. | [default to undefined]
**os** | [**DeviceOsRequest**](DeviceOsRequest.md) |  | [default to undefined]
**mobile_app** | [**MobileAppRequest**](MobileAppRequest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { DeviceRequest } from 'mosquito-alert';

const instance: DeviceRequest = {
    device_id,
    name,
    fcm_token,
    type,
    manufacturer,
    model,
    os,
    mobile_app,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
