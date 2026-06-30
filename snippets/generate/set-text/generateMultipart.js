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

async function generateBarcode(api, fileName) {
    const formRequest = new Barcode.GenerateMultipartRequestWrapper(
        Barcode.EncodeBarcodeType.Code128,
        '4173706F73652E426172436F64652E436C6F7564'
    );
    formRequest.dataType = Barcode.EncodeDataType.HexBytes;

    formRequest.code128Params = new Barcode.Code128Params();
    formRequest.code128Params.code128EncodeMode = Barcode.Code128EncodeMode.Auto;

    const generated = await api.generateMultipart(formRequest);

    fs.writeFileSync(fileName, generated.body);
}

const genApi = new Barcode.GenerateApi(config);
const fileName = path.resolve('testdata', 'Code128.png');

generateBarcode(genApi, fileName)
    .then(() => {
        console.log(`File '${fileName}' generated.`);
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
