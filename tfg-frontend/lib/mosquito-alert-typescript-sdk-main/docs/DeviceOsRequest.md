# DeviceOsRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Operating system of device from which this report was submitted. | [default to undefined]
**version** | **string** | Operating system version of device from which this report was submitted. | [default to undefined]
**locale** | **string** | The locale configured in the device following the BCP 47 standard in \&#39;language\&#39; or \&#39;language-region\&#39; format (e.g., \&#39;en\&#39; for English, \&#39;en-US\&#39; for English (United States), \&#39;fr\&#39; for French). The language is a two-letter ISO 639-1 code, and the region is an optional two-letter ISO 3166-1 alpha-2 code. | [optional] [default to undefined]

## Example

```typescript
import { DeviceOsRequest } from 'mosquito-alert';

const instance: DeviceOsRequest = {
    name,
    version,
    locale,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
