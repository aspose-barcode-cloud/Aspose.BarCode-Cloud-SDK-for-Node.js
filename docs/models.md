# Models

## ApiError

Api Error.

```ts
interface ApiError {

    /**
     * Gets or sets api error code.
     */
    code: string;

    /**
     * Gets or sets error message.
     */
    message: string;

    /**
     * Gets or sets error description.
     */
    description?: string;

    /**
     * Gets or sets server datetime.
     */
    dateTime?: Date;
    innerError?: ApiError;
}
```

## ApiErrorResponse

ApiError Response

```ts
interface ApiErrorResponse {

    /**
     * Gets or sets request Id.
     */
    requestId: string;
    error: ApiError;
}
```

## BarcodeImageFormat

Specifies the file format of the image.

```ts
enum BarcodeImageFormat {
    Png = 'Png',
    Jpeg = 'Jpeg',
    Svg = 'Svg',
    Tiff = 'Tiff',
    Gif = 'Gif'
}
```

## BarcodeImageParams

Optional barcode image parameters.

```ts
interface BarcodeImageParams {
    imageFormat?: BarcodeImageFormat;
    textLocation?: CodeLocation;

    /**
     * Specify the display color for bars and content. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: Black.
     */
    foregroundColor?: string;

    /**
     * Background color of the barcode image. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: White.
     */
    backgroundColor?: string;
    units?: GraphicsUnit;

    /**
     * Resolution of the barcode image. One value for both dimensions. Default value: 96 dpi. Decimal separator is a dot.
     */
    resolution?: number;

    /**
     * Height of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot.
     */
    imageHeight?: number;

    /**
     * Width of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot.
     */
    imageWidth?: number;

    /**
     * Barcode image rotation angle, measured in degrees. For example, RotationAngle = 0 or RotationAngle = 360 means no rotation. If RotationAngle is not equal to 90, 180, 270, or 0, it may increase the difficulty for the scanner to read the image. Default value: 0.
     */
    rotationAngle?: number;
}
```

## BarcodeResponse

Represents information about a barcode.

```ts
interface BarcodeResponse {

    /**
     * Barcode data.
     */
    barcodeValue?: string;

    /**
     * Type of the barcode.
     */
    type?: string;

    /**
     * Region with the barcode.
     */
    region?: Array<RegionPoint>;

    /**
     * Checksum of the barcode.
     */
    checksum?: string;
}
```

## BarcodeResponseList

Represents information about a barcode list.

```ts
interface BarcodeResponseList {

    /**
     * List of barcodes that are present in the image.
     */
    barcodes: Array<BarcodeResponse>;
}
```

## Code128EncodeMode

Code128 barcode encode mode. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/code128encodemode/

```ts
enum Code128EncodeMode {
    Auto = 'Auto',
    CodeA = 'CodeA',
    CodeB = 'CodeB',
    CodeAb = 'CodeAB',
    CodeC = 'CodeC',
    CodeAc = 'CodeAC',
    CodeBc = 'CodeBC'
}
```

## Code128Params

Optional Code128 barcode generation parameters.

```ts
interface Code128Params {
    code128EncodeMode?: Code128EncodeMode;
}
```

## CodeLocation
```ts
enum CodeLocation {
    Below = 'Below',
    Above = 'Above',
    None = 'None'
}
```

## DecodeBarcodeType

See https://reference.aspose.com/barcode/net/aspose.barcode.barcoderecognition/decodetype/

