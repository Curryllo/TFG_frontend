# Campaign


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [readonly] [default to undefined]
**country_id** | **number** | Country in which the campaign is taking place | [readonly] [default to undefined]
**posting_address** | **string** | Full posting address of the place where the samples will be sent | [default to undefined]
**start_date** | **string** | Date when the campaign starts. No samples should be collected BEFORE this date. | [default to undefined]
**end_date** | **string** | Date when the campaign ends. No samples should be collected AFTER this date. | [default to undefined]

## Example

```typescript
import { Campaign } from 'mosquito-alert';

const instance: Campaign = {
    id,
    country_id,
    posting_address,
    start_date,
    end_date,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
