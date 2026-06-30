import { Configuration } from './Configuration';
import { Multipart, RequestFile, FormParamPairs } from './multipart';

export * from './models';

import {
    ApiError,
    ApiErrorResponse,
    BarcodeImageFormat,
    BarcodeImageParams,
    BarcodeResponse,
    BarcodeResponseList,
    Code128EncodeMode,
    Code128Params,
    CodeLocation,
    DecodeBarcodeType,
    ECIEncodings,
    EncodeBarcodeType,
    EncodeData,
    EncodeDataType,
    GenerateParams,
    GraphicsUnit,
    MacroCharacter,
    MicroQRVersion,
    Pdf417EncodeMode,
    Pdf417ErrorLevel,
    Pdf417Params,
    QREncodeMode,
    QRErrorLevel,
    QRVersion,
    QrParams,
    RecognitionImageKind,
    RecognitionMode,
    RecognizeBase64Request,
    RectMicroQRVersion,
    RegionPoint,
    ScanBase64Request,
} from './models';

import {
    GenerateRequestWrapper,
    GenerateBodyRequestWrapper,
    GenerateMultipartRequestWrapper,
    RecognizeRequestWrapper,
    RecognizeBase64RequestWrapper,
    RecognizeMultipartRequestWrapper,
    ScanRequestWrapper,
    ScanBase64RequestWrapper,
    ScanMultipartRequestWrapper,
} from './models';

type StringMap = Record<string, string>;

type ApiRequestOptions = {
    uri: string;
    body?: any;
    encoding?: BufferEncoding | null;
    form?: StringMap;
    headers?: StringMap;
    json?: boolean;
    method?: string;
    qs?: StringMap;
};

type ApiResponse = {
    statusCode: number;
    statusMessage: string;
    headers: NodeJS.Dict<string | string[]>;
    body: any;
};

type ApiResult<T = any> = {
    response: ApiResponse;
    body: T;
};

type ApiRejectType = {
    response: ApiResponse | null;
    errorResponse: ApiErrorResponse | null;
    error: Error;
};

export class ApiClient {
    private readonly _fetcher: typeof fetch;

    constructor() {
        const resolvedFetch = (globalThis as { fetch?: typeof fetch }).fetch;
        if (!resolvedFetch) {
            throw new Error('Global fetch API is not available. Please use Node.js 18+.');
        }

        this._fetcher = resolvedFetch;
    }

    public requestAsync(options: ApiRequestOptions): Promise<ApiResult> {
        const url: URL = options.qs
            ? new URL(`?${new URLSearchParams(options.qs).toString()}`, options.uri)
            : new URL(options.uri);

        const requestBody = this.buildRequestBody(options);

        const responseEncoding: BufferEncoding | null = options.encoding === null ? null : options.encoding || 'utf-8';

        const requestOptions: RequestInit = {
            method: options.method || 'GET',
            headers: options.headers,
        };

        if (requestBody) {
            requestOptions.body = requestBody;
        }

        return this.doFetchRequest(url, requestOptions, responseEncoding);
    }

    private buildRequestBody(options: ApiRequestOptions) {
        let requestBody = options.body;
        if (options.form) {
            // Override requestBody for form with form content
            requestBody = new URLSearchParams(options.form).toString();
            options.headers = Object.assign(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                options.headers
            );
        }
        if (options.json) {
            // Override requestBody with JSON value
            requestBody = JSON.stringify(options.body);
            options.headers = Object.assign(
                {
                    'Content-Type': 'application/json',
                },
                options.headers
            );
        }
        return requestBody;
    }

    private async doFetchRequest(
        url: URL,
        requestOptions: RequestInit,
        responseEncoding: BufferEncoding | null
    ): Promise<ApiResult> {
        let response: Response;
        try {
            response = await this._fetcher(url.toString(), requestOptions);
        } catch (error) {
            return Promise.reject({
                response: null,
                error: this.normalizeFetchError(error),
                errorResponse: null,
            });
        }

        const respBody = await this.readResponseBody(response, responseEncoding);
        const responseHeaders = this.toHeaderDict(response.headers);

        const httpResponse: ApiResponse = {
            statusCode: response.status,
            statusMessage: response.statusText,
            headers: responseHeaders,
            body: respBody,
        };

        if (response.ok) {
            return {
                response: httpResponse,
                body: respBody,
            };
        }

        const rejectObject: ApiRejectType = {
            response: httpResponse,
            error: new Error(`Error on '${url}': ${response.status} ${response.statusText}`),
            errorResponse: null,
        };
        let errorResponse = null;
        try {
            errorResponse = JSON.parse(respBody.toString()) as ApiErrorResponse;
        } catch (parseError) {}

        if (errorResponse) {
            rejectObject.errorResponse = errorResponse;
        } else {
            rejectObject.error.message += `. ${respBody}`;
        }

        return Promise.reject(rejectObject);
    }

