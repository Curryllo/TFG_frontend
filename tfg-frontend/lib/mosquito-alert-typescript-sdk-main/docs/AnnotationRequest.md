# AnnotationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**best_photo_uuid** | **string** |  | [optional] [default to undefined]
**classification** | [**SpeciesClassificationRequest**](SpeciesClassificationRequest.md) |  | [default to undefined]
**characteristics** | [**SpeciesCharacteristicsRequest**](SpeciesCharacteristicsRequest.md) |  | [optional] [default to undefined]
**feedback** | [**AnnotationFeedbackRequest**](AnnotationFeedbackRequest.md) |  | [optional] [default to undefined]
**is_flagged** | **boolean** |  | [optional] [default to false]
**is_executive** | **boolean** |  | [optional] [default to false]
**observation_flags** | [**ObservationFlagsRequest**](ObservationFlagsRequest.md) |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { AnnotationRequest } from 'mosquito-alert';

const instance: AnnotationRequest = {
    best_photo_uuid,
    classification,
    characteristics,
    feedback,
    is_flagged,
    is_executive,
    observation_flags,
    tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
