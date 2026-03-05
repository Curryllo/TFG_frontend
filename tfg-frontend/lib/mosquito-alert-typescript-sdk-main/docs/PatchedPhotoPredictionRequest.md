# PatchedPhotoPredictionRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**bbox** | [**BoundingBoxRequest**](BoundingBoxRequest.md) |  | [optional] [default to undefined]
**insect_confidence** | **number** | Insect confidence | [optional] [default to undefined]
**predicted_class** | [**CreatePhotoPredictionPredictedClass**](CreatePhotoPredictionPredictedClass.md) |  | [optional] [default to undefined]
**threshold_deviation** | **number** |  | [optional] [default to undefined]
**is_decisive** | **boolean** | Indicates if this prediction can close the identification task. | [optional] [default to undefined]
**scores** | [**PredictionScoreRequest**](PredictionScoreRequest.md) |  | [optional] [default to undefined]
**classifier_version** | [**CreatePhotoPredictionClassifierVersion**](CreatePhotoPredictionClassifierVersion.md) |  | [optional] [default to undefined]

## Example

```typescript
import { PatchedPhotoPredictionRequest } from 'mosquito-alert';

const instance: PatchedPhotoPredictionRequest = {
    bbox,
    insect_confidence,
    predicted_class,
    threshold_deviation,
    is_decisive,
    scores,
    classifier_version,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