    private async readResponseBody(
        response: Response,
        responseEncoding: BufferEncoding | null
    ): Promise<string | Buffer> {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (responseEncoding === null) {
            return buffer;
        }

        return buffer.toString(responseEncoding);
    }

    private toHeaderDict(headers: Headers): NodeJS.Dict<string | string[]> {
        const normalizedHeaders: NodeJS.Dict<string | string[]> = {};

        headers.forEach((value, key) => {
            const existing = normalizedHeaders[key];
            if (existing === undefined) {
                normalizedHeaders[key] = value;
                return;
            }

            if (Array.isArray(existing)) {
                existing.push(value);
                normalizedHeaders[key] = existing;
                return;
            }

            normalizedHeaders[key] = [existing, value];
        });

        return normalizedHeaders;
    }

    private normalizeFetchError(error: unknown): Error {
        if (error instanceof Error) {
            const mutableError = error as Error & { code?: string; cause?: unknown; name: string };
            let normalizedCode = mutableError.code;

            if (!normalizedCode) {
                const cause = mutableError.cause;
                if (cause && typeof cause === 'object' && 'code' in (cause as { code?: string })) {
                    const code = (cause as { code?: string }).code;
                    if (code) {
                        normalizedCode = String(code);
                    }
                }
            }

            if (!normalizedCode) {
                normalizedCode = mutableError.name || 'FETCH_ERROR';
            }

            try {
                if (!mutableError.code) {
                    mutableError.code = normalizedCode;
                }
            } catch (assignError) {}

            if (mutableError.code) {
                return mutableError;
            }

            const wrapped = new Error(mutableError.message);
            wrapped.name = mutableError.name;
            (wrapped as { code?: string }).code = normalizedCode;
            return wrapped;
        }

        const wrapped = new Error(String(error));
        (wrapped as { code?: string }).code = 'FETCH_ERROR';
        return wrapped;
    }
}

let primitives = ['string', 'boolean', 'double', 'integer', 'long', 'float', 'number', 'any'];

class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == null) {
            return expectedType;
        }

        if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }

        if (expectedType === 'Date') {
            return expectedType;
        }

        if (enumsMap[expectedType]) {
            return expectedType;
        }

        if (!typeMap[expectedType]) {
            return expectedType; // w/e we don't know the type
        }

        // Check the discriminator
        let discriminatorProperty = typeMap[expectedType].discriminator;
        if (discriminatorProperty == null) {
            return expectedType; // the type does not have a discriminator. use it.
        }

        if (data[discriminatorProperty]) {
            return data[discriminatorProperty]; // use the type given in the discriminator
        }

        return expectedType; // discriminator was not present (or an empty string)
    }

    public static serialize(data: any, type: string) {
        if (data == null) {
            return data;
        }

        if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }

        if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }

            return transformedData;
        }

        if (type === 'Date') {
            return data.toString();
        }

        if (enumsMap[type] && Object.values(enumsMap[type]).includes(data)) {
            return data;
        }

        if (!typeMap[type]) {
            // in case we don't know the type
            return data;
        }

        // get the map for the correct type.
        let attributeTypes = typeMap[type].getAttributeTypeMap();
        let instance: { [index: string]: any } = {};
        for (let index in attributeTypes) {
            let attributeType = attributeTypes[index];
            instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
        }

        return instance;
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);

        if (data == null) {
            return data;
        }

        if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }

        if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        }

        if (type === 'Date') {
            return new Date(data);
        }

        if (enumsMap[type]) {
            // is Enum
            return data;
        }

        if (!typeMap[type]) {
            // don't know the type
            return data;
        }

        if (typeof data === 'string') {
            // data should be deserialized before usage
            data = JSON.parse(data);
        }

        let instance = new typeMap[type]();
        let attributeTypes = typeMap[type].getAttributeTypeMap();
        for (const attributeType of attributeTypes) {
            const key = attributeType.baseName.replace(/^(.)/, ($1: string) => {
                return $1.toLowerCase();
            });
            instance[attributeType.name] = ObjectSerializer.deserialize(data[key], attributeType.type);
        }

        return instance;
    }
}

