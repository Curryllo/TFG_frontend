# IdentificationTaskResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**source** | [**IdentificationTaskResultSource**](IdentificationTaskResultSource.md) |  | [default to undefined]
**taxon** | [**SimpleTaxon**](SimpleTaxon.md) |  | [readonly] [default to undefined]
**is_high_confidence** | **boolean** |  | [readonly] [default to undefined]
**confidence** | **number** |  | [readonly] [default to undefined]
**confidence_label** | **string** |  | [readonly] [default to undefined]
**uncertainty** | **number** |  | [readonly] [default to undefined]
**agreement** | **number** |  | [readonly] [default to undefined]
**characteristics** | [**SpeciesCharacteristics**](SpeciesCharacteristics.md) |  | [readonly] [default to undefined]

## Example

```typescript
import { IdentificationTaskResult } from 'mosquito-alert';

const instance: IdentificationTaskResult = {
    source,
    taxon,
    is_high_confidence,
    confidence,
    confidence_label,
    uncertainty,
    agreement,
    characteristics,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
