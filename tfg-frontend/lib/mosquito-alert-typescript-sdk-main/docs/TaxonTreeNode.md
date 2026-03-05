# TaxonTreeNode


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**common_name** | **string** |  | [optional] [default to undefined]
**rank** | [**SimpleTaxonRank**](SimpleTaxonRank.md) |  | [default to undefined]
**italicize** | **boolean** | Display the name in italics when rendering. | [readonly] [default to undefined]
**is_relevant** | **boolean** | Indicates if this taxon is relevant for the application. Will be shown first and will set task to conflict if final taxon is not this. | [default to undefined]
**children** | [**Array&lt;TaxonTreeNode&gt;**](TaxonTreeNode.md) |  | [readonly] [default to undefined]

## Example

```typescript
import { TaxonTreeNode } from 'mosquito-alert';

const instance: TaxonTreeNode = {
    id,
    name,
    common_name,
    rank,
    italicize,
    is_relevant,
    children,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