let enumsMap: { [index: string]: any } = {
    BarcodeImageFormat: BarcodeImageFormat,
    Code128EncodeMode: Code128EncodeMode,
    CodeLocation: CodeLocation,
    DecodeBarcodeType: DecodeBarcodeType,
    ECIEncodings: ECIEncodings,
    EncodeBarcodeType: EncodeBarcodeType,
    EncodeDataType: EncodeDataType,
    GraphicsUnit: GraphicsUnit,
    MacroCharacter: MacroCharacter,
    MicroQRVersion: MicroQRVersion,
    Pdf417EncodeMode: Pdf417EncodeMode,
    Pdf417ErrorLevel: Pdf417ErrorLevel,
    QREncodeMode: QREncodeMode,
    QRErrorLevel: QRErrorLevel,
    QRVersion: QRVersion,
    RecognitionImageKind: RecognitionImageKind,
    RecognitionMode: RecognitionMode,
    RectMicroQRVersion: RectMicroQRVersion,
};

let typeMap: { [index: string]: any } = {
    ApiError: ApiError,
    ApiErrorResponse: ApiErrorResponse,
    BarcodeImageParams: BarcodeImageParams,
    BarcodeResponse: BarcodeResponse,
    BarcodeResponseList: BarcodeResponseList,
    Code128Params: Code128Params,
    EncodeData: EncodeData,
    GenerateParams: GenerateParams,
    Pdf417Params: Pdf417Params,
    QrParams: QrParams,
    RecognizeBase64Request: RecognizeBase64Request,
    RegionPoint: RegionPoint,
    ScanBase64Request: ScanBase64Request,
};

export class GenerateApi {
    protected defaultHeaders: any = {
        'x-aspose-client': 'nodejs sdk',
        'x-aspose-client-version': '26.6.0',
    };
    protected _configuration: Configuration;
    private _client: ApiClient;

    constructor(configuration: Configuration) {
        this._configuration = configuration;
        this._client = new ApiClient();
    }

    /**
     * Generate a barcode using a GET request with parameters in the route and query string.
     * @param request GenerateRequestWrapper
     */
    public async generate(request: GenerateRequestWrapper): Promise<{ response: ApiResponse; body: Buffer }> {
        const requestPath =
            this._configuration.getApiBaseUrl() +
            '/barcode/generate/{barcodeType}'.replace('{' + 'barcodeType' + '}', String(request.barcodeType));
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);

        // verify required parameter 'request.barcodeType' is not null or undefined
        if (request.barcodeType == null) {
            throw new Error('Required parameter request.barcodeType was null or undefined when calling generate.');
        }

        // verify required parameter 'request.data' is not null or undefined
        if (request.data == null) {
            throw new Error('Required parameter request.data was null or undefined when calling generate.');
        }

        if (request.dataType != null) {
            queryParameters['dataType'] = ObjectSerializer.serialize(request.dataType, 'EncodeDataType');
        }

        if (request.data != null) {
            queryParameters['data'] = ObjectSerializer.serialize(request.data, 'string');
        }

        if (request.barcodeImageParams?.imageFormat != null) {
            queryParameters['imageFormat'] = ObjectSerializer.serialize(
                request.barcodeImageParams.imageFormat,
                'BarcodeImageFormat'
            );
        }

        if (request.barcodeImageParams?.textLocation != null) {
            queryParameters['textLocation'] = ObjectSerializer.serialize(
                request.barcodeImageParams.textLocation,
                'CodeLocation'
            );
        }

        if (request.barcodeImageParams?.foregroundColor != null) {
            queryParameters['foregroundColor'] = ObjectSerializer.serialize(
                request.barcodeImageParams.foregroundColor,
                'string'
            );
        }

        if (request.barcodeImageParams?.backgroundColor != null) {
            queryParameters['backgroundColor'] = ObjectSerializer.serialize(
                request.barcodeImageParams.backgroundColor,
                'string'
            );
        }