```ts
enum DecodeBarcodeType {
    MostCommonlyUsed = 'MostCommonlyUsed',
    Qr = 'QR',
    AustraliaPost = 'AustraliaPost',
    AustralianPosteParcel = 'AustralianPosteParcel',
    Aztec = 'Aztec',
    Codabar = 'Codabar',
    CodablockF = 'CodablockF',
    Code11 = 'Code11',
    Code128 = 'Code128',
    Code16K = 'Code16K',
    Code32 = 'Code32',
    Code39 = 'Code39',
    Code39FullAscii = 'Code39FullASCII',
    Code93 = 'Code93',
    CompactPdf417 = 'CompactPdf417',
    DataLogic2of5 = 'DataLogic2of5',
    DataMatrix = 'DataMatrix',
    DatabarExpanded = 'DatabarExpanded',
    DatabarExpandedStacked = 'DatabarExpandedStacked',
    DatabarLimited = 'DatabarLimited',
    DatabarOmniDirectional = 'DatabarOmniDirectional',
    DatabarStacked = 'DatabarStacked',
    DatabarStackedOmniDirectional = 'DatabarStackedOmniDirectional',
    DatabarTruncated = 'DatabarTruncated',
    DeutschePostIdentcode = 'DeutschePostIdentcode',
    DeutschePostLeitcode = 'DeutschePostLeitcode',
    DotCode = 'DotCode',
    DutchKix = 'DutchKIX',
    Ean13 = 'EAN13',
    Ean14 = 'EAN14',
    Ean8 = 'EAN8',
    Gs1Aztec = 'GS1Aztec',
    Gs1Code128 = 'GS1Code128',
    Gs1CompositeBar = 'GS1CompositeBar',
    Gs1DataMatrix = 'GS1DataMatrix',
    Gs1DotCode = 'GS1DotCode',
    Gs1HanXin = 'GS1HanXin',
    Gs1MicroPdf417 = 'GS1MicroPdf417',
    Gs1Qr = 'GS1QR',
    HanXin = 'HanXin',
    HibcAztecLic = 'HIBCAztecLIC',
    HibcAztecPas = 'HIBCAztecPAS',
    HibcCode128Lic = 'HIBCCode128LIC',
    HibcCode128Pas = 'HIBCCode128PAS',
    HibcCode39Lic = 'HIBCCode39LIC',
    HibcCode39Pas = 'HIBCCode39PAS',
    HibcDataMatrixLic = 'HIBCDataMatrixLIC',
    HibcDataMatrixPas = 'HIBCDataMatrixPAS',
    Hibcqrlic = 'HIBCQRLIC',
    Hibcqrpas = 'HIBCQRPAS',
    Iata2of5 = 'IATA2of5',
    Isbn = 'ISBN',
    Ismn = 'ISMN',
    Issn = 'ISSN',
    Itf14 = 'ITF14',
    Itf6 = 'ITF6',
    Interleaved2of5 = 'Interleaved2of5',
    ItalianPost25 = 'ItalianPost25',
    MacroPdf417 = 'MacroPdf417',
    Mailmark = 'Mailmark',
    Matrix2of5 = 'Matrix2of5',
    MaxiCode = 'MaxiCode',
    MicrE13B = 'MicrE13B',
    MicroPdf417 = 'MicroPdf417',
    MicroQr = 'MicroQR',
    Msi = 'MSI',
    OneCode = 'OneCode',
    Opc = 'OPC',
    PatchCode = 'PatchCode',
    Pdf417 = 'Pdf417',
    Pharmacode = 'Pharmacode',
    Planet = 'Planet',
    Postnet = 'Postnet',
    Pzn = 'PZN',
    RectMicroQr = 'RectMicroQR',
    Rm4Scc = 'RM4SCC',
    Scc14 = 'SCC14',
    Sscc18 = 'SSCC18',
    Standard2of5 = 'Standard2of5',
    Supplement = 'Supplement',
    SwissPostParcel = 'SwissPostParcel',
    Upca = 'UPCA',
    Upce = 'UPCE',
    Vin = 'VIN'
}
```

## ECIEncodings

ECI encoding identifiers. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/eciencodings/

```ts
enum ECIEncodings {
    None = 'NONE',
    Iso88591 = 'ISO_8859_1',
    Iso88592 = 'ISO_8859_2',
    Iso88593 = 'ISO_8859_3',
    Iso88594 = 'ISO_8859_4',
    Iso88595 = 'ISO_8859_5',
    Iso88596 = 'ISO_8859_6',
    Iso88597 = 'ISO_8859_7',
    Iso88598 = 'ISO_8859_8',
    Iso88599 = 'ISO_8859_9',
    Iso885910 = 'ISO_8859_10',
    Iso885911 = 'ISO_8859_11',
    Iso885913 = 'ISO_8859_13',
    Iso885914 = 'ISO_8859_14',
    Iso885915 = 'ISO_8859_15',
    Iso885916 = 'ISO_8859_16',
    ShiftJis = 'Shift_JIS',
    Win1250 = 'Win1250',
    Win1251 = 'Win1251',
    Win1252 = 'Win1252',
    Win1256 = 'Win1256',
    Utf16Be = 'UTF16BE',
    Utf8 = 'UTF8',
    UsAscii = 'US_ASCII',
    Big5 = 'Big5',
    Gb2312 = 'GB2312',
    EucKr = 'EUC_KR',
    Gbk = 'GBK',
    Gb18030 = 'GB18030',
    Utf16Le = 'UTF16LE',
    Utf32Be = 'UTF32BE',
    Utf32Le = 'UTF32LE',
    Invariant = 'INVARIANT',
    Binary = 'BINARY'
}
```

