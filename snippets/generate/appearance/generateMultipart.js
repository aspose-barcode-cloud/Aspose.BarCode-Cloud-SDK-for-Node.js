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
    const request = new Barcode.GenerateMultipartRequestWrapper(
        Barcode.EncodeBarcodeType.Pdf417,
        'Aspose.BarCode.Cloud'
    );
    request.barcodeImageParams = new Barcode.BarcodeImageParams();
    request.barcodeImageParams.textLocation = Barcode.CodeLocation.Above;
    request.barcodeImageParams.imageFormat = Barcode.BarcodeImageFormat.Svg;

    request.pdf417Params = new Barcode.Pdf417Params();
    request.pdf417Params.pdf417EncodeMode = Barcode.Pdf417EncodeMode.Auto;
    request.pdf417Params.pdf417ErrorLevel = Barcode.Pdf417ErrorLevel.Level2;
    request.pdf417Params.pdf417AspectRatio = 3;

    const generated = await api.generateMultipart(request);

    fs.writeFileSync(fileName, generated.body);
}

const genApi = new Barcode.GenerateApi(config);
const fileName = path.resolve('testdata', 'Pdf417.svg');

generateBarcode(genApi, fileName)
    .then(() => {
        console.log("File '" + fileName + "' generated.");
    })
    .catch((err) => {
        console.error('Error: ' + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });
