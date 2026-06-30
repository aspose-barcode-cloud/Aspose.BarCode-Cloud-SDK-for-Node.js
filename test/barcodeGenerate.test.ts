import assert from 'assert';

import * as Barcode from '../src/api';
import { LoadTestConfiguration } from './helpers';

describe('barcodeGenerateApiTests', () => {
    jest.setTimeout(60000);

    const api = new Barcode.GenerateApi(LoadTestConfiguration());

    it('should generate image with generate', async () => {
        const request = new Barcode.GenerateRequestWrapper(Barcode.EncodeBarcodeType.Qr, 'Testing generator');
        request.barcodeImageParams = new Barcode.BarcodeImageParams();
        request.barcodeImageParams.foregroundColor = '0x001100';
        const generated = await api.generate(request);

        const imageSize = generated.body.buffer.byteLength;
        assert.ok(imageSize > 0, `ImageSize=${imageSize}`);
    });

    it('should generate image with generateBody', async () => {
        const imageParams = new Barcode.BarcodeImageParams();
        imageParams.backgroundColor = '0xffddff';

        const encodeData = new Barcode.EncodeData();
        encodeData.data = 'Testing generator';

        const generateParams = new Barcode.GenerateParams();
        generateParams.barcodeType = Barcode.EncodeBarcodeType.Pdf417;
        generateParams.encodeData = encodeData;
        generateParams.barcodeImageParams = imageParams;

        const request = new Barcode.GenerateBodyRequestWrapper(generateParams);
        const generated = await api.generateBody(request);

        const imageSize = generated.body.buffer.byteLength;
        assert.ok(imageSize > 0, `ImageSize=${imageSize}`);
    });

    it('should generate image with generateBody', async () => {
        const request = new Barcode.GenerateMultipartRequestWrapper(Barcode.EncodeBarcodeType.Qr, 'Testing generator');
        request.barcodeImageParams = new Barcode.BarcodeImageParams();
        request.barcodeImageParams.rotationAngle = 90;
        const generated = await api.generateMultipart(request);

        const imageSize = generated.body.buffer.byteLength;
        assert.ok(imageSize > 0, `ImageSize=${imageSize}`);
    });
});
