# CreatePhotoPrediction


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**photo** | [**SimplePhoto**](SimplePhoto.md) |  | [readonly] [default to undefined]
**bbox** | [**BoundingBox**](BoundingBox.md) |  | [default to undefined]
**insect_confidence** | **number** | Insect confidence | [default to undefined]
**predicted_class** | [**CreatePhotoPredictionPredictedClass**](CreatePhotoPredictionPredictedClass.md) |  | [default to undefined]
**taxon** | [**SimpleTaxon**](SimpleTaxon.md) |  | [readonly] [default to undefined]
**threshold_deviation** | **number** |  | [default to undefined]
**is_decisive** | **boolean** | Indicates if this prediction can close the identification task. | [optional] [default to undefined]
**scores** | [**PredictionScore**](PredictionScore.md) |  | [default to undefined]
**classifier_version** | [**CreatePhotoPredictionClassifierVersion**](CreatePhotoPredictionClassifierVersion.md) |  | [default to undefined]
**created_at** | **string** |  | [readonly] [default to undefined]
**updated_at** | **string** |  | [readonly] [default to undefined]

## Example

```typescript
import { CreatePhotoPrediction } from 'mosquito-alert';

const instance: CreatePhotoPrediction = {
    photo,
    bbox,
    insect_confidence,
    predicted_class,
    taxon,
    threshold_deviation,
    is_decisive,
    scores,
    classifier_version,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
