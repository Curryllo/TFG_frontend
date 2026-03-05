# CreateOverwriteReviewRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**action** | [**CreateOverwriteReviewRequestAction**](CreateOverwriteReviewRequestAction.md) |  | [default to undefined]
**public_photo_uuid** | **string** |  | [default to undefined]
**is_safe** | **boolean** |  | [default to undefined]
**public_note** | **string** | Notes to display on public map | [default to undefined]
**classification** | [**SpeciesClassificationRequest**](SpeciesClassificationRequest.md) |  | [default to undefined]
**characteristics** | [**SpeciesCharacteristicsRequest**](SpeciesCharacteristicsRequest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CreateOverwriteReviewRequest } from 'mosquito-alert';

const instance: CreateOverwriteReviewRequest = {
    action,
    public_photo_uuid,
    is_safe,
    public_note,
    classification,
    characteristics,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
