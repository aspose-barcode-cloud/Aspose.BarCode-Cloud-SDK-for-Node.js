/**
 * Api Error.
 */
export class ApiError {
    /**
     * Gets or sets api error code.
     */
    'code': string;
    /**
     * Gets or sets error message.
     */
    'message': string;
    /**
     * Gets or sets error description.
     */
    'description'?: string;
    /**
     * Gets or sets server datetime.
     */
    'dateTime'?: Date;
    'innerError'?: ApiError;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'code',
            baseName: 'code',
            type: 'string',
        },
        {
            name: 'message',
            baseName: 'message',
            type: 'string',
        },
        {
            name: 'description',
            baseName: 'description',
            type: 'string',
        },
        {
            name: 'dateTime',
            baseName: 'dateTime',
            type: 'Date',
        },
        {
            name: 'innerError',
            baseName: 'innerError',
            type: 'ApiError',
        },
    ];

    static getAttributeTypeMap() {
        return ApiError.attributeTypeMap;
    }
}

/**
 * ApiError Response
 */
export class ApiErrorResponse {
    /**
     * Gets or sets request Id.
     */
    'requestId': string;
    'error': ApiError;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'requestId',
            baseName: 'requestId',
            type: 'string',
        },
        {
            name: 'error',
            baseName: 'error',
            type: 'ApiError',
        },
    ];

    static getAttributeTypeMap() {
        return ApiErrorResponse.attributeTypeMap;
    }
}

/**
 * Specifies the file format of the image.
 */
export enum BarcodeImageFormat {
    Png = 'Png',
    Jpeg = 'Jpeg',
    Svg = 'Svg',
    Tiff = 'Tiff',
    Gif = 'Gif',
}

/**
 * Optional barcode image parameters.
 */
export class BarcodeImageParams {
    'imageFormat'?: BarcodeImageFormat;
    'textLocation'?: CodeLocation;
    /**
     * Specify the display color for bars and content. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: Black.
     */
    'foregroundColor'?: string;
    /**
     * Background color of the barcode image. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: White.
     */
    'backgroundColor'?: string;
    'units'?: GraphicsUnit;
    /**
     * Resolution of the barcode image. One value for both dimensions. Default value: 96 dpi. Decimal separator is a dot.
     */
    'resolution'?: number;
    /**
     * Height of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot.
     */
    'imageHeight'?: number;
    /**
     * Width of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot.
     */
    'imageWidth'?: number;
    /**
     * Barcode image rotation angle, measured in degrees. For example, RotationAngle = 0 or RotationAngle = 360 means no rotation. If RotationAngle is not equal to 90, 180, 270, or 0, it may increase the difficulty for the scanner to read the image. Default value: 0.
     */
    'rotationAngle'?: number;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'imageFormat',
            baseName: 'imageFormat',
            type: 'BarcodeImageFormat',
        },
        {
            name: 'textLocation',
            baseName: 'textLocation',
            type: 'CodeLocation',
        },
        {
            name: 'foregroundColor',
            baseName: 'foregroundColor',
            type: 'string',
        },
        {
            name: 'backgroundColor',
            baseName: 'backgroundColor',
            type: 'string',
        },
        {
            name: 'units',
            baseName: 'units',
            type: 'GraphicsUnit',
        },
        {
            name: 'resolution',
            baseName: 'resolution',
            type: 'number',
        },
        {
            name: 'imageHeight',
            baseName: 'imageHeight',
            type: 'number',
        },
        {
            name: 'imageWidth',
            baseName: 'imageWidth',
            type: 'number',
        },
        {
            name: 'rotationAngle',
            baseName: 'rotationAngle',
            type: 'number',
        },
    ];

    static getAttributeTypeMap() {
        return BarcodeImageParams.attributeTypeMap;
    }
}

/**
 * Represents information about a barcode.
 */
export class BarcodeResponse {
    /**
     * Barcode data.
     */
    'barcodeValue'?: string;
    /**
     * Type of the barcode.
     */
    'type'?: string;
    /**
     * Region with the barcode.
     */
    'region'?: Array<RegionPoint>;
    /**
     * Checksum of the barcode.
     */
    'checksum'?: string;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'barcodeValue',
            baseName: 'barcodeValue',
            type: 'string',
        },
        {
            name: 'type',
            baseName: 'type',
            type: 'string',
        },
        {
            name: 'region',
            baseName: 'region',
            type: 'Array<RegionPoint>',
        },
        {
            name: 'checksum',
            baseName: 'checksum',
            type: 'string',
        },
    ];

    static getAttributeTypeMap() {
        return BarcodeResponse.attributeTypeMap;
    }
}

