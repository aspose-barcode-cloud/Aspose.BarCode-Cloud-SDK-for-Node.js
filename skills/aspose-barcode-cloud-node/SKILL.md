---
name: aspose-barcode-cloud-node
description: Write or update Node.js or TypeScript code that uses the Aspose.BarCode Cloud SDK (`aspose-barcode-cloud-node`) to generate, recognize, or scan barcodes through Aspose's cloud REST API. Use this skill whenever the user wants barcode work in Node.js, touches files under `submodules/node`, or mentions `GenerateApi`, `RecognizeApi`, `ScanApi`, `Configuration`, `GenerateParams`, `GenerateRequestWrapper`, `RecognizeBase64Request`, `ScanBase64Request`, or any of the `...RequestWrapper` types. The Node SDK has several easy-to-miss idioms, including constructing `Configuration(clientId, clientSecret, baseUrl?, accessToken?, tokenUrl?)`, wrapping every operation in a request-wrapper object, reading generate results from `result.body` as a `Buffer`, using public `fileUrl` values for GET recognize and scan methods, base64-encoding body payloads yourself, and handling rejected objects that often include `response`, `error`, and `errorResponse`.
---

# Aspose.BarCode Cloud SDK for Node.js

The Node SDK is a thin generated client over the Aspose BarCode Cloud REST API. Most tasks come down to choosing the right API class (`GenerateApi`, `RecognizeApi`, or `ScanApi`), choosing the right transport shape (GET, base64 body, or multipart), and wiring `Configuration` correctly.

The npm package name and import name are the same: install `aspose-barcode-cloud-node`, then `require('aspose-barcode-cloud-node')` or `import * as Barcode from 'aspose-barcode-cloud-node'`.

## Quick start

Use one shared `Configuration` and pass it into each API class:

```ts
import * as Barcode from 'aspose-barcode-cloud-node';

const config = new Barcode.Configuration(clientId, clientSecret);

const generateApi = new Barcode.GenerateApi(config);
const recognizeApi = new Barcode.RecognizeApi(config);
const scanApi = new Barcode.ScanApi(config);
```

Node.js 18 or later is required because the SDK uses the native global `fetch`.

If the task edits SDK source, tests, snippets, or generated files in `submodules/node`, read `references/repo-workflow.md`. If the task needs the closest existing example or snippet, read `references/snippet-map.md`.

## Authenticate correctly

Use one of these two patterns:

1. Let the SDK fetch a JWT lazily from client credentials.

```ts
const config = new Barcode.Configuration(clientId, clientSecret);
```

2. Inject a pre-fetched bearer token.

```ts
const config = new Barcode.Configuration(clientId, clientSecret, undefined, token);
```

If only an external access token is available, pass empty strings for the first two constructor arguments and provide the token as the fourth argument. If no access token is supplied, the SDK requests one on first use and requires non-empty `clientId` and `clientSecret`.

The runtime defaults are:

- `baseUrl`: `https://api.aspose.cloud`
- `tokenUrl`: `https://id.aspose.cloud/connect/token`
- API base: `https://api.aspose.cloud/v4.0`

Inside this repo, tests load `test/configuration.json` first and then fall back to `TEST_CONFIGURATION_*` environment variables. `example.js` optionally passes `TEST_CONFIGURATION_ACCESS_TOKEN` as the fourth `Configuration` argument. Mirror the surrounding file when editing existing repo code.

## Choose the right API shape

Pick the operation first:

- `GenerateApi`: create a barcode image.
- `RecognizeApi`: decode one or more known barcode types and optionally tune recognition.
- `ScanApi`: auto-detect barcode types with the smallest API surface.

Then pick the transport variant based on what the caller has:

- Public internet URL to an image: use `recognize()` or `scan()`. `fileUrl` must be public, not a local path.
- Local file on disk or generated image bytes: use `recognizeMultipart()` or `scanMultipart()` with a `Buffer`.
- Raw bytes already in memory: call `toString('base64')` yourself and use `recognizeBase64()` or `scanBase64()`.
- Simple text plus query parameters for generation: use `generate()`.
- Structured generate payload: use `generateBody()`.
- Multipart-form generation: use `generateMultipart()` when the caller explicitly needs that shape.

Key method names:

- `generate`
- `generateBody`
- `generateMultipart`
- `recognize`
- `recognizeBase64`
- `recognizeMultipart`
- `scan`
- `scanBase64`
- `scanMultipart`

## Follow the Node-specific SDK rules

