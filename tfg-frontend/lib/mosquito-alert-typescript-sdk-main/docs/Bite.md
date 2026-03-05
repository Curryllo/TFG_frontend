# Bite


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
**event_environment** | [**BiteEventEnvironment**](BiteEventEnvironment.md) |  | [optional] [default to undefined]
**event_moment** | [**BiteEventMoment**](BiteEventMoment.md) |  | [optional] [default to undefined]
**counts** | [**BiteCounts**](BiteCounts.md) |  | [default to undefined]

## Example

```typescript
import { Bite } from 'mosquito-alert';

const instance: Bite = {
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
    event_environment,
    event_moment,
    counts,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
