# PhotoPredictionRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**bbox** | [**BoundingBoxRequest**](BoundingBoxRequest.md) |  | [default to undefined]
**insect_confidence** | **number** | Insect confidence | [default to undefined]
**predicted_class** | [**CreatePhotoPredictionPredictedClass**](CreatePhotoPredictionPredictedClass.md) |  | [default to undefined]
**threshold_deviation** | **number** |  | [default to undefined]
**is_decisive** | **boolean** | Indicates if this prediction can close the identification task. | [optional] [default to undefined]
**scores** | [**PredictionScoreRequest**](PredictionScoreRequest.md) |  | [default to undefined]
**classifier_version** | [**CreatePhotoPredictionClassifierVersion**](CreatePhotoPredictionClassifierVersion.md) |  | [default to undefined]

## Example

```typescript
import { PhotoPredictionRequest } from 'mosquito-alert';

const instance: PhotoPredictionRequest = {
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