/**
 * Represents information about a barcode list.
 */
export class BarcodeResponseList {
    /**
     * List of barcodes that are present in the image.
     */
    'barcodes': Array<BarcodeResponse>;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'barcodes',
            baseName: 'barcodes',
            type: 'Array<BarcodeResponse>',
        },
    ];

    static getAttributeTypeMap() {
        return BarcodeResponseList.attributeTypeMap;
    }
}

/**
 * Code128 barcode encode mode. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/code128encodemode/
 */
export enum Code128EncodeMode {
    Auto = 'Auto',
    CodeA = 'CodeA',
    CodeB = 'CodeB',
    CodeAb = 'CodeAB',
    CodeC = 'CodeC',
    CodeAc = 'CodeAC',
    CodeBc = 'CodeBC',
}

/**
 * Optional Code128 barcode generation parameters.
 */
export class Code128Params {
    'code128EncodeMode'?: Code128EncodeMode;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'code128EncodeMode',
            baseName: 'code128EncodeMode',
            type: 'Code128EncodeMode',
        },
    ];

    static getAttributeTypeMap() {
        return Code128Params.attributeTypeMap;
    }
}
export enum CodeLocation {
    Below = 'Below',
    Above = 'Above',
    None = 'None',
}

/**
 * See https://reference.aspose.com/barcode/net/aspose.barcode.barcoderecognition/decodetype/
 */
export enum DecodeBarcodeType {
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
    Vin = 'VIN',
}

/**
 * ECI encoding identifiers. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/eciencodings/
 */
export enum ECIEncodings {
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
    Binary = 'BINARY',
}

/**
 * See https://reference.aspose.com/barcode/net/aspose.barcode.generation/encodetypes/
 */
export enum EncodeBarcodeType {
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
    Vin = 'VIN',
}

/**
 * Data to encode in a barcode.
 */
export class EncodeData {
    'dataType'?: EncodeDataType;
    /**
     * String that represents the data to encode.
     */
    'data': string;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'dataType',
            baseName: 'dataType',
            type: 'EncodeDataType',
        },
        {
            name: 'data',
            baseName: 'data',
            type: 'string',
        },
    ];

    static getAttributeTypeMap() {
        return EncodeData.attributeTypeMap;
    }
}

/**
 * Types of data that can be encoded into a barcode.
 */
export enum EncodeDataType {
    StringData = 'StringData',
    Base64Bytes = 'Base64Bytes',
    HexBytes = 'HexBytes',
}

/**
 * Barcode generation parameters.
 */
export class GenerateParams {
    'barcodeType': EncodeBarcodeType;
    'encodeData': EncodeData;
    'barcodeImageParams'?: BarcodeImageParams;
    'qrParams'?: QrParams;
    'code128Params'?: Code128Params;
    'pdf417Params'?: Pdf417Params;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'barcodeType',
            baseName: 'barcodeType',
            type: 'EncodeBarcodeType',
        },
        {
            name: 'encodeData',
            baseName: 'encodeData',
            type: 'EncodeData',
        },
        {
            name: 'barcodeImageParams',
            baseName: 'barcodeImageParams',
            type: 'BarcodeImageParams',
        },
        {
            name: 'qrParams',
            baseName: 'qrParams',
            type: 'QrParams',
        },
        {
            name: 'code128Params',
            baseName: 'code128Params',
            type: 'Code128Params',
        },
        {
            name: 'pdf417Params',
            baseName: 'pdf417Params',
            type: 'Pdf417Params',
        },
    ];

    static getAttributeTypeMap() {
        return GenerateParams.attributeTypeMap;
    }
}

/**
 * Subset of https://reference.aspose.com/drawing/net/system.drawing/graphicsunit/
 */
export enum GraphicsUnit {
    Pixel = 'Pixel',
    Point = 'Point',
    Inch = 'Inch',
    Millimeter = 'Millimeter',
}

/**
 * PDF417 macro character mode. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/macrocharacter/
 */
export enum MacroCharacter {
    None = 'None',
    Macro05 = 'Macro05',
    Macro06 = 'Macro06',
}

