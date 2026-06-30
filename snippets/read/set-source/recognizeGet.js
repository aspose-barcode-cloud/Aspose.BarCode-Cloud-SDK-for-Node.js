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

async function recognizeBarcode(api, fileUrl) {
    const RecognizeRequestWrapper = new Barcode.RecognizeRequestWrapper(Barcode.DecodeBarcodeType.Qr, fileUrl);
    const result = await api.recognize(RecognizeRequestWrapper);
    return result.body.barcodes;
}

const recognizeApi = new Barcode.RecognizeApi(config);

const fileUrl =
    'https://raw.githubusercontent.com/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js/main/testdata/QR_and_Code128.png';

recognizeBarcode(recognizeApi, fileUrl)
    .then((barcodes) => {
        console.log(`File recognized, result: '${barcodes[0].barcodeValue}'`);
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
