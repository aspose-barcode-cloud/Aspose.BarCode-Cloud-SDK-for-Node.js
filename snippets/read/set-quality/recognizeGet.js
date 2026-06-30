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

async function recognizeBarcode(api, fileUrl) {
    const request = new Barcode.RecognizeRequestWrapper(Barcode.DecodeBarcodeType.Qr, fileUrl);
    request.recognitionMode = Barcode.RecognitionMode.Fast;
    request.imageKind = Barcode.RecognitionImageKind.Photo;
    const result = await api.recognize(request);
    return result.body.barcodes;
}

const config = makeConfiguration();
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