/**
 * MicroQR barcode version. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/microqrversion/
 */
export enum MicroQRVersion {
    Auto = 'Auto',
    M1 = 'M1',
    M2 = 'M2',
    M3 = 'M3',
    M4 = 'M4',
}

/**
 * PDF417 barcode encode mode. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/pdf417encodemode/
 */
export enum Pdf417EncodeMode {
    Auto = 'Auto',
    Binary = 'Binary',
    Eci = 'ECI',
    Extended = 'Extended',
}

/**
 * PDF417 barcode error correction level. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/pdf417errorlevel/
 */
export enum Pdf417ErrorLevel {
    Level0 = 'Level0',
    Level1 = 'Level1',
    Level2 = 'Level2',
    Level3 = 'Level3',
    Level4 = 'Level4',
    Level5 = 'Level5',
    Level6 = 'Level6',
    Level7 = 'Level7',
    Level8 = 'Level8',
}

/**
 * Optional PDF417 barcode generation parameters. Applies to Pdf417, MacroPdf417, MicroPdf417, and GS1MicroPdf417 barcode types.
 */
export class Pdf417Params {
    'pdf417EncodeMode'?: Pdf417EncodeMode;
    'pdf417ErrorLevel'?: Pdf417ErrorLevel;
    /**
     * Whether to use truncated PDF417 format (removes right-side stop pattern).
     */
    'pdf417Truncate'?: boolean;
    /**
     * Number of columns in the PDF417 barcode. Values between 1 and 30. 0 for auto.
     */
    'pdf417Columns'?: number;
    /**
     * Number of rows in the PDF417 barcode. Values between 3 and 90. 0 for automatic.
     */
    'pdf417Rows'?: number;
    /**
     * PDF417 barcode aspect ratio (height/width of the barcode module). Values are defined by the standard: 2 to 5 for MicroPdf417; 3 to 5 for Pdf417 and MacroPdf417.
     */
    'pdf417AspectRatio'?: number;
    'pdf417ECIEncoding'?: ECIEncodings;
    /**
     * Whether the barcode is used for reader initialization (programming).
     */
    'pdf417IsReaderInitialization'?: boolean;
    'pdf417MacroCharacters'?: MacroCharacter;
    /**
     * Whether to use linked mode (for MicroPdf417).
     */
    'pdf417IsLinked'?: boolean;
    /**
     * Whether to use Code128 emulation for MicroPdf417.
     */
    'pdf417IsCode128Emulation'?: boolean;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'pdf417EncodeMode',
            baseName: 'pdf417EncodeMode',
            type: 'Pdf417EncodeMode',
        },
        {
            name: 'pdf417ErrorLevel',
            baseName: 'pdf417ErrorLevel',
            type: 'Pdf417ErrorLevel',
        },
        {
            name: 'pdf417Truncate',
            baseName: 'pdf417Truncate',
            type: 'boolean',
        },
        {
            name: 'pdf417Columns',
            baseName: 'pdf417Columns',
            type: 'number',
        },
        {
            name: 'pdf417Rows',
            baseName: 'pdf417Rows',
            type: 'number',
        },
        {
            name: 'pdf417AspectRatio',
            baseName: 'pdf417AspectRatio',
            type: 'number',
        },
        {
            name: 'pdf417ECIEncoding',
            baseName: 'pdf417ECIEncoding',
            type: 'ECIEncodings',
        },
        {
            name: 'pdf417IsReaderInitialization',
            baseName: 'pdf417IsReaderInitialization',
            type: 'boolean',
        },
        {
            name: 'pdf417MacroCharacters',
            baseName: 'pdf417MacroCharacters',
            type: 'MacroCharacter',
        },
        {
            name: 'pdf417IsLinked',
            baseName: 'pdf417IsLinked',
            type: 'boolean',
        },
        {
            name: 'pdf417IsCode128Emulation',
            baseName: 'pdf417IsCode128Emulation',
            type: 'boolean',
        },
    ];

    static getAttributeTypeMap() {
        return Pdf417Params.attributeTypeMap;
    }
}

/**
 * QR barcode encode mode. Subset of https://reference.aspose.com/barcode/net/aspose.barcode.generation/qrencodemode/ Obsolete members (Bytes, Utf8BOM, Utf16BEBOM, ECIEncoding, ExtendedCodetext) are omitted.
 */
