# SpeciesClassification


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**taxon** | [**SimpleTaxon**](SimpleTaxon.md) |  | [readonly] [default to undefined]
**confidence** | **number** |  | [readonly] [default to undefined]
**confidence_label** | [**SpeciesClassificationConfidenceLabel**](SpeciesClassificationConfidenceLabel.md) |  | [default to undefined]
**is_high_confidence** | **boolean** |  | [readonly] [default to undefined]

## Example

```typescript
import { SpeciesClassification } from 'mosquito-alert';

const instance: SpeciesClassification = {
    taxon,
    confidence,
    confidence_label,
    is_high_confidence,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
