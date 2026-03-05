# SimpleTaxon


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**common_name** | **string** |  | [optional] [default to undefined]
**rank** | [**SimpleTaxonRank**](SimpleTaxonRank.md) |  | [default to undefined]
**italicize** | **boolean** | Display the name in italics when rendering. | [readonly] [default to undefined]

## Example

```typescript
import { SimpleTaxon } from 'mosquito-alert';

const instance: SimpleTaxon = {
    id,
    name,
    common_name,
    rank,
    italicize,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