export enum QREncodeMode {
    Auto = 'Auto',
    Extended = 'Extended',
    Binary = 'Binary',
    Eci = 'ECI',
}

/**
 * QR barcode error correction level. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/qrerrorlevel/
 */
export enum QRErrorLevel {
    LevelL = 'LevelL',
    LevelM = 'LevelM',
    LevelQ = 'LevelQ',
    LevelH = 'LevelH',
}

/**
 * QR barcode version. Subset of https://reference.aspose.com/barcode/net/aspose.barcode.generation/qrversion/ MicroQR versions (VersionM1–VersionM4) are omitted; use Aspose.BarCode.Cloud.DTO.Enums.MicroQRVersion instead.
 */
export enum QRVersion {
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
    Version40 = 'Version40',
}

/**
 * Optional QR barcode generation parameters. Applies to QR, GS1QR, MicroQR, and RectMicroQR barcode types.
 */
export class QrParams {
    'qrEncodeMode'?: QREncodeMode;
    'qrErrorLevel'?: QRErrorLevel;
    'qrVersion'?: QRVersion;
    'qrECIEncoding'?: ECIEncodings;
    /**
     * QR barcode aspect ratio. Values: 0 to 1.
     */
    'qrAspectRatio'?: number;
    'microQRVersion'?: MicroQRVersion;
    'rectMicroQrVersion'?: RectMicroQRVersion;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'qrEncodeMode',
            baseName: 'qrEncodeMode',
            type: 'QREncodeMode',
        },
        {
            name: 'qrErrorLevel',
            baseName: 'qrErrorLevel',
            type: 'QRErrorLevel',
        },
        {
            name: 'qrVersion',
            baseName: 'qrVersion',
            type: 'QRVersion',
        },
        {
            name: 'qrECIEncoding',
            baseName: 'qrECIEncoding',
            type: 'ECIEncodings',
        },
        {
            name: 'qrAspectRatio',
            baseName: 'qrAspectRatio',
            type: 'number',
        },
        {
            name: 'microQRVersion',
            baseName: 'microQRVersion',
            type: 'MicroQRVersion',
        },
        {
            name: 'rectMicroQrVersion',
            baseName: 'rectMicroQrVersion',
            type: 'RectMicroQRVersion',
        },
    ];

    static getAttributeTypeMap() {
        return QrParams.attributeTypeMap;
    }
}

/**
 * Kind of image to recognize
 */
export enum RecognitionImageKind {
    Photo = 'Photo',
    ScannedDocument = 'ScannedDocument',
    ClearImage = 'ClearImage',
}

/**
 * Recognition mode.
 */
export enum RecognitionMode {
    Fast = 'Fast',
    Normal = 'Normal',
    Excellent = 'Excellent',
}

/**
 * Barcode recognition request.
 */
export class RecognizeBase64Request {
    /**
     * Array of barcode decode types to find.
     */
    'barcodeTypes': Array<DecodeBarcodeType>;
    /**
     * Barcode image bytes encoded as base-64.
     */
    'fileBase64': string;
    'recognitionMode'?: RecognitionMode;
    'recognitionImageKind'?: RecognitionImageKind;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'barcodeTypes',
            baseName: 'barcodeTypes',
            type: 'Array<DecodeBarcodeType>',
        },
        {
            name: 'fileBase64',
            baseName: 'fileBase64',
            type: 'string',
        },
        {
            name: 'recognitionMode',
            baseName: 'recognitionMode',
            type: 'RecognitionMode',
        },
        {
            name: 'recognitionImageKind',
            baseName: 'recognitionImageKind',
            type: 'RecognitionImageKind',
        },
    ];

    static getAttributeTypeMap() {
        return RecognizeBase64Request.attributeTypeMap;
    }
}

/**
 * RectMicroQR barcode version. Mirrors https://reference.aspose.com/barcode/net/aspose.barcode.generation/rectmicroqrversion/
 */
export enum RectMicroQRVersion {
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
    R17x139 = 'R17x139',
}

/**
 * Wrapper around Drawing.Point for proper specification.
 */
export class RegionPoint {
    /**
     * X-coordinate
     */
    'x'?: number;
    /**
     * Y-coordinate
     */
    'y'?: number;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'x',
            baseName: 'x',
            type: 'number',
        },
        {
            name: 'y',
            baseName: 'y',
            type: 'number',
        },
    ];

    static getAttributeTypeMap() {
        return RegionPoint.attributeTypeMap;
    }
}