## EncodeBarcodeType

See https://reference.aspose.com/barcode/net/aspose.barcode.generation/encodetypes/

```ts
enum EncodeBarcodeType {
    Qr = 'QR',
    AustraliaPost = 'AustraliaPost',
    AustralianPosteParcel = 'AustralianPosteParcel',
    Aztec = 'Aztec',
    Codabar = 'Codabar',
    CodablockF = 'CodablockF',
    Code11 = 'Code11',
    Code128 = 'Code128',
    Code16K = 'Code16K',
    Code32 = 'Code32',
    Code39 = 'Code39',
    Code39FullAscii = 'Code39FullASCII',
    Code93 = 'Code93',
    DataLogic2of5 = 'DataLogic2of5',
    DataMatrix = 'DataMatrix',
    DatabarExpanded = 'DatabarExpanded',
    DatabarExpandedStacked = 'DatabarExpandedStacked',
    DatabarLimited = 'DatabarLimited',
    DatabarOmniDirectional = 'DatabarOmniDirectional',
    DatabarStacked = 'DatabarStacked',
    DatabarStackedOmniDirectional = 'DatabarStackedOmniDirectional',
    DatabarTruncated = 'DatabarTruncated',
    DeutschePostIdentcode = 'DeutschePostIdentcode',
    DeutschePostLeitcode = 'DeutschePostLeitcode',
    DotCode = 'DotCode',
    DutchKix = 'DutchKIX',
    Ean13 = 'EAN13',
    Ean14 = 'EAN14',
    Ean8 = 'EAN8',
    Gs1Aztec = 'GS1Aztec',
    Gs1CodablockF = 'GS1CodablockF',
    Gs1Code128 = 'GS1Code128',
    Gs1DataMatrix = 'GS1DataMatrix',
    Gs1DotCode = 'GS1DotCode',
    Gs1HanXin = 'GS1HanXin',
    Gs1MicroPdf417 = 'GS1MicroPdf417',
    Gs1Qr = 'GS1QR',
    HanXin = 'HanXin',
    Iata2of5 = 'IATA2of5',
    Isbn = 'ISBN',
    Ismn = 'ISMN',
    Issn = 'ISSN',
    Itf14 = 'ITF14',
    Itf6 = 'ITF6',
    Interleaved2of5 = 'Interleaved2of5',
    ItalianPost25 = 'ItalianPost25',
    Msi = 'MSI',
    MacroPdf417 = 'MacroPdf417',
    Mailmark = 'Mailmark',
    Matrix2of5 = 'Matrix2of5',
    MaxiCode = 'MaxiCode',
    MicroPdf417 = 'MicroPdf417',
    MicroQr = 'MicroQR',
    Opc = 'OPC',
    OneCode = 'OneCode',
    Pzn = 'PZN',
    PatchCode = 'PatchCode',
    Pdf417 = 'Pdf417',
    Pharmacode = 'Pharmacode',
    Planet = 'Planet',
    Postnet = 'Postnet',
    Rm4Scc = 'RM4SCC',
    RectMicroQr = 'RectMicroQR',
    Scc14 = 'SCC14',
    Sscc18 = 'SSCC18',
    SingaporePost = 'SingaporePost',
    Standard2of5 = 'Standard2of5',
    SwissPostParcel = 'SwissPostParcel',
    Upca = 'UPCA',
    Upce = 'UPCE',
    UpcaGs1Code128Coupon = 'UpcaGs1Code128Coupon',
    UpcaGs1DatabarCoupon = 'UpcaGs1DatabarCoupon',
    Vin = 'VIN'
}
```

## EncodeData

Data to encode in a barcode.

```ts
interface EncodeData {
    dataType?: EncodeDataType;

    /**
     * String that represents the data to encode.
     */
    data: string;
}
```

## EncodeDataType

Types of data that can be encoded into a barcode.

```ts
enum EncodeDataType {
    StringData = 'StringData',
    Base64Bytes = 'Base64Bytes',
    HexBytes = 'HexBytes'
}
```

## GenerateParams

Barcode generation parameters.

