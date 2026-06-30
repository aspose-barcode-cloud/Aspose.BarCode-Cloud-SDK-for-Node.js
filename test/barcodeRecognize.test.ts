import fs from 'fs';

import assert from 'assert';

import * as Barcode from '../src/api';
import { LoadTestConfiguration } from './helpers';

describe('barcodeRecognize', () => {
    jest.setTimeout(60000);

    const config = LoadTestConfiguration();
    const api = new Barcode.RecognizeApi(config);

    const publicTestImageUrl =
        'https://raw.githubusercontent.com/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js/main/testdata/QR_and_Code128.png';
    const imageBuffer = fs.readFileSync('./testdata/pdf417Sample.png');
    const base64File = fs.readFileSync('./testdata/QR_and_Code128.png').toString('base64');

    it('recognizeMultipart should recognize uploaded image', async () => {
        const request = new Barcode.RecognizeMultipartRequestWrapper(Barcode.DecodeBarcodeType.Pdf417, imageBuffer);
        request.recognitionImageKind = Barcode.RecognitionImageKind.ClearImage;
        request.recognitionMode = Barcode.RecognitionMode.Fast;

        const recognized = await api.recognizeMultipart(request);

        assert.ok(recognized.body.barcodes);
        assert.strictEqual(recognized.body.barcodes.length, 1);
        const barcode = recognized.body.barcodes[0];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Pdf417);
        assert.strictEqual(barcode.barcodeValue, 'Aspose.BarCode for Cloud Sample');

        assert.ok(barcode.region);
        assert.strictEqual(barcode.region!.length, 4);

        assert.strictEqual(barcode.region![0].x, 16);
        assert.strictEqual(barcode.region![0].y, 4);
        assert.strictEqual(barcode.region![1].x, 185);
        assert.strictEqual(barcode.region![1].y, 4);
        assert.strictEqual(barcode.region![2].x, 185);
        assert.strictEqual(barcode.region![2].y, 213);
        assert.strictEqual(barcode.region![3].x, 16);
        assert.strictEqual(barcode.region![3].y, 213);
    });

    it('recognizeBase64 should recognize uploaded image', async () => {
        const recognizeBase64Request = new Barcode.RecognizeBase64Request();
        recognizeBase64Request.barcodeTypes = [Barcode.DecodeBarcodeType.MostCommonlyUsed];
        recognizeBase64Request.fileBase64 = base64File;
        const recognizeRequestWrapper = new Barcode.RecognizeBase64RequestWrapper(recognizeBase64Request);

        const recognized = await api.recognizeBase64(recognizeRequestWrapper);

        assert.ok(recognized.body.barcodes);
        assert.strictEqual(recognized.body.barcodes.length, 2);

        let barcode = recognized.body.barcodes[0];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Qr);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');

        barcode = recognized.body.barcodes[1];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Code128);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');
    });

    it('recognize should recognize image from URL', async () => {
        const recognizeRequest = new Barcode.RecognizeRequestWrapper(Barcode.DecodeBarcodeType.Qr, publicTestImageUrl);

        const recognized = await api.recognize(recognizeRequest);

        assert.ok(recognized.body.barcodes);
        assert.strictEqual(recognized.body.barcodes.length, 1);

        let barcode = recognized.body.barcodes[0];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Qr);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');
    });
});
