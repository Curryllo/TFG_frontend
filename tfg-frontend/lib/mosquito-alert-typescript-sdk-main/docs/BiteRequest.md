# BiteRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**created_at** | **string** |  | [default to undefined]
**sent_at** | **string** |  | [default to undefined]
**location** | [**LocationRequest**](LocationRequest.md) |  | [default to undefined]
**note** | **string** |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**event_environment** | [**BiteEventEnvironment**](BiteEventEnvironment.md) |  | [optional] [default to undefined]
**event_moment** | [**BiteEventMoment**](BiteEventMoment.md) |  | [optional] [default to undefined]
**counts** | [**BiteCountsRequest**](BiteCountsRequest.md) |  | [default to undefined]

## Example

```typescript
import { BiteRequest } from 'mosquito-alert';

const instance: BiteRequest = {
    created_at,
    sent_at,
    location,
    note,
    tags,
    event_environment,
    event_moment,
    counts,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