        if (request.barcodeImageParams?.units != null) {
            queryParameters['units'] = ObjectSerializer.serialize(request.barcodeImageParams.units, 'GraphicsUnit');
        }

        if (request.barcodeImageParams?.resolution != null) {
            queryParameters['resolution'] = ObjectSerializer.serialize(request.barcodeImageParams.resolution, 'number');
        }

        if (request.barcodeImageParams?.imageHeight != null) {
            queryParameters['imageHeight'] = ObjectSerializer.serialize(
                request.barcodeImageParams.imageHeight,
                'number'
            );
        }

        if (request.barcodeImageParams?.imageWidth != null) {
            queryParameters['imageWidth'] = ObjectSerializer.serialize(request.barcodeImageParams.imageWidth, 'number');
        }

        if (request.barcodeImageParams?.rotationAngle != null) {
            queryParameters['rotationAngle'] = ObjectSerializer.serialize(
                request.barcodeImageParams.rotationAngle,
                'number'
            );
        }

        if (request.qrParams?.qrEncodeMode != null) {
            queryParameters['qrEncodeMode'] = ObjectSerializer.serialize(request.qrParams.qrEncodeMode, 'QREncodeMode');
        }

        if (request.qrParams?.qrErrorLevel != null) {
            queryParameters['qrErrorLevel'] = ObjectSerializer.serialize(request.qrParams.qrErrorLevel, 'QRErrorLevel');
        }

        if (request.qrParams?.qrVersion != null) {
            queryParameters['qrVersion'] = ObjectSerializer.serialize(request.qrParams.qrVersion, 'QRVersion');
        }

        if (request.qrParams?.qrECIEncoding != null) {
            queryParameters['qrECIEncoding'] = ObjectSerializer.serialize(
                request.qrParams.qrECIEncoding,
                'ECIEncodings'
            );
        }

        if (request.qrParams?.qrAspectRatio != null) {
            queryParameters['qrAspectRatio'] = ObjectSerializer.serialize(request.qrParams.qrAspectRatio, 'number');
        }

        if (request.qrParams?.microQRVersion != null) {
            queryParameters['microQRVersion'] = ObjectSerializer.serialize(
                request.qrParams.microQRVersion,
                'MicroQRVersion'
            );
        }

        if (request.qrParams?.rectMicroQrVersion != null) {
            queryParameters['rectMicroQrVersion'] = ObjectSerializer.serialize(
                request.qrParams.rectMicroQrVersion,
                'RectMicroQRVersion'
            );
        }

        if (request.code128Params?.code128EncodeMode != null) {
            queryParameters['code128EncodeMode'] = ObjectSerializer.serialize(
                request.code128Params.code128EncodeMode,
                'Code128EncodeMode'
            );
        }

        if (request.pdf417Params?.pdf417EncodeMode != null) {
            queryParameters['pdf417EncodeMode'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417EncodeMode,
                'Pdf417EncodeMode'
            );
        }

        if (request.pdf417Params?.pdf417ErrorLevel != null) {
            queryParameters['pdf417ErrorLevel'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417ErrorLevel,
                'Pdf417ErrorLevel'
            );
        }

        if (request.pdf417Params?.pdf417Truncate != null) {
            queryParameters['pdf417Truncate'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417Truncate,
                'boolean'
            );
        }

        if (request.pdf417Params?.pdf417Columns != null) {
            queryParameters['pdf417Columns'] = ObjectSerializer.serialize(request.pdf417Params.pdf417Columns, 'number');
        }

        if (request.pdf417Params?.pdf417Rows != null) {
            queryParameters['pdf417Rows'] = ObjectSerializer.serialize(request.pdf417Params.pdf417Rows, 'number');
        }

        if (request.pdf417Params?.pdf417AspectRatio != null) {
            queryParameters['pdf417AspectRatio'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417AspectRatio,
                'number'
            );
        }

        if (request.pdf417Params?.pdf417ECIEncoding != null) {
            queryParameters['pdf417ECIEncoding'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417ECIEncoding,
                'ECIEncodings'
            );
        }

        if (request.pdf417Params?.pdf417IsReaderInitialization != null) {
            queryParameters['pdf417IsReaderInitialization'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417IsReaderInitialization,
                'boolean'
            );
        }

        if (request.pdf417Params?.pdf417MacroCharacters != null) {
            queryParameters['pdf417MacroCharacters'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417MacroCharacters,
                'MacroCharacter'
            );
        }

