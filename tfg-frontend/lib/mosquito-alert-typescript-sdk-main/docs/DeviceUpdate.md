# DeviceUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**device_id** | **string** | Unique device identifier | [readonly] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**type** | [**DeviceUpdateType**](DeviceUpdateType.md) |  | [default to undefined]
**manufacturer** | **string** | The manufacturer of the device. | [readonly] [default to undefined]
**model** | **string** | The end-user-visible name for the end product. | [readonly] [default to undefined]
**os** | [**DeviceOs**](DeviceOs.md) |  | [default to undefined]
**mobile_app** | [**MobileApp**](MobileApp.md) |  | [optional] [default to undefined]
**user_uuid** | **string** |  | [readonly] [default to undefined]
**last_login** | **string** |  | [readonly] [default to undefined]
**created_at** | **string** |  | [readonly] [default to undefined]
**updated_at** | **string** |  | [readonly] [default to undefined]

## Example

```typescript
import { DeviceUpdate } from 'mosquito-alert';

const instance: DeviceUpdate = {
    device_id,
    name,
    type,
    manufacturer,
    model,
    os,
    mobile_app,
    user_uuid,
    last_login,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
