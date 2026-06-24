# Documentation for API Endpoints

## class GenerateApi

### generate

Generate a barcode using a GET request with parameters in the route and query string.

```ts
generate(barcodeType: EncodeBarcodeType, data: string): Buffer;
```

#### GenerateApi.generate parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **barcodeType** | [**EncodeBarcodeType**](models.md#)| Type of barcode to generate. |
 **data** | **string**| String that represents the data to encode. |
 **dataType** | [**EncodeDataType**](models.md#)| Type of data to encode. Default value: StringData. | [optional]
 **imageFormat** | [**BarcodeImageFormat**](models.md#)| Barcode output image format. Default value: png. | [optional]
 **textLocation** | [**CodeLocation**](models.md#)| Specify the displayed text location. Set to CodeLocation.None to hide CodeText. Default value depends on BarcodeType: CodeLocation.Below for 1D barcodes and CodeLocation.None for 2D barcodes. | [optional]
 **foregroundColor** | **string**| Specify the display color for bars and content. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: Black. | [optional] [default to '&#39;Black&#39;']
 **backgroundColor** | **string**| Background color of the barcode image. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: White. | [optional] [default to '&#39;White&#39;']
 **units** | [**GraphicsUnit**](models.md#)| Common units for all measurements. Default units: pixels. | [optional]
 **resolution** | **number**| Resolution of the barcode image. One value for both dimensions. Default value: 96 dpi. Decimal separator is a dot. | [optional]
 **imageHeight** | **number**| Height of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot. | [optional]
 **imageWidth** | **number**| Width of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot. | [optional]
 **rotationAngle** | **number**| Barcode image rotation angle, measured in degrees. For example, RotationAngle &#x3D; 0 or RotationAngle &#x3D; 360 means no rotation. If RotationAngle is not equal to 90, 180, 270, or 0, it may increase the difficulty for the scanner to read the image. Default value: 0. | [optional]
 **qrEncodeMode** | [**QREncodeMode**](models.md#)| QR barcode encode mode. | [optional]
 **qrErrorLevel** | [**QRErrorLevel**](models.md#)| QR barcode error correction level. | [optional]
 **qrVersion** | [**QRVersion**](models.md#)| QR barcode version. Automatically selects the smallest version that fits the data. | [optional]
 **qrECIEncoding** | [**ECIEncodings**](models.md#)| ECI encoding for QR barcode data. | [optional]
 **qrAspectRatio** | **number**| QR barcode aspect ratio. Values: 0 to 1. | [optional]
 **microQRVersion** | [**MicroQRVersion**](models.md#)| MicroQR barcode version. Used when BarcodeType is MicroQR. | [optional]
 **rectMicroQrVersion** | [**RectMicroQRVersion**](models.md#)| RectMicroQR barcode version. Used when BarcodeType is RectMicroQR. | [optional]
 **code128EncodeMode** | [**Code128EncodeMode**](models.md#)| Code128 barcode encode mode. Controls which Code 128 subset (A, B, C, or mix) is used. | [optional]
 **pdf417EncodeMode** | [**Pdf417EncodeMode**](models.md#)| PDF417 barcode encode mode. | [optional]
 **pdf417ErrorLevel** | [**Pdf417ErrorLevel**](models.md#)| PDF417 barcode error correction level. | [optional]
 **pdf417Truncate** | **boolean**| Whether to use truncated PDF417 format (removes right-side stop pattern). | [optional]
 **pdf417Columns** | **number**| Number of columns in the PDF417 barcode. Values between 1 and 30. 0 for auto. | [optional]
 **pdf417Rows** | **number**| Number of rows in the PDF417 barcode. Values between 3 and 90. 0 for automatic. | [optional]
 **pdf417AspectRatio** | **number**| PDF417 barcode aspect ratio (height/width of the barcode module). Values are defined by the standard: 2 to 5 for MicroPdf417; 3 to 5 for Pdf417 and MacroPdf417. | [optional]
 **pdf417ECIEncoding** | [**ECIEncodings**](models.md#)| ECI encoding for PDF417 barcode data. | [optional]
 **pdf417IsReaderInitialization** | **boolean**| Whether the barcode is used for reader initialization (programming). | [optional]
 **pdf417MacroCharacters** | [**MacroCharacter**](models.md#)| Macro character to prepend (structured append). | [optional]
 **pdf417IsLinked** | **boolean**| Whether to use linked mode (for MicroPdf417). | [optional]
 **pdf417IsCode128Emulation** | **boolean**| Whether to use Code128 emulation for MicroPdf417. | [optional]

#### GenerateApi.generate return type

Buffer

---

### generateBody

Generate a barcode using a POST request with parameters in the request body in JSON or XML format.

```ts
generateBody(generateParams: GenerateParams): Buffer;
```

#### GenerateApi.generateBody parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **generateParams** | [**GenerateParams**](models.md#GenerateParams)| Generation parameters. |

#### GenerateApi.generateBody return type

Buffer

---

### generateMultipart

Generate a barcode using a POST request with parameters in a multipart form.

```ts
generateMultipart(barcodeType: EncodeBarcodeType, data: string): Buffer;
```

#### GenerateApi.generateMultipart parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **barcodeType** | [**EncodeBarcodeType**](models.md#EncodeBarcodeType)| See https://reference.aspose.com/barcode/net/aspose.barcode.generation/encodetypes/ |
 **data** | **string**| String that represents the data to encode. |
 **dataType** | [**EncodeDataType**](models.md#EncodeDataType)| Type of data to encode. Default value: StringData. | [optional]
 **imageFormat** | [**BarcodeImageFormat**](models.md#BarcodeImageFormat)| Barcode output image format. Default value: png. | [optional]
 **textLocation** | [**CodeLocation**](models.md#CodeLocation)| Specify the displayed text location. Set to CodeLocation.None to hide CodeText. Default value depends on BarcodeType: CodeLocation.Below for 1D barcodes and CodeLocation.None for 2D barcodes. | [optional]
 **foregroundColor** | **string**| Specify the display color for bars and content. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: Black. | [optional] [default to '&#39;Black&#39;']
 **backgroundColor** | **string**| Background color of the barcode image. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: White. | [optional] [default to '&#39;White&#39;']
 **units** | [**GraphicsUnit**](models.md#GraphicsUnit)| Common units for all measurements. Default units: pixels. | [optional]
 **resolution** | **number**| Resolution of the barcode image. One value for both dimensions. Default value: 96 dpi. Decimal separator is a dot. | [optional]
 **imageHeight** | **number**| Height of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot. | [optional]
 **imageWidth** | **number**| Width of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot. | [optional]
 **rotationAngle** | **number**| Barcode image rotation angle, measured in degrees. For example, RotationAngle &#x3D; 0 or RotationAngle &#x3D; 360 means no rotation. If RotationAngle is not equal to 90, 180, 270, or 0, it may increase the difficulty for the scanner to read the image. Default value: 0. | [optional]
 **qrEncodeMode** | [**QREncodeMode**](models.md#QREncodeMode)| QR barcode encode mode. | [optional]
 **qrErrorLevel** | [**QRErrorLevel**](models.md#QRErrorLevel)| QR barcode error correction level. | [optional]
 **qrVersion** | [**QRVersion**](models.md#QRVersion)| QR barcode version. Automatically selects the smallest version that fits the data. | [optional]
 **qrECIEncoding** | [**ECIEncodings**](models.md#ECIEncodings)| ECI encoding for QR barcode data. | [optional]
 **qrAspectRatio** | **number**| QR barcode aspect ratio. Values: 0 to 1. | [optional]
 **microQRVersion** | [**MicroQRVersion**](models.md#MicroQRVersion)| MicroQR barcode version. Used when BarcodeType is MicroQR. | [optional]
 **rectMicroQrVersion** | [**RectMicroQRVersion**](models.md#RectMicroQRVersion)| RectMicroQR barcode version. Used when BarcodeType is RectMicroQR. | [optional]
 **code128EncodeMode** | [**Code128EncodeMode**](models.md#Code128EncodeMode)| Code128 barcode encode mode. Controls which Code 128 subset (A, B, C, or mix) is used. | [optional]
 **pdf417EncodeMode** | [**Pdf417EncodeMode**](models.md#Pdf417EncodeMode)| PDF417 barcode encode mode. | [optional]
 **pdf417ErrorLevel** | [**Pdf417ErrorLevel**](models.md#Pdf417ErrorLevel)| PDF417 barcode error correction level. | [optional]
 **pdf417Truncate** | **boolean**| Whether to use truncated PDF417 format (removes right-side stop pattern). | [optional]
 **pdf417Columns** | **number**| Number of columns in the PDF417 barcode. Values between 1 and 30. 0 for auto. | [optional]
 **pdf417Rows** | **number**| Number of rows in the PDF417 barcode. Values between 3 and 90. 0 for automatic. | [optional]
 **pdf417AspectRatio** | **number**| PDF417 barcode aspect ratio (height/width of the barcode module). Values are defined by the standard: 2 to 5 for MicroPdf417; 3 to 5 for Pdf417 and MacroPdf417. | [optional]
 **pdf417ECIEncoding** | [**ECIEncodings**](models.md#ECIEncodings)| ECI encoding for PDF417 barcode data. | [optional]
 **pdf417IsReaderInitialization** | **boolean**| Whether the barcode is used for reader initialization (programming). | [optional]
 **pdf417MacroCharacters** | [**MacroCharacter**](models.md#MacroCharacter)| Macro character to prepend (structured append). | [optional]
 **pdf417IsLinked** | **boolean**| Whether to use linked mode (for MicroPdf417). | [optional]
 **pdf417IsCode128Emulation** | **boolean**| Whether to use Code128 emulation for MicroPdf417. | [optional]

#### GenerateApi.generateMultipart return type

Buffer

---

## class RecognizeApi

### recognize

Recognize a barcode from a file on an Internet server using a GET request with a query string parameter. For recognizing files from your hard drive, use `recognize-body` or `recognize-multipart` endpoints instead.

```ts
recognize(barcodeType: DecodeBarcodeType, fileUrl: string): BarcodeResponseList;
```

#### RecognizeApi.recognize parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **barcodeType** | [**DecodeBarcodeType**](models.md#)| Type of barcode to recognize. |
 **fileUrl** | **string**| URL to the barcode image. |
 **recognitionMode** | [**RecognitionMode**](models.md#)| Recognition mode. | [optional]
 **recognitionImageKind** | [**RecognitionImageKind**](models.md#)| Image kind for recognition. | [optional]

#### RecognizeApi.recognize return type

[**BarcodeResponseList**](models.md#BarcodeResponseList)

---

### recognizeBase64

Recognize a barcode from a file in the request body using a POST request with JSON or XML body parameters.

```ts
recognizeBase64(recognizeBase64Request: RecognizeBase64Request): BarcodeResponseList;
```

#### RecognizeApi.recognizeBase64 parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **recognizeBase64Request** | [**RecognizeBase64Request**](models.md#RecognizeBase64Request)| Barcode recognition request. |

#### RecognizeApi.recognizeBase64 return type

[**BarcodeResponseList**](models.md#BarcodeResponseList)

---

### recognizeMultipart

Recognize a barcode from a file in the request body using a POST request with multipart form parameters.

```ts
recognizeMultipart(barcodeType: DecodeBarcodeType, file: RequestFile): BarcodeResponseList;
```

#### RecognizeApi.recognizeMultipart parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **barcodeType** | [**DecodeBarcodeType**](models.md#DecodeBarcodeType)| See https://reference.aspose.com/barcode/net/aspose.barcode.barcoderecognition/decodetype/ |
 **file** | **RequestFile****RequestFile**| Barcode image file. |
 **recognitionMode** | [**RecognitionMode**](models.md#RecognitionMode)| Recognition mode. | [optional]
 **recognitionImageKind** | [**RecognitionImageKind**](models.md#RecognitionImageKind)| Image kind for recognition. | [optional]

#### RecognizeApi.recognizeMultipart return type

[**BarcodeResponseList**](models.md#BarcodeResponseList)

---

## class ScanApi

### scan

Scan a barcode from a file on an Internet server using a GET request with a query string parameter. For scanning files from your hard drive, use `scan-body` or `scan-multipart` endpoints instead.

```ts
scan(fileUrl: string): BarcodeResponseList;
```

#### ScanApi.scan parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **fileUrl** | **string**| URL to the barcode image. |

#### ScanApi.scan return type

[**BarcodeResponseList**](models.md#BarcodeResponseList)

---

### scanBase64

Scan a barcode from a file in the request body using a POST request with a JSON or XML body parameter.

```ts
scanBase64(scanBase64Request: ScanBase64Request): BarcodeResponseList;
```

#### ScanApi.scanBase64 parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **scanBase64Request** | [**ScanBase64Request**](models.md#ScanBase64Request)| Barcode scan request. |

#### ScanApi.scanBase64 return type

[**BarcodeResponseList**](models.md#BarcodeResponseList)

---

### scanMultipart

Scan a barcode from a file in the request body using a POST request with a multipart form parameter.

```ts
scanMultipart(file: RequestFile): BarcodeResponseList;
```

#### ScanApi.scanMultipart parameters

Name | Type | Description  | Notes
---- | ---- | ------------ | -----
 **file** | **RequestFile****RequestFile**| Barcode image file. |

#### ScanApi.scanMultipart return type

[**BarcodeResponseList**](models.md#BarcodeResponseList)

---

