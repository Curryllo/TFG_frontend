# Observation


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
**photos** | [**Array&lt;SimplePhoto&gt;**](SimplePhoto.md) |  | [readonly] [default to undefined]
**identification** | [**Identification**](Identification.md) |  | [readonly] [default to undefined]
**event_environment** | [**BiteEventEnvironment**](BiteEventEnvironment.md) |  | [optional] [default to undefined]
**event_moment** | [**BiteEventMoment**](BiteEventMoment.md) |  | [optional] [default to undefined]
**mosquito_appearance** | [**MosquitoAppearance**](MosquitoAppearance.md) | User-provided description of the mosquito\&#39;s appearance | [optional] [default to undefined]

## Example

```typescript
import { Observation } from 'mosquito-alert';

const instance: Observation = {
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
    photos,
    identification,
    event_environment,
    event_moment,
    mosquito_appearance,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
