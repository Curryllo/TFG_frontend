# MetaNotificationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**receiver_type** | [**TopicNotificationCreateRequestReceiverType**](TopicNotificationCreateRequestReceiverType.md) |  | [optional] [default to undefined]
**message** | [**CreateNotificationMessageRequest**](CreateNotificationMessageRequest.md) | The message of the notification | [default to undefined]
**user_uuids** | **Array&lt;string&gt;** |  | [default to undefined]
**topic_codes** | **Array&lt;string&gt;** |  | [default to undefined]

## Example

```typescript
import { MetaNotificationRequest } from 'mosquito-alert';

const instance: MetaNotificationRequest = {
    receiver_type,
    message,
    user_uuids,
    topic_codes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