        if (request.pdf417Params?.pdf417IsLinked != null) {
            queryParameters['pdf417IsLinked'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417IsLinked,
                'boolean'
            );
        }

        if (request.pdf417Params?.pdf417IsCode128Emulation != null) {
            queryParameters['pdf417IsCode128Emulation'] = ObjectSerializer.serialize(
                request.pdf417Params.pdf417IsCode128Emulation,
                'boolean'
            );
        }

        const requestOptions: ApiRequestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
            encoding: null,
        };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'Buffer'),
        };
    }

    /**
     * Generate a barcode using a POST request with parameters in the request body in JSON or XML format.
     * @param request GenerateBodyRequestWrapper
     */
    public async generateBody(request: GenerateBodyRequestWrapper): Promise<{ response: ApiResponse; body: Buffer }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/generate-body';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);

        // verify required parameter 'request.generateParams' is not null or undefined
        if (request.generateParams == null) {
            throw new Error(
                'Required parameter request.generateParams was null or undefined when calling generateBody.'
            );
        }

        const requestOptions: ApiRequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
            body: ObjectSerializer.serialize(request.generateParams, 'GenerateParams'),
            json: true,
            encoding: null,
        };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'Buffer'),
        };
    }

    /**
     * Generate a barcode using a POST request with parameters in a multipart form.
     * @param request GenerateMultipartRequestWrapper
     */
    public async generateMultipart(
        request: GenerateMultipartRequestWrapper
    ): Promise<{ response: ApiResponse; body: Buffer }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/generate-multipart';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);
        const formParams: FormParamPairs = [];

        // verify required parameter 'request.barcodeType' is not null or undefined
        if (request.barcodeType == null) {
            throw new Error(
                'Required parameter request.barcodeType was null or undefined when calling generateMultipart.'
            );
        }

        // verify required parameter 'request.data' is not null or undefined
        if (request.data == null) {
            throw new Error('Required parameter request.data was null or undefined when calling generateMultipart.');
        }

        if (request.barcodeType != null) {
            formParams.push(['barcodeType', ObjectSerializer.serialize(request.barcodeType, 'EncodeBarcodeType')]);
        }
        if (request.dataType != null) {
            formParams.push(['dataType', ObjectSerializer.serialize(request.dataType, 'EncodeDataType')]);
        }
        if (request.data != null) {
            formParams.push(['data', ObjectSerializer.serialize(request.data, 'string')]);
        }
        if (request.barcodeImageParams?.imageFormat != null) {
            formParams.push([
                'imageFormat',
                ObjectSerializer.serialize(request.barcodeImageParams.imageFormat, 'BarcodeImageFormat'),
            ]);
        }
        if (request.barcodeImageParams?.textLocation != null) {
            formParams.push([
                'textLocation',
                ObjectSerializer.serialize(request.barcodeImageParams.textLocation, 'CodeLocation'),
            ]);
        }
        if (request.barcodeImageParams?.foregroundColor != null) {
            formParams.push([
                'foregroundColor',
                ObjectSerializer.serialize(request.barcodeImageParams.foregroundColor, 'string'),
            ]);
        }
        if (request.barcodeImageParams?.backgroundColor != null) {
            formParams.push([
                'backgroundColor',
                ObjectSerializer.serialize(request.barcodeImageParams.backgroundColor, 'string'),
            ]);
        }
        if (request.barcodeImageParams?.units != null) {
            formParams.push(['units', ObjectSerializer.serialize(request.barcodeImageParams.units, 'GraphicsUnit')]);
        }
        if (request.barcodeImageParams?.resolution != null) {
            formParams.push([
                'resolution',
                ObjectSerializer.serialize(request.barcodeImageParams.resolution, 'number'),
            ]);
        }
        if (request.barcodeImageParams?.imageHeight != null) {
            formParams.push([
                'imageHeight',
                ObjectSerializer.serialize(request.barcodeImageParams.imageHeight, 'number'),
            ]);
        }
        if (request.barcodeImageParams?.imageWidth != null) {
            formParams.push([
                'imageWidth',
                ObjectSerializer.serialize(request.barcodeImageParams.imageWidth, 'number'),
            ]);
        }
        if (request.barcodeImageParams?.rotationAngle != null) {
            formParams.push([
                'rotationAngle',
                ObjectSerializer.serialize(request.barcodeImageParams.rotationAngle, 'number'),
            ]);
        }
        if (request.qrParams?.qrEncodeMode != null) {
            formParams.push([
                'qrEncodeMode',
                ObjectSerializer.serialize(request.qrParams.qrEncodeMode, 'QREncodeMode'),
            ]);
        }
        if (request.qrParams?.qrErrorLevel != null) {
            formParams.push([
                'qrErrorLevel',
                ObjectSerializer.serialize(request.qrParams.qrErrorLevel, 'QRErrorLevel'),
            ]);
        }
        if (request.qrParams?.qrVersion != null) {
            formParams.push(['qrVersion', ObjectSerializer.serialize(request.qrParams.qrVersion, 'QRVersion')]);
        }
        if (request.qrParams?.qrECIEncoding != null) {
            formParams.push([
                'qrECIEncoding',
                ObjectSerializer.serialize(request.qrParams.qrECIEncoding, 'ECIEncodings'),
            ]);
        }
        if (request.qrParams?.qrAspectRatio != null) {
            formParams.push(['qrAspectRatio', ObjectSerializer.serialize(request.qrParams.qrAspectRatio, 'number')]);
        }
        if (request.qrParams?.microQRVersion != null) {
            formParams.push([
                'microQRVersion',
                ObjectSerializer.serialize(request.qrParams.microQRVersion, 'MicroQRVersion'),
            ]);
        }
        if (request.qrParams?.rectMicroQrVersion != null) {
            formParams.push([
                'rectMicroQrVersion',
                ObjectSerializer.serialize(request.qrParams.rectMicroQrVersion, 'RectMicroQRVersion'),
            ]);
        }
        if (request.code128Params?.code128EncodeMode != null) {
            formParams.push([
                'code128EncodeMode',
                ObjectSerializer.serialize(request.code128Params.code128EncodeMode, 'Code128EncodeMode'),
            ]);
        }
        if (request.pdf417Params?.pdf417EncodeMode != null) {
            formParams.push([
                'pdf417EncodeMode',
                ObjectSerializer.serialize(request.pdf417Params.pdf417EncodeMode, 'Pdf417EncodeMode'),
            ]);
        }
        if (request.pdf417Params?.pdf417ErrorLevel != null) {
            formParams.push([
                'pdf417ErrorLevel',
                ObjectSerializer.serialize(request.pdf417Params.pdf417ErrorLevel, 'Pdf417ErrorLevel'),
            ]);
        }
        if (request.pdf417Params?.pdf417Truncate != null) {
            formParams.push([
                'pdf417Truncate',
                ObjectSerializer.serialize(request.pdf417Params.pdf417Truncate, 'boolean'),
            ]);
        }
        if (request.pdf417Params?.pdf417Columns != null) {
            formParams.push([
                'pdf417Columns',
                ObjectSerializer.serialize(request.pdf417Params.pdf417Columns, 'number'),
            ]);
        }
        if (request.pdf417Params?.pdf417Rows != null) {
            formParams.push(['pdf417Rows', ObjectSerializer.serialize(request.pdf417Params.pdf417Rows, 'number')]);
        }
        if (request.pdf417Params?.pdf417AspectRatio != null) {
            formParams.push([
                'pdf417AspectRatio',
                ObjectSerializer.serialize(request.pdf417Params.pdf417AspectRatio, 'number'),
            ]);
        }
        if (request.pdf417Params?.pdf417ECIEncoding != null) {
            formParams.push([
                'pdf417ECIEncoding',
                ObjectSerializer.serialize(request.pdf417Params.pdf417ECIEncoding, 'ECIEncodings'),
            ]);
        }
        if (request.pdf417Params?.pdf417IsReaderInitialization != null) {
            formParams.push([
                'pdf417IsReaderInitialization',
                ObjectSerializer.serialize(request.pdf417Params.pdf417IsReaderInitialization, 'boolean'),
            ]);
        }
        if (request.pdf417Params?.pdf417MacroCharacters != null) {
            formParams.push([
                'pdf417MacroCharacters',
                ObjectSerializer.serialize(request.pdf417Params.pdf417MacroCharacters, 'MacroCharacter'),
            ]);
        }
        if (request.pdf417Params?.pdf417IsLinked != null) {
            formParams.push([
                'pdf417IsLinked',
                ObjectSerializer.serialize(request.pdf417Params.pdf417IsLinked, 'boolean'),
            ]);
        }
        if (request.pdf417Params?.pdf417IsCode128Emulation != null) {
            formParams.push([
                'pdf417IsCode128Emulation',
                ObjectSerializer.serialize(request.pdf417Params.pdf417IsCode128Emulation, 'boolean'),
            ]);
        }
        const requestOptions: ApiRequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
            encoding: null,
        };

        let fileArray = new Array<RequestFile>();

        const multipartForm = new Multipart(formParams, fileArray);
        requestOptions.body = multipartForm.body;
        requestOptions.headers = { ...requestOptions.headers, ...multipartForm.headers };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'Buffer'),
        };
    }
}

