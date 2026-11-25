import * as Barcode from '../src/api';
import { LoadTestConfiguration } from './helpers';

describe('batch generation', () => {
    jest.setTimeout(60000);
    const api = new Barcode.GenerateApi(LoadTestConfiguration());

    it.each([
        [Barcode.BatchArchiveFormat.Zip, 0, [0x50, 0x4b, 0x03, 0x04]],
        [Barcode.BatchArchiveFormat.Tar, 257, [...Buffer.from('ustar')]],
        [Barcode.BatchArchiveFormat.TarGzip, 0, [0x1f, 0x8b]],
    ] as const)('returns a binary %s archive', async (format, offset, magic) => {
        const generation = new Barcode.GenerateParams();
        generation.barcodeType = Barcode.EncodeBarcodeType.Qr;
        generation.encodeData = new Barcode.EncodeData();
        generation.encodeData.data = 'Batch example';
        const item = new Barcode.BatchGenerateItem();
        item.fileName = 'qr.png';
        item.generation = generation;
        const batch = new Barcode.BatchGenerateRequest();
        batch.archiveFormat = format;
        batch.items = [item];

        const result = await api.generateBatch(new Barcode.GenerateBatchRequestWrapper(batch));
        expect(Buffer.isBuffer(result.body)).toBe(true);
        expect([...result.body.subarray(offset, offset + magic.length)]).toEqual([...magic]);
    });
});