/**
 * Scan barcode request.
 */
export class ScanBase64Request {
    /**
     * Barcode image bytes encoded as base-64.
     */
    'fileBase64': string;

    static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
        {
            name: 'fileBase64',
            baseName: 'fileBase64',
            type: 'string',
        },
    ];

    static getAttributeTypeMap() {
        return ScanBase64Request.attributeTypeMap;
    }
}

// GenerateApi

/**
 * Generate a barcode using a GET request with parameters in the route and query string.
 */
export class GenerateRequestWrapper {
    /**
     * Type of barcode to generate.
     */
    'barcodeType': EncodeBarcodeType;
    /**
     * String that represents the data to encode.
     */
    'data': string;
    /**
     * Type of data to encode.
Default value: StringData.
     */
    'dataType'?: EncodeDataType;
    /**
     * Barcode output image format.
Default value: png.
     */
    'imageFormat'?: BarcodeImageFormat;
    /**
     * Specify the displayed text location. Set to CodeLocation.None to hide CodeText.
Default value depends on BarcodeType: CodeLocation.Below for 1D barcodes and CodeLocation.None for 2D barcodes.
     */
    'textLocation'?: CodeLocation;
    /**
     * Specify the display color for bars and content.
Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #.
For example: AliceBlue or #FF000000.
Default value: Black.
     */
    'foregroundColor'?: string = "'Black'";
    /**
     * Background color of the barcode image.
Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #.
For example: AliceBlue or #FF000000.
Default value: White.
     */
    'backgroundColor'?: string = "'White'";
    /**
     * Common units for all measurements. Default units: pixels.
     */
    'units'?: GraphicsUnit;
    /**
     * Resolution of the barcode image.
One value for both dimensions.
Default value: 96 dpi.
Decimal separator is a dot.
     */
    'resolution'?: number;
    /**
     * Height of the barcode image in the specified units. Default units: pixels.
Decimal separator is a dot.
     */
    'imageHeight'?: number;
    /**
     * Width of the barcode image in the specified units. Default units: pixels.
Decimal separator is a dot.
     */
    'imageWidth'?: number;
    /**
     * Barcode image rotation angle, measured in degrees. For example, RotationAngle = 0 or RotationAngle = 360 means no rotation.
If RotationAngle is not equal to 90, 180, 270, or 0, it may increase the difficulty for the scanner to read the image.
Default value: 0.
     */
    'rotationAngle'?: number;
    /**
     * QR barcode encode mode.
     */
    'qrEncodeMode'?: QREncodeMode;
    /**
     * QR barcode error correction level.
     */
    'qrErrorLevel'?: QRErrorLevel;
    /**
     * QR barcode version. Automatically selects the smallest version that fits the data.
     */
    'qrVersion'?: QRVersion;
    /**
     * ECI encoding for QR barcode data.
     */
    'qrECIEncoding'?: ECIEncodings;
    /**
     * QR barcode aspect ratio. Values: 0 to 1.
     */
    'qrAspectRatio'?: number;
    /**
     * MicroQR barcode version. Used when BarcodeType is MicroQR.
     */
    'microQRVersion'?: MicroQRVersion;
    /**
     * RectMicroQR barcode version. Used when BarcodeType is RectMicroQR.
     */
    'rectMicroQrVersion'?: RectMicroQRVersion;
    /**
     * Code128 barcode encode mode. Controls which Code 128 subset (A, B, C, or mix) is used.
     */
    'code128EncodeMode'?: Code128EncodeMode;
    /**
     * PDF417 barcode encode mode.
     */
    'pdf417EncodeMode'?: Pdf417EncodeMode;
    /**
     * PDF417 barcode error correction level.
     */
    'pdf417ErrorLevel'?: Pdf417ErrorLevel;
    /**
     * Whether to use truncated PDF417 format (removes right-side stop pattern).
     */
    'pdf417Truncate'?: boolean;
    /**
     * Number of columns in the PDF417 barcode. Values between 1 and 30. 0 for auto.
     */
    'pdf417Columns'?: number;
    /**
     * Number of rows in the PDF417 barcode. Values between 3 and 90. 0 for automatic.
     */
    'pdf417Rows'?: number;
    /**
     * PDF417 barcode aspect ratio (height/width of the barcode module). Values are defined by the standard: 2 to 5 for MicroPdf417; 3 to 5 for Pdf417 and MacroPdf417.
     */
    'pdf417AspectRatio'?: number;
    /**
     * ECI encoding for PDF417 barcode data.
     */
    'pdf417ECIEncoding'?: ECIEncodings;
    /**
     * Whether the barcode is used for reader initialization (programming).
     */
    'pdf417IsReaderInitialization'?: boolean;
    /**
     * Macro character to prepend (structured append).
     */
    'pdf417MacroCharacters'?: MacroCharacter;
    /**
     * Whether to use linked mode (for MicroPdf417).
     */
    'pdf417IsLinked'?: boolean;
    /**
     * Whether to use Code128 emulation for MicroPdf417.
     */
    'pdf417IsCode128Emulation'?: boolean;

    /**
     * @param barcodeType Type of barcode to generate.
     * @param data String that represents the data to encode.
     */
    constructor(barcodeType: EncodeBarcodeType, data: string) {
        this.barcodeType = barcodeType;
        this.data = data;
    }
}

/**
 * Generate a barcode using a POST request with parameters in the request body in JSON or XML format.
 */
export class GenerateBodyRequestWrapper {
    /**
     *
     */
    'generateParams': GenerateParams;

    /**
     * @param generateParams
     */
    constructor(generateParams: GenerateParams) {
        this.generateParams = generateParams;
    }
}

/**
 * Generate a barcode using a POST request with parameters in a multipart form.
 */
export class GenerateMultipartRequestWrapper {
    /**
     *
     */
    'barcodeType': EncodeBarcodeType;
    /**
     * String that represents the data to encode.
     */
    'data': string;
    /**
     *
     */
    'dataType'?: EncodeDataType;
    /**
     *
     */
    'imageFormat'?: BarcodeImageFormat;
    /**
     *
     */
    'textLocation'?: CodeLocation;
    /**
     * Specify the display color for bars and content. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: Black.
     */
    'foregroundColor'?: string = "'Black'";
    /**
     * Background color of the barcode image. Value: Color name from https://reference.aspose.com/drawing/net/system.drawing/color/ or ARGB value starting with #. For example: AliceBlue or #FF000000. Default value: White.
     */
    'backgroundColor'?: string = "'White'";
    /**
     *
     */
    'units'?: GraphicsUnit;
    /**
     * Resolution of the barcode image. One value for both dimensions. Default value: 96 dpi. Decimal separator is a dot.
     */
    'resolution'?: number;
    /**
     * Height of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot.
     */
    'imageHeight'?: number;
    /**
     * Width of the barcode image in the specified units. Default units: pixels. Decimal separator is a dot.
     */
    'imageWidth'?: number;
    /**
     * Barcode image rotation angle, measured in degrees. For example, RotationAngle = 0 or RotationAngle = 360 means no rotation. If RotationAngle is not equal to 90, 180, 270, or 0, it may increase the difficulty for the scanner to read the image. Default value: 0.
     */
    'rotationAngle'?: number;
    /**
     *
     */
    'qrEncodeMode'?: QREncodeMode;
    /**
     *
     */
    'qrErrorLevel'?: QRErrorLevel;
    /**
     *
     */
    'qrVersion'?: QRVersion;
    /**
     *
     */
    'qrECIEncoding'?: ECIEncodings;
    /**
     * QR barcode aspect ratio. Values: 0 to 1.
     */
    'qrAspectRatio'?: number;
    /**
     *
     */
    'microQRVersion'?: MicroQRVersion;
    /**
     *
     */
    'rectMicroQrVersion'?: RectMicroQRVersion;
    /**
     *
     */
    'code128EncodeMode'?: Code128EncodeMode;
    /**
     *
     */
    'pdf417EncodeMode'?: Pdf417EncodeMode;
    /**
     *
     */
    'pdf417ErrorLevel'?: Pdf417ErrorLevel;
    /**
     * Whether to use truncated PDF417 format (removes right-side stop pattern).
     */
    'pdf417Truncate'?: boolean;
    /**
     * Number of columns in the PDF417 barcode. Values between 1 and 30. 0 for auto.
     */
    'pdf417Columns'?: number;
    /**
     * Number of rows in the PDF417 barcode. Values between 3 and 90. 0 for automatic.
     */
    'pdf417Rows'?: number;
    /**
     * PDF417 barcode aspect ratio (height/width of the barcode module). Values are defined by the standard: 2 to 5 for MicroPdf417; 3 to 5 for Pdf417 and MacroPdf417.
     */
    'pdf417AspectRatio'?: number;
    /**
     *
     */
    'pdf417ECIEncoding'?: ECIEncodings;
    /**
     * Whether the barcode is used for reader initialization (programming).
     */
    'pdf417IsReaderInitialization'?: boolean;
    /**
     *
     */
    'pdf417MacroCharacters'?: MacroCharacter;
    /**
     * Whether to use linked mode (for MicroPdf417).
     */
    'pdf417IsLinked'?: boolean;
    /**
     * Whether to use Code128 emulation for MicroPdf417.
     */
    'pdf417IsCode128Emulation'?: boolean;

