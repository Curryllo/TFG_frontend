# CreateNotificationMessageRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | [**LocalizedMessageTitleRequest**](LocalizedMessageTitleRequest.md) | Provide the message\&#39;s title in all supported languages | [default to undefined]
**body** | [**LocalizedMessageBodyRequest**](LocalizedMessageBodyRequest.md) | Provide the message\&#39;s body in all supported languages | [default to undefined]

## Example

```typescript
import { CreateNotificationMessageRequest } from 'mosquito-alert';

const instance: CreateNotificationMessageRequest = {
    title,
    body,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