```ts
interface GenerateParams {
    barcodeType: EncodeBarcodeType;
    encodeData: EncodeData;
    barcodeImageParams?: BarcodeImageParams;
    qrParams?: QrParams;
    code128Params?: Code128Params;
    pdf417Params?: Pdf417Params;
}
```

## GraphicsUnit

Subset of https://reference.aspose.com/drawing/net/system.drawing/graphicsunit/

```ts
enum GraphicsUnit {
    Pixel = 'Pixel',
    Point = 'Point',
    Inch = 'Inch',
    Millimeter = 'Millimeter'
}
```

## MacroCharacter

PDF417 macro character mode. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/macrocharacter/

```ts
enum MacroCharacter {
    None = 'None',
    Macro05 = 'Macro05',
    Macro06 = 'Macro06'
}
```

## MicroQRVersion

MicroQR barcode version. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/microqrversion/

```ts
enum MicroQRVersion {
    Auto = 'Auto',
    M1 = 'M1',
    M2 = 'M2',
    M3 = 'M3',
    M4 = 'M4'
}
```

## Pdf417EncodeMode

PDF417 barcode encode mode. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/pdf417encodemode/

```ts
enum Pdf417EncodeMode {
    Auto = 'Auto',
    Binary = 'Binary',
    Eci = 'ECI',
    Extended = 'Extended'
}
```

## Pdf417ErrorLevel

PDF417 barcode error correction level. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/pdf417errorlevel/

```ts
enum Pdf417ErrorLevel {
    Level0 = 'Level0',
    Level1 = 'Level1',
    Level2 = 'Level2',
    Level3 = 'Level3',
    Level4 = 'Level4',
    Level5 = 'Level5',
    Level6 = 'Level6',
    Level7 = 'Level7',
    Level8 = 'Level8'
}
```

## Pdf417Params

Optional PDF417 barcode generation parameters. Applies to Pdf417, MacroPdf417, MicroPdf417, and GS1MicroPdf417 barcode types.

```ts
interface Pdf417Params {
    pdf417EncodeMode?: Pdf417EncodeMode;
    pdf417ErrorLevel?: Pdf417ErrorLevel;

    /**
     * Whether to use truncated PDF417 format (removes right-side stop pattern).
     */
    pdf417Truncate?: boolean;

    /**
     * Number of columns in the PDF417 barcode. Values between 1 and 30. 0 for auto.
     */
    pdf417Columns?: number;

    /**
     * Number of rows in the PDF417 barcode. Values between 3 and 90. 0 for automatic.
     */
    pdf417Rows?: number;

    /**
     * PDF417 barcode aspect ratio (height/width of the barcode module). Values are defined by the standard: 2 to 5 for MicroPdf417; 3 to 5 for Pdf417 and MacroPdf417.
     */
    pdf417AspectRatio?: number;
    pdf417ECIEncoding?: ECIEncodings;

    /**
     * Whether the barcode is used for reader initialization (programming).
     */
    pdf417IsReaderInitialization?: boolean;
    pdf417MacroCharacters?: MacroCharacter;

    /**
     * Whether to use linked mode (for MicroPdf417).
     */
    pdf417IsLinked?: boolean;

    /**
     * Whether to use Code128 emulation for MicroPdf417.
     */
    pdf417IsCode128Emulation?: boolean;
}
```

## QREncodeMode

QR barcode encode mode. Subset of https://reference.aspose.com/barcode/net/aspose.barcode.generation/qrencodemode/ Obsolete members (Bytes, Utf8BOM, Utf16BEBOM, ECIEncoding, ExtendedCodetext) are omitted.

```ts
enum QREncodeMode {
    Auto = 'Auto',
    Extended = 'Extended',
    Binary = 'Binary',
    Eci = 'ECI'
}
```

## QRErrorLevel

QR barcode error correction level. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/qrerrorlevel/

```ts
enum QRErrorLevel {
    LevelL = 'LevelL',
    LevelM = 'LevelM',
    LevelQ = 'LevelQ',
    LevelH = 'LevelH'
}
```

## QRVersion

QR barcode version. Subset of https://reference.aspose.com/barcode/net/aspose.barcode.generation/qrversion/ MicroQR versions (VersionM1–VersionM4) are omitted; use Aspose.BarCode.Cloud.DTO.Enums.MicroQRVersion instead.