export class RecognizeApi {
    protected defaultHeaders: any = {
        'x-aspose-client': 'nodejs sdk',
        'x-aspose-client-version': '26.6.0',
    };
    protected _configuration: Configuration;
    private _client: ApiClient;

    constructor(configuration: Configuration) {
        this._configuration = configuration;
        this._client = new ApiClient();
    }

    /**
     * Recognize a barcode from a file on an Internet server using a GET request with a query string parameter. For recognizing files from your hard drive, use `recognize-body` or `recognize-multipart` endpoints instead.
     * @param request RecognizeRequestWrapper
     */
    public async recognize(
        request: RecognizeRequestWrapper
    ): Promise<{ response: ApiResponse; body: BarcodeResponseList }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/recognize';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);

        // verify required parameter 'request.barcodeType' is not null or undefined
        if (request.barcodeType == null) {
            throw new Error('Required parameter request.barcodeType was null or undefined when calling recognize.');
        }

        // verify required parameter 'request.fileUrl' is not null or undefined
        if (request.fileUrl == null) {
            throw new Error('Required parameter request.fileUrl was null or undefined when calling recognize.');
        }

        if (request.barcodeType != null) {
            queryParameters['barcodeType'] = ObjectSerializer.serialize(request.barcodeType, 'DecodeBarcodeType');
        }

