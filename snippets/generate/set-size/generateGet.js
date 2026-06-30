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
    const request = new Barcode.GenerateRequestWrapper(Barcode.EncodeBarcodeType.Qr, 'Aspose.BarCode.Cloud');
    request.barcodeImageParams = new Barcode.BarcodeImageParams();
    request.barcodeImageParams.imageHeight = 200;
    request.barcodeImageParams.imageWidth = 200;
    request.barcodeImageParams.resolution = 300;
    request.barcodeImageParams.units = Barcode.GraphicsUnit.Pixel;

    const generated = await api.generate(request);
    fs.writeFileSync(fileName, generated.body);
}

const genApi = new Barcode.GenerateApi(config);
const fileName = path.resolve('testdata', 'Qr.png');

generateBarcode(genApi, fileName)
    .then(() => {
        console.log("File '" + fileName + "' generated.");
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