    /**
     * @param barcodeType
     * @param data String that represents the data to encode.
     */
    constructor(barcodeType: EncodeBarcodeType, data: string) {
        this.barcodeType = barcodeType;
        this.data = data;
    }
}

// RecognizeApi

/**
 * Recognize a barcode from a file on an Internet server using a GET request with a query string parameter. For recognizing files from your hard drive, use `recognize-body` or `recognize-multipart` endpoints instead.
 */
export class RecognizeRequestWrapper {
    /**
     * Type of barcode to recognize.
     */
    'barcodeType': DecodeBarcodeType;
    /**
     * URL to the barcode image.
     */
    'fileUrl': string;
    /**
     * Recognition mode.
     */
    'recognitionMode'?: RecognitionMode;
    /**
     * Image kind for recognition.
     */
    'recognitionImageKind'?: RecognitionImageKind;

    /**
     * @param barcodeType Type of barcode to recognize.
     * @param fileUrl URL to the barcode image.
     */
    constructor(barcodeType: DecodeBarcodeType, fileUrl: string) {
        this.barcodeType = barcodeType;
        this.fileUrl = fileUrl;
    }
}

/**
 * Recognize a barcode from a file in the request body using a POST request with JSON or XML body parameters.
 */
export class RecognizeBase64RequestWrapper {
    /**
     *
     */
    'recognizeBase64Request': RecognizeBase64Request;

    /**
     * @param recognizeBase64Request
     */
    constructor(recognizeBase64Request: RecognizeBase64Request) {
        this.recognizeBase64Request = recognizeBase64Request;
    }
}

/**
 * Recognize a barcode from a file in the request body using a POST request with multipart form parameters.
 */
export class RecognizeMultipartRequestWrapper {
    /**
     *
     */
    'barcodeType': DecodeBarcodeType;
    /**
     * Barcode image file.
     */
    'fileBytes': Buffer;
    /**
     *
     */
    'recognitionMode'?: RecognitionMode;
    /**
     *
     */
    'recognitionImageKind'?: RecognitionImageKind;

    /**
     * @param barcodeType
     * @param fileBytes Barcode image file.
     */
    constructor(barcodeType: DecodeBarcodeType, fileBytes: Buffer) {
        this.barcodeType = barcodeType;
        this.fileBytes = fileBytes;
    }
}

// ScanApi

/**
 * Scan a barcode from a file on an Internet server using a GET request with a query string parameter. For scanning files from your hard drive, use `scan-body` or `scan-multipart` endpoints instead.
 */
export class ScanRequestWrapper {
    /**
     * URL to the barcode image.
     */
    'fileUrl': string;

    /**
     * @param fileUrl URL to the barcode image.
     */
    constructor(fileUrl: string) {
        this.fileUrl = fileUrl;
    }
}

/**
 * Scan a barcode from a file in the request body using a POST request with a JSON or XML body parameter.
 */
export class ScanBase64RequestWrapper {
    /**
     *
     */
    'scanBase64Request': ScanBase64Request;

    /**
     * @param scanBase64Request
     */
    constructor(scanBase64Request: ScanBase64Request) {
        this.scanBase64Request = scanBase64Request;
    }
}

/**
 * Scan a barcode from a file in the request body using a POST request with a multipart form parameter.
 */
export class ScanMultipartRequestWrapper {
    /**
     * Barcode image file.
     */
    'fileBytes': Buffer;

    /**
     * @param fileBytes Barcode image file.
     */
    constructor(fileBytes: Buffer) {
        this.fileBytes = fileBytes;
    }
}