        if (request.fileUrl != null) {
            queryParameters['fileUrl'] = ObjectSerializer.serialize(request.fileUrl, 'string');
        }

        if (request.recognitionMode != null) {
            queryParameters['recognitionMode'] = ObjectSerializer.serialize(request.recognitionMode, 'RecognitionMode');
        }

        if (request.recognitionImageKind != null) {
            queryParameters['recognitionImageKind'] = ObjectSerializer.serialize(
                request.recognitionImageKind,
                'RecognitionImageKind'
            );
        }

        const requestOptions: ApiRequestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
        };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'BarcodeResponseList'),
        };
    }

    /**
     * Recognize a barcode from a file in the request body using a POST request with JSON or XML body parameters.
     * @param request RecognizeBase64RequestWrapper
     */
    public async recognizeBase64(
        request: RecognizeBase64RequestWrapper
    ): Promise<{ response: ApiResponse; body: BarcodeResponseList }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/recognize-body';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);

        // verify required parameter 'request.recognizeBase64Request' is not null or undefined
        if (request.recognizeBase64Request == null) {
            throw new Error(
                'Required parameter request.recognizeBase64Request was null or undefined when calling recognizeBase64.'
            );
        }

        const requestOptions: ApiRequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
            body: ObjectSerializer.serialize(request.recognizeBase64Request, 'RecognizeBase64Request'),
            json: true,
        };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'BarcodeResponseList'),
        };
    }

    /**
     * Recognize a barcode from a file in the request body using a POST request with multipart form parameters.
     * @param request RecognizeMultipartRequestWrapper
     */
    public async recognizeMultipart(
        request: RecognizeMultipartRequestWrapper
    ): Promise<{ response: ApiResponse; body: BarcodeResponseList }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/recognize-multipart';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);
        const formParams: FormParamPairs = [];

        // verify required parameter 'request.barcodeType' is not null or undefined
        if (request.barcodeType == null) {
            throw new Error(
                'Required parameter request.barcodeType was null or undefined when calling recognizeMultipart.'
            );
        }

        // verify required parameter 'request.fileBytes' is not null or undefined
        if (request.fileBytes == null) {
            throw new Error(
                'Required parameter request.fileBytes was null or undefined when calling recognizeMultipart.'
            );
        }

        if (request.barcodeType != null) {
            formParams.push(['barcodeType', ObjectSerializer.serialize(request.barcodeType, 'DecodeBarcodeType')]);
        }
        if (request.recognitionMode != null) {
            formParams.push([
                'recognitionMode',
                ObjectSerializer.serialize(request.recognitionMode, 'RecognitionMode'),
            ]);
        }
        if (request.recognitionImageKind != null) {
            formParams.push([
                'recognitionImageKind',
                ObjectSerializer.serialize(request.recognitionImageKind, 'RecognitionImageKind'),
            ]);
        }
        const requestOptions: ApiRequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
        };

        let fileArray = new Array<RequestFile>();
        fileArray = request.fileBytes == null ? [] : [new RequestFile('file', '', request.fileBytes)];
        const multipartForm = new Multipart(formParams, fileArray);
        requestOptions.body = multipartForm.body;
        requestOptions.headers = { ...requestOptions.headers, ...multipartForm.headers };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'BarcodeResponseList'),
        };
    }
}