```ts
enum QRVersion {
    Auto = 'Auto',
    Version01 = 'Version01',
    Version02 = 'Version02',
    Version03 = 'Version03',
    Version04 = 'Version04',
    Version05 = 'Version05',
    Version06 = 'Version06',
    Version07 = 'Version07',
    Version08 = 'Version08',
    Version09 = 'Version09',
    Version10 = 'Version10',
    Version11 = 'Version11',
    Version12 = 'Version12',
    Version13 = 'Version13',
    Version14 = 'Version14',
    Version15 = 'Version15',
    Version16 = 'Version16',
    Version17 = 'Version17',
    Version18 = 'Version18',
    Version19 = 'Version19',
    Version20 = 'Version20',
    Version21 = 'Version21',
    Version22 = 'Version22',
    Version23 = 'Version23',
    Version24 = 'Version24',
    Version25 = 'Version25',
    Version26 = 'Version26',
    Version27 = 'Version27',
    Version28 = 'Version28',
    Version29 = 'Version29',
    Version30 = 'Version30',
    Version31 = 'Version31',
    Version32 = 'Version32',
    Version33 = 'Version33',
    Version34 = 'Version34',
    Version35 = 'Version35',
    Version36 = 'Version36',
    Version37 = 'Version37',
    Version38 = 'Version38',
    Version39 = 'Version39',
    Version40 = 'Version40'
}
```

## QrParams

Optional QR barcode generation parameters. Applies to QR, GS1QR, MicroQR, and RectMicroQR barcode types.

```ts
interface QrParams {
    qrEncodeMode?: QREncodeMode;
    qrErrorLevel?: QRErrorLevel;
    qrVersion?: QRVersion;
    qrECIEncoding?: ECIEncodings;

    /**
     * QR barcode aspect ratio. Values: 0 to 1.
     */
    qrAspectRatio?: number;
    microQRVersion?: MicroQRVersion;
    rectMicroQrVersion?: RectMicroQRVersion;
}
```

## RecognitionImageKind

Kind of image to recognize

```ts
enum RecognitionImageKind {
    Photo = 'Photo',
    ScannedDocument = 'ScannedDocument',
    ClearImage = 'ClearImage'
}
```

## RecognitionMode

Recognition mode.

```ts
enum RecognitionMode {
    Fast = 'Fast',
    Normal = 'Normal',
    Excellent = 'Excellent'
}
```

## RecognizeBase64Request

Barcode recognition request.

```ts
interface RecognizeBase64Request {

    /**
     * Array of barcode decode types to find.
     */
    barcodeTypes: Array<DecodeBarcodeType>;

    /**
     * Barcode image bytes encoded as base-64.
     */
    fileBase64: string;
    recognitionMode?: RecognitionMode;
    recognitionImageKind?: RecognitionImageKind;
}
```

## RectMicroQRVersion

RectMicroQR barcode version. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/rectmicroqrversion/

```ts
enum RectMicroQRVersion {
    Auto = 'Auto',
    R7x43 = 'R7x43',
    R7x59 = 'R7x59',
    R7x77 = 'R7x77',
    R7x99 = 'R7x99',
    R7x139 = 'R7x139',
    R9x43 = 'R9x43',
    R9x59 = 'R9x59',
    R9x77 = 'R9x77',
    R9x99 = 'R9x99',
    R9x139 = 'R9x139',
    R11x27 = 'R11x27',
    R11x43 = 'R11x43',
    R11x59 = 'R11x59',
    R11x77 = 'R11x77',
    R11x99 = 'R11x99',
    R11x139 = 'R11x139',
    R13x27 = 'R13x27',
    R13x43 = 'R13x43',
    R13x59 = 'R13x59',
    R13x77 = 'R13x77',
    R13x99 = 'R13x99',
    R13x139 = 'R13x139',
    R15x43 = 'R15x43',
    R15x59 = 'R15x59',
    R15x77 = 'R15x77',
    R15x99 = 'R15x99',
    R15x139 = 'R15x139',
    R17x43 = 'R17x43',
    R17x59 = 'R17x59',
    R17x77 = 'R17x77',
    R17x99 = 'R17x99',
    R17x139 = 'R17x139'
}
```

## RegionPoint

Wrapper around Drawing.Point for proper specification.

```ts
interface RegionPoint {

    /**
     * X-coordinate
     */
    x?: number;

    /**
     * Y-coordinate
     */
    y?: number;
}
```

## ScanBase64Request

Scan barcode request.

```ts
interface ScanBase64Request {

    /**
     * Barcode image bytes encoded as base-64.
     */
    fileBase64: string;
}
```

