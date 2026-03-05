# IdentificationTask


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**observation** | [**SimplifiedObservationWithPhotos**](SimplifiedObservationWithPhotos.md) |  | [readonly] [default to undefined]
**public_photo** | [**SimplePhoto**](SimplePhoto.md) |  | [readonly] [default to undefined]
**assignments** | [**Array&lt;UserAssignment&gt;**](UserAssignment.md) |  | [readonly] [default to undefined]
**status** | [**IdentificationTaskStatus**](IdentificationTaskStatus.md) |  | [default to undefined]
**is_flagged** | **boolean** |  | [readonly] [default to undefined]
**is_safe** | **boolean** | Indicates if the content is safe for publication. | [readonly] [default to undefined]
**public_note** | **string** |  | [readonly] [default to undefined]
**num_annotations** | **number** |  | [readonly] [default to undefined]
**review** | [**IdentificationTaskReview**](IdentificationTaskReview.md) |  | [readonly] [default to undefined]
**result** | [**IdentificationTaskResult**](IdentificationTaskResult.md) |  | [readonly] [default to undefined]
**created_at** | **string** |  | [readonly] [default to undefined]
**updated_at** | **string** |  | [readonly] [default to undefined]

## Example

```typescript
import { IdentificationTask } from 'mosquito-alert';

const instance: IdentificationTask = {
    observation,
    public_photo,
    assignments,
    status,
    is_flagged,
    is_safe,
    public_note,
    num_annotations,
    review,
    result,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