1. Construct `Configuration` as `new Configuration(clientId, clientSecret, baseUrl?, accessToken?, tokenUrl?)`.
2. Instantiate APIs as `new GenerateApi(config)` and the equivalent `RecognizeApi` and `ScanApi` constructors.
3. Pass a request-wrapper object to every endpoint. Examples include `GenerateRequestWrapper`, `GenerateBodyRequestWrapper`, `RecognizeBase64RequestWrapper`, and `ScanMultipartRequestWrapper`.
4. `generate()`, `generateBody()`, and `generateMultipart()` resolve to `{ response, body }` where `body` is a `Buffer`. Save it to disk, return it directly, or pass it into `ScanMultipartRequestWrapper`.
5. Recognize and scan methods resolve to `{ response, body }` where `body` is `BarcodeResponseList`. Iterate `result.body.barcodes` and read `barcodeValue`, `type`, `region`, and `checksum`.
6. Build base64-body requests in two layers: create `RecognizeBase64Request` or `ScanBase64Request`, then wrap that model in the matching `...RequestWrapper`.
7. Base64-encode payloads yourself before `recognizeBase64()` or `scanBase64()`. The SDK does not encode raw bytes for you.
8. `recognize()` and `scan()` GET variants only work with public URLs. For local files or in-memory bytes, use multipart or base64 instead.
9. `recognize()` and `recognizeMultipart()` take one `DecodeBarcodeType`. `RecognizeBase64Request.barcodeTypes` takes an array.
10. Recognition tuning (`RecognitionMode`, `RecognitionImageKind`) is available on recognize methods, not `ScanApi`.
11. Promise rejections are structured objects rather than plain `Error` in many failure cases. Inspect `err.errorResponse?.error?.message`, `err.response?.statusCode`, and `err.error?.code` before assuming a simple thrown string.
12. Use `ApiClient` only when working on SDK internals. Normal consumer code should stay on `GenerateApi`, `RecognizeApi`, or `ScanApi`.

## Reuse the common patterns

Generate and save a QR code:

```ts
import fs from 'fs';
import * as Barcode from 'aspose-barcode-cloud-node';

const api = new Barcode.GenerateApi(new Barcode.Configuration(clientId, clientSecret));
const request = new Barcode.GenerateRequestWrapper(Barcode.EncodeBarcodeType.Qr, 'hello from Node');

const generated = await api.generate(request);
fs.writeFileSync('qr.png', generated.body);
```

Recognize a local file buffer:

```ts
import fs from 'fs';
import * as Barcode from 'aspose-barcode-cloud-node';

const api = new Barcode.RecognizeApi(new Barcode.Configuration(clientId, clientSecret));
const request = new Barcode.RecognizeMultipartRequestWrapper(
    Barcode.DecodeBarcodeType.Qr,
    fs.readFileSync('qr.png')
);

const recognized = await api.recognizeMultipart(request);

for (const barcode of recognized.body.barcodes) {
    console.log(barcode.barcodeValue);
}
```

Auto-scan bytes already in memory:

```ts
import fs from 'fs';
import * as Barcode from 'aspose-barcode-cloud-node';

const fileBase64 = fs.readFileSync('unknown.png').toString('base64');
const request = new Barcode.ScanBase64Request();
request.fileBase64 = fileBase64;

const result = await new Barcode.ScanApi(
    new Barcode.Configuration(clientId, clientSecret)
).scanBase64(new Barcode.ScanBase64RequestWrapper(request));
```

## Work inside this repo

Read `references/repo-workflow.md` when the task changes SDK source, tests, snippets, package metadata, docs, or generated code in `submodules/node`.

Read `references/snippet-map.md` when the task needs example code, README-aligned snippets, or the closest existing pattern for a generate, recognize, or scan scenario.

## Final checklist

1. Use the correct package and import pair: `aspose-barcode-cloud-node` for both install and imports.
2. Build `Configuration(clientId, clientSecret, baseUrl?, accessToken?, tokenUrl?)` correctly.
3. Pass the matching request-wrapper object into every SDK call.
4. Use GET only for public URLs, multipart for local `Buffer` values, and base64-body variants for in-memory bytes.
5. Treat generate results as `Buffer` in `result.body` and recognize or scan results as `result.body.barcodes`.
6. Base64-encode request payloads yourself before `recognizeBase64()` or `scanBase64()`.
7. Inspect `errorResponse`, `response`, and `error` when handling failures.
8. When changing the repo, validate with the submodule workflow in `references/repo-workflow.md`.
