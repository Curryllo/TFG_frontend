# PredictionScore


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ae_albopictus** | **number** | Score value for the class Aedes albopictus | [default to undefined]
**ae_aegypti** | **number** | Score value for the class Aedes aegypti | [default to undefined]
**ae_japonicus** | **number** | Score value for the class Aedes japonicus | [default to undefined]
**ae_koreicus** | **number** | Score value for the class Aedes koreicus | [default to undefined]
**culex** | **number** | Score value for the class Culex (s.p) | [default to undefined]
**anopheles** | **number** | Score value for the class Anopheles (s.p.) | [default to undefined]
**culiseta** | **number** | Score value for the class Culiseta (s.p.) | [default to undefined]
**other_species** | **number** | Score value for the class Ohter species | [default to undefined]
**not_sure** | **number** | Score value for the class Unidentifiable | [default to undefined]

## Example

```typescript
import { PredictionScore } from 'mosquito-alert';

const instance: PredictionScore = {
    ae_albopictus,
    ae_aegypti,
    ae_japonicus,
    ae_koreicus,
    culex,
    anopheles,
    culiseta,
    other_species,
    not_sure,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
