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

async function recognizeBarcode(api, fileName) {
    const imageBuffer = fs.readFileSync(fileName);

    const RecognizeRequestWrapper = new Barcode.RecognizeMultipartRequestWrapper(
        Barcode.DecodeBarcodeType.Aztec,
        imageBuffer
    );
    RecognizeRequestWrapper.recognitionMode = Barcode.RecognitionMode.Normal;
    RecognizeRequestWrapper.recognitionImageKind = Barcode.RecognitionImageKind.ScannedDocument;

    const result = await api.recognizeMultipart(RecognizeRequestWrapper);

    return result.body.barcodes;
}

const recognizeApi = new Barcode.RecognizeApi(config);

const fileName = path.resolve('testdata', 'aztec.png');

recognizeBarcode(recognizeApi, fileName)
    .then((barcodes) => {
        console.log(`File '${fileName}' recognized, result: '${barcodes[0].barcodeValue}'`);
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
