# UserNotificationCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**receiver_type** | [**UserNotificationCreateRequestReceiverType**](UserNotificationCreateRequestReceiverType.md) |  | [optional] [default to undefined]
**message** | [**CreateNotificationMessageRequest**](CreateNotificationMessageRequest.md) | The message of the notification | [default to undefined]
**user_uuids** | **Array&lt;string&gt;** |  | [default to undefined]

## Example

```typescript
import { UserNotificationCreateRequest } from 'mosquito-alert';

const instance: UserNotificationCreateRequest = {
    receiver_type,
    message,
    user_uuids,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
