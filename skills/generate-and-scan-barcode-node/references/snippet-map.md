# Snippet and example map

Use this reference when you want the closest existing Node pattern before writing new SDK code or when updating docs, snippets, and examples.

## Small end-user examples

- `example.js`: compact generate-and-scan flow that saves the generated `Buffer` to disk and then scans it back.
- `README.md`: install instructions plus the same package-consumer flow in quick-start form.
- `snippets/manualFetchToken.js`: manual OAuth client-credentials token fetch using `axios` and `qs` instead of the SDK.

## Generate patterns

- `snippets/generate/save/generateGet.js`: simple `generate()` and save-to-file flow.
- `snippets/generate/save/generateBody.js`: `generateBody()` with `GenerateParams`.
- `snippets/generate/save/generateMultipart.js`: multipart generation flow.
- `snippets/generate/set-text/*`: `EncodeData` and `EncodeDataType` examples.
- `snippets/generate/set-size/*`: width, height, resolution, and units examples.
- `snippets/generate/set-colorscheme/*`: foreground and background color examples.
- `snippets/generate/appearance/*`: richer `BarcodeImageParams` examples.

## Recognize and scan patterns

- `snippets/read/set-source/recognizeGet.js`: recognize from a public URL.
- `snippets/read/set-source/recognizeMultipart.js`: recognize from a local `Buffer`.
- `snippets/read/set-source/recognizeBody.js`: recognize from base64 bytes.
- `snippets/read/set-source/scanGet.js`: auto-scan from a public URL.
- `snippets/read/set-source/scanMultipart.js`: auto-scan from a local `Buffer`.
- `snippets/read/set-source/scanBody.js`: auto-scan from base64 bytes.
- `snippets/read/set-target-types/*`: choosing a single `DecodeBarcodeType` or a list for `RecognizeBase64Request.barcodeTypes`.
- `snippets/read/set-quality/*`: `RecognitionMode` examples.
- `snippets/read/set-image-kind/*`: `RecognitionImageKind` examples.

## Tests worth copying

- `test/end-to-end.test.ts`: generate a barcode `Buffer`, then scan that same buffer end to end.
- `test/barcodeGenerate.test.ts`: generate via GET, body, and multipart variants.
- `test/barcodeRecognize.test.ts`: recognize via multipart, base64 body, and public URL.
- `test/barcodeScan.test.ts`: scan via multipart, base64 body, and public URL.
- `test/configuration.test.ts`: configuration defaults plus JSON and environment-variable loading.
- `test/errorResponse.test.ts`: parsed API error behavior through `errorResponse`.
- `test/apiClient.test.ts`: `ApiClient` success, HTTP failure, and network-failure behavior.
- `test/multipart.test.ts`: multipart boundary and header generation if transport code changes.
