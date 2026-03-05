# Annotation


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [readonly] [default to undefined]
**observation_uuid** | **string** |  | [readonly] [default to undefined]
**user** | [**SimpleAnnotatorUser**](SimpleAnnotatorUser.md) |  | [readonly] [default to undefined]
**best_photo** | [**SimplePhoto**](SimplePhoto.md) |  | [readonly] [default to undefined]
**classification** | [**SpeciesClassification**](SpeciesClassification.md) |  | [default to undefined]
**characteristics** | [**SpeciesCharacteristics**](SpeciesCharacteristics.md) |  | [optional] [default to undefined]
**feedback** | [**AnnotationFeedback**](AnnotationFeedback.md) |  | [optional] [default to undefined]
**type** | [**AnnotationType**](AnnotationType.md) |  | [default to undefined]
**is_flagged** | **boolean** |  | [readonly] [default to false]
**decision_level** | [**AnnotationDecisionLevel**](AnnotationDecisionLevel.md) |  | [default to undefined]
**observation_flags** | [**ObservationFlags**](ObservationFlags.md) |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**created_at** | **string** |  | [readonly] [default to undefined]
**updated_at** | **string** |  | [readonly] [default to undefined]

## Example

```typescript
import { Annotation } from 'mosquito-alert';

const instance: Annotation = {
    id,
    observation_uuid,
    user,
    best_photo,
    classification,
    characteristics,
    feedback,
    type,
    is_flagged,
    decision_level,
    observation_flags,
    tags,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
