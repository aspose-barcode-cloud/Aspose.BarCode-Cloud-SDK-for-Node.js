import assert from 'assert';

import * as Barcode from '../src/api';
import { LoadTestConfiguration } from './helpers';

describe('barcodeGenerateApiTests', () => {
    jest.setTimeout(60000);

    const api = new Barcode.GenerateApi(LoadTestConfiguration());
    const generateParamsTestData = 'Aspose.BarCode.Cloud';

    function assertGeneratedImage(generated: { body: Buffer }) {
        const imageSize = generated.body.byteLength;
        assert.ok(imageSize > 0, `ImageSize=${imageSize}`);
    }

    function createImageParams() {
        const imageParams = new Barcode.BarcodeImageParams();
        imageParams.imageFormat = Barcode.BarcodeImageFormat.Png;
        imageParams.textLocation = Barcode.CodeLocation.Above;
        imageParams.foregroundColor = '#FF000000';
        imageParams.backgroundColor = '#FFFFFFFF';
        imageParams.units = Barcode.GraphicsUnit.Pixel;
        imageParams.resolution = 150;
        imageParams.imageHeight = 240;
        imageParams.imageWidth = 360;
        imageParams.rotationAngle = 90;
        return imageParams;
    }

    function createPdf417ImageParams() {
        const imageParams = createImageParams();
        imageParams.imageHeight = 480;
        imageParams.imageWidth = 640;
        return imageParams;
    }

    it('should generate image with generate', async () => {
        const request = new Barcode.GenerateRequestWrapper(Barcode.EncodeBarcodeType.Qr, generateParamsTestData);
        request.dataType = Barcode.EncodeDataType.StringData;
        request.barcodeImageParams = createImageParams();
        request.qrParams = new Barcode.QrParams();
        request.qrParams.qrEncodeMode = Barcode.QREncodeMode.Eci;
        request.qrParams.qrErrorLevel = Barcode.QRErrorLevel.LevelM;
        request.qrParams.qrVersion = Barcode.QRVersion.Version04;
        request.qrParams.qrECIEncoding = Barcode.ECIEncodings.Utf8;
        request.qrParams.qrAspectRatio = 0.75;

        const generated = await api.generate(request);

        assertGeneratedImage(generated);
    });

    it('should generate image with generateBody', async () => {
        const encodeData = new Barcode.EncodeData();
        encodeData.dataType = Barcode.EncodeDataType.StringData;
        encodeData.data = generateParamsTestData;

        const generateParams = new Barcode.GenerateParams();
        generateParams.barcodeType = Barcode.EncodeBarcodeType.Pdf417;
        generateParams.encodeData = encodeData;
        generateParams.barcodeImageParams = createPdf417ImageParams();
        generateParams.pdf417Params = new Barcode.Pdf417Params();
        generateParams.pdf417Params.pdf417EncodeMode = Barcode.Pdf417EncodeMode.Eci;
        generateParams.pdf417Params.pdf417ErrorLevel = Barcode.Pdf417ErrorLevel.Level2;
        generateParams.pdf417Params.pdf417Truncate = true;
        generateParams.pdf417Params.pdf417Columns = 5;
        generateParams.pdf417Params.pdf417Rows = 12;
        generateParams.pdf417Params.pdf417AspectRatio = 3;
        generateParams.pdf417Params.pdf417ECIEncoding = Barcode.ECIEncodings.Utf8;
        generateParams.pdf417Params.pdf417IsReaderInitialization = false;
        generateParams.pdf417Params.pdf417MacroCharacters = Barcode.MacroCharacter.Macro05;
        generateParams.pdf417Params.pdf417IsLinked = false;
        generateParams.pdf417Params.pdf417IsCode128Emulation = false;

        const request = new Barcode.GenerateBodyRequestWrapper(generateParams);
        const generated = await api.generateBody(request);

        assertGeneratedImage(generated);
    });

    it('should generate image with generateMultipart', async () => {
        const request = new Barcode.GenerateMultipartRequestWrapper(
            Barcode.EncodeBarcodeType.Code128,
            generateParamsTestData
        );
        request.dataType = Barcode.EncodeDataType.StringData;
        request.barcodeImageParams = createImageParams();
        request.barcodeImageParams.imageWidth = 640;
        request.barcodeImageParams.rotationAngle = 0;
        request.code128Params = new Barcode.Code128Params();
        request.code128Params.code128EncodeMode = Barcode.Code128EncodeMode.CodeB;

        const generated = await api.generateMultipart(request);

        assertGeneratedImage(generated);
    });

    it('should generate MicroQR image with generateBody', async () => {
        const encodeData = new Barcode.EncodeData();
        encodeData.dataType = Barcode.EncodeDataType.StringData;
        encodeData.data = 'ABC123';

        const generateParams = new Barcode.GenerateParams();
        generateParams.barcodeType = Barcode.EncodeBarcodeType.MicroQr;
        generateParams.encodeData = encodeData;
        generateParams.barcodeImageParams = createImageParams();
        generateParams.barcodeImageParams.imageHeight = 160;
        generateParams.barcodeImageParams.imageWidth = 160;
        generateParams.qrParams = new Barcode.QrParams();
        generateParams.qrParams.microQRVersion = Barcode.MicroQRVersion.M4;

        const request = new Barcode.GenerateBodyRequestWrapper(generateParams);
        const generated = await api.generateBody(request);

        assertGeneratedImage(generated);
    });

    it('should generate RectMicroQR image with generateBody', async () => {
        const encodeData = new Barcode.EncodeData();
        encodeData.dataType = Barcode.EncodeDataType.StringData;
        encodeData.data = 'ABC123';

        const generateParams = new Barcode.GenerateParams();
        generateParams.barcodeType = Barcode.EncodeBarcodeType.RectMicroQr;
        generateParams.encodeData = encodeData;
        generateParams.barcodeImageParams = createImageParams();
        generateParams.barcodeImageParams.imageHeight = 160;
        generateParams.barcodeImageParams.imageWidth = 320;
        generateParams.qrParams = new Barcode.QrParams();
        generateParams.qrParams.rectMicroQrVersion = Barcode.RectMicroQRVersion.R13x59;

        const request = new Barcode.GenerateBodyRequestWrapper(generateParams);
        const generated = await api.generateBody(request);

        assertGeneratedImage(generated);
    });

    it('should generate PDF417 image with generateMultipart', async () => {
        const request = new Barcode.GenerateMultipartRequestWrapper(
            Barcode.EncodeBarcodeType.Pdf417,
            generateParamsTestData
        );
        request.dataType = Barcode.EncodeDataType.StringData;
        request.barcodeImageParams = createPdf417ImageParams();
        request.barcodeImageParams.rotationAngle = 180;
        request.pdf417Params = new Barcode.Pdf417Params();
        request.pdf417Params.pdf417EncodeMode = Barcode.Pdf417EncodeMode.Eci;
        request.pdf417Params.pdf417ErrorLevel = Barcode.Pdf417ErrorLevel.Level2;
        request.pdf417Params.pdf417Truncate = true;
        request.pdf417Params.pdf417Columns = 5;
        request.pdf417Params.pdf417Rows = 12;
        request.pdf417Params.pdf417AspectRatio = 3;
        request.pdf417Params.pdf417ECIEncoding = Barcode.ECIEncodings.Utf8;
        request.pdf417Params.pdf417MacroCharacters = Barcode.MacroCharacter.Macro05;

        const generated = await api.generateMultipart(request);

        assertGeneratedImage(generated);
    });
});
