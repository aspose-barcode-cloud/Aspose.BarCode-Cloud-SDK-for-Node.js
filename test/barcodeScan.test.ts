import fs from 'fs';

import assert from 'assert';

import * as Barcode from '../src/api';
import { LoadTestConfiguration } from './helpers';

describe('barcodeScan', () => {
    jest.setTimeout(60000);

    const config = LoadTestConfiguration();
    const api = new Barcode.ScanApi(config);

    const publicTestImageUrl =
        'https://raw.githubusercontent.com/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js/main/testdata/QR_and_Code128.png';
    const imageBuffer = fs.readFileSync('./testdata/pdf417Sample.png');
    const base64File = fs.readFileSync('./testdata/QR_and_Code128.png').toString('base64');

    it('scanMultipart should recognize uploaded image', async () => {
        const scanRequest = new Barcode.ScanMultipartRequestWrapper(imageBuffer);
        const recognized = await api.scanMultipart(scanRequest);

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

    it('scanBase64 should recognize uploaded image', async () => {
        const scanBase64Request = new Barcode.ScanBase64Request();
        scanBase64Request.fileBase64 = base64File;
        const scanRequest = new Barcode.ScanBase64RequestWrapper(scanBase64Request);

        const recognized = await api.scanBase64(scanRequest);

        assert.ok(recognized.body.barcodes);
        assert.strictEqual(recognized.body.barcodes.length, 2);

        let barcode = recognized.body.barcodes[0];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Qr);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');

        barcode = recognized.body.barcodes[1];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Code128);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');
    });

    it('scan should recognize image from URL', async () => {
        const scanRequest = new Barcode.ScanRequestWrapper(publicTestImageUrl);

        const recognized = await api.scan(scanRequest);

        assert.ok(recognized.body.barcodes);
        assert.strictEqual(recognized.body.barcodes.length, 2);

        let barcode = recognized.body.barcodes[0];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Qr);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');

        barcode = recognized.body.barcodes[1];
        assert.strictEqual(barcode.type, Barcode.DecodeBarcodeType.Code128);
        assert.strictEqual(barcode.barcodeValue, 'Hello world!');
    });
});
