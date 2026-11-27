const fs = require('fs');
const path = require('path');
const Barcode = require('aspose-barcode-cloud-node');

function makeConfiguration() {
    const envToken = process.env['TEST_CONFIGURATION_ACCESS_TOKEN'];
    if (!envToken) {
        return new Barcode.Configuration(
            'Client Id from https://dashboard.aspose.cloud/applications',
            'Client Secret from https://dashboard.aspose.cloud/applications',
            null,
            null
        );
    } else {
        return new Barcode.Configuration(null, null, null, envToken);
    }
}
const config = makeConfiguration();

async function generateBatch(api, fileName) {
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

    const generated = await api.generateBatch(new Barcode.GenerateBatchRequestWrapper(batch));

    fs.writeFileSync(fileName, generated.body);
}

const genApi = new Barcode.GenerateApi(config);
const fileName = path.resolve('testdata', 'barcodes.zip');

generateBatch(genApi, fileName)
    .then(() => {
        console.log("File '" + fileName + "' generated.");
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