export class ScanApi {
    protected defaultHeaders: any = {
        'x-aspose-client': 'nodejs sdk',
        'x-aspose-client-version': '26.6.0',
    };
    protected _configuration: Configuration;
    private _client: ApiClient;

    constructor(configuration: Configuration) {
        this._configuration = configuration;
        this._client = new ApiClient();
    }

    /**
     * Scan a barcode from a file on an Internet server using a GET request with a query string parameter. For scanning files from your hard drive, use `scan-body` or `scan-multipart` endpoints instead.
     * @param request ScanRequestWrapper
     */
    public async scan(request: ScanRequestWrapper): Promise<{ response: ApiResponse; body: BarcodeResponseList }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/scan';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);

        // verify required parameter 'request.fileUrl' is not null or undefined
        if (request.fileUrl == null) {
            throw new Error('Required parameter request.fileUrl was null or undefined when calling scan.');
        }

        if (request.fileUrl != null) {
            queryParameters['fileUrl'] = ObjectSerializer.serialize(request.fileUrl, 'string');
        }

        const requestOptions: ApiRequestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
        };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'BarcodeResponseList'),
        };
    }

    /**
     * Scan a barcode from a file in the request body using a POST request with a JSON or XML body parameter.
     * @param request ScanBase64RequestWrapper
     */
    public async scanBase64(
        request: ScanBase64RequestWrapper
    ): Promise<{ response: ApiResponse; body: BarcodeResponseList }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/scan-body';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);

        // verify required parameter 'request.scanBase64Request' is not null or undefined
        if (request.scanBase64Request == null) {
            throw new Error(
                'Required parameter request.scanBase64Request was null or undefined when calling scanBase64.'
            );
        }

        const requestOptions: ApiRequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
            body: ObjectSerializer.serialize(request.scanBase64Request, 'ScanBase64Request'),
            json: true,
        };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'BarcodeResponseList'),
        };
    }

    /**
     * Scan a barcode from a file in the request body using a POST request with a multipart form parameter.
     * @param request ScanMultipartRequestWrapper
     */
    public async scanMultipart(
        request: ScanMultipartRequestWrapper
    ): Promise<{ response: ApiResponse; body: BarcodeResponseList }> {
        const requestPath = this._configuration.getApiBaseUrl() + '/barcode/scan-multipart';
        let queryParameters: any = {};
        let headerParams: any = (Object as any).assign({}, this.defaultHeaders);
        const formParams: FormParamPairs = [];

        // verify required parameter 'request.fileBytes' is not null or undefined
        if (request.fileBytes == null) {
            throw new Error('Required parameter request.fileBytes was null or undefined when calling scanMultipart.');
        }

        const requestOptions: ApiRequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: requestPath,
        };

        let fileArray = new Array<RequestFile>();
        fileArray = request.fileBytes == null ? [] : [new RequestFile('file', '', request.fileBytes)];
        const multipartForm = new Multipart(formParams, fileArray);
        requestOptions.body = multipartForm.body;
        requestOptions.headers = { ...requestOptions.headers, ...multipartForm.headers };

        await this._configuration.authentication.applyToRequestAsync(requestOptions);

        const result: ApiResult = await this._client.requestAsync(requestOptions);

        return {
            response: result.response,
            body: ObjectSerializer.deserialize(result.body, 'BarcodeResponseList'),
        };
    }
}
