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

async function scanBarcode(api, fileUrl) {
    const request = new Barcode.ScanRequestWrapper(fileUrl);
    const result = await api.scan(request);
    return result.body.barcodes;
}

const config = makeConfiguration();
const scanApi = new Barcode.ScanApi(config);
const fileUrl =
    'https://raw.githubusercontent.com/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js/main/testdata/QR_and_Code128.png';

scanBarcode(scanApi, fileUrl)
    .then((barcodes) => {
        console.log(`File recognized, result: '${barcodes[0].barcodeValue}'`);
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
