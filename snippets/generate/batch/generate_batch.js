const fs = require('fs');
const Barcode = require('aspose-barcode-cloud-node');

async function main() {
    const configuration = new Barcode.Configuration(
        undefined,
        undefined,
        undefined,
        process.env.TEST_CONFIGURATION_ACCESS_TOKEN
    );
    const generation = new Barcode.GenerateParams();
    generation.barcodeType = Barcode.EncodeBarcodeType.Qr;
    generation.encodeData = new Barcode.EncodeData();
    generation.encodeData.data = 'Batch example';
    const item = new Barcode.BatchGenerateItem();
    item.fileName = 'qr.png';
    item.generation = generation;
    const batch = new Barcode.BatchGenerateRequest();
    batch.archiveFormat = Barcode.BatchArchiveFormat.Zip;
    batch.items = [item];
    const result = await new Barcode.GenerateApi(configuration).generateBatch(
        new Barcode.GenerateBatchRequestWrapper(batch)
    );
    fs.writeFileSync('barcodes.zip', result.body);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
