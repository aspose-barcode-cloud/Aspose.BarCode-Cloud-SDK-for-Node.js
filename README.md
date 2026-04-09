# Aspose.BarCode Cloud SDK for Node.js

[![License](https://img.shields.io/github/license/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js)](LICENSE)
[![Node.js CI](https://github.com/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/aspose-barcode-cloud/Aspose.BarCode-Cloud-SDK-for-Node.js/actions/workflows/node.js.yml)
[![npm](https://img.shields.io/npm/v/aspose-barcode-cloud-node)](https://www.npmjs.com/package/aspose-barcode-cloud-node)

+ API version: 4.0
+ Package version: 26.3.2

## SDK and API Version Compatibility:

- SDK Version 25.1 and Later: Starting from SDK version 25.1, all subsequent versions are compatible with API Version v4.0.
- SDK Version 24.12 and Earlier: These versions are compatible with API Version v3.0.

## Demo applications

[Scan QR](https://products.aspose.app/barcode/scanqr) | [Generate Barcode](https://products.aspose.app/barcode/generate) | [Recognize Barcode](https://products.aspose.app/barcode/recognize)
:---: | :---: | :---:
[![ScanQR](https://products.aspose.app/barcode/scanqr/img/aspose_scanqr-app-48.png)](https://products.aspose.app/barcode/scanqr) | [![Generate](https://products.aspose.app/barcode/generate/img/aspose_generate-app-48.png)](https://products.aspose.app/barcode/generate) | [![Recognize](https://products.aspose.app/barcode/recognize/img/aspose_recognize-app-48.png)](https://products.aspose.app/barcode/recognize)
[**Generate Wi-Fi QR**](https://products.aspose.app/barcode/wifi-qr) | [**Embed Barcode**](https://products.aspose.app/barcode/embed) | [**Scan Barcode**](https://products.aspose.app/barcode/scan)
[![Wi-FiQR](https://products.aspose.app/barcode/embed/img/aspose_wifi-qr-app-48.png)](https://products.aspose.app/barcode/wifi-qr) | [![Embed](https://products.aspose.app/barcode/embed/img/aspose_embed-app-48.png)](https://products.aspose.app/barcode/embed) | [![Scan](https://products.aspose.app/barcode/embed/img/aspose_scan-app-48.png)](https://products.aspose.app/barcode/scan)

[Aspose.BarCode for Cloud](https://products.aspose.cloud/barcode/) is a REST API for Linear, 2D and postal barcode generation and recognition in the cloud. API recognizes and generates barcode images in a variety of formats. Barcode REST API allows to specify barcode image attributes like image width, height, border style and output image format in order to customize the generation process. Developers can also specify the barcode type and text attributes such as text location and font styles in order to suit the application requirements.

This repository contains Aspose.BarCode Cloud SDK for Node.js source code.

To use these SDKs, you will need Client Id and Client Secret which can be looked up at [Aspose Cloud Dashboard](https://dashboard.aspose.cloud/applications) (free registration in Aspose Cloud is required for this).

## Requirements

- Node.js 18 or later (native `fetch` required).

## How to use the SDK

The complete source code is available in this repository folder. You can either directly use it in your project via source code or get [nmpjs distribution](https://www.npmjs.com/package/aspose-barcode-cloud-node) (recommended).

## AI Agent Skills

This repository includes an AI-agent skill in [`skills/aspose-barcode-cloud-node/SKILL.md`](skills/aspose-barcode-cloud-node/SKILL.md). Point your coding agent to it when working with this SDK so it follows the repo workflow and SDK-specific API patterns.

### Install Aspose.BarCode for Cloud via NPM

From the command line:

```sh
npm install aspose-barcode-cloud-node --save
```

### Sample usage

The examples below show how your application have to generate QR code and save it on local storage:

```js
const fs = require('fs');
const Barcode = require('aspose-barcode-cloud-node');

const config = new Barcode.Configuration(
    'Client Id from https://dashboard.aspose.cloud/applications',
    'Client Secret from https://dashboard.aspose.cloud/applications',
    null,
    process.env['TEST_CONFIGURATION_ACCESS_TOKEN']
);

async function generateBarcode(api) {
    const request = new Barcode.GenerateRequestWrapper(
        Barcode.EncodeBarcodeType.Qr,
        'Aspose.BarCode for Cloud Sample');

    const oneBarcode = await api.generate(request);

    const fileName = 'QR.png'
    fs.writeFileSync(fileName, oneBarcode.body);

    return fileName;
}

async function scanBarcode(api, fileName) {

    const scanRequest = new Barcode.ScanMultipartRequestWrapper(fs.readFileSync(fileName));
    const result = await api.scanMultipart(scanRequest);

    return result.body.barcodes;
}

const genApi = new Barcode.GenerateApi(config);
const scanApi = new Barcode.ScanApi(config);

console.log('Generating barcode...');
generateBarcode(genApi)
    .then(fileName => {
        console.log('Barcode saved to ' + fileName);

        console.log('Trying to recognize barcode...');
        scanBarcode(scanApi, fileName)
            .then(barcodes => {
                console.log('Recognized barcodes are:');
                console.log(JSON.stringify(barcodes, null, 2));
            });
    })
    .catch(err => {
        console.error("Error: " + JSON.stringify(err, null, 2));
        process.exitCode = 1;
    });

```

Every method returns a chainable promise.

## Licensing

All Aspose.BarCode for Cloud SDKs, helper scripts and templates are licensed under [MIT License](LICENSE).

## Resources

+ [**Website**](https://www.aspose.cloud)
+ [**Product Home**](https://products.aspose.cloud/barcode/)
+ [**Documentation**](https://docs.aspose.cloud/barcode/)
+ [**Free Support Forum**](https://forum.aspose.cloud/c/barcode)
+ [**Paid Support Helpdesk**](https://helpdesk.aspose.cloud/)
+ [**Blog**](https://blog.aspose.cloud/categories/aspose.barcode-cloud-product-family/)

## Documentation for API Endpoints

All URIs are relative to *<https://api.aspose.cloud/v4.0/>*

Class | Method | HTTP request | Description
----- | ------ | ------------ | -----------
GenerateApi | [**generate**](docs/index.md#generate) | **GET** /barcode/generate/{barcodeType} | Generate barcode using GET request with parameters in route and query string.
GenerateApi | [**generateBody**](docs/index.md#generatebody) | **POST** /barcode/generate-body | Generate barcode using POST request with parameters in body in json or xml format.
GenerateApi | [**generateMultipart**](docs/index.md#generatemultipart) | **POST** /barcode/generate-multipart | Generate barcode using POST request with parameters in multipart form.
RecognizeApi | [**recognize**](docs/index.md#recognize) | **GET** /barcode/recognize | Recognize barcode from file on server in the Internet using GET requests with parameter in query string. For recognizing files from your hard drive use &#x60;recognize-body&#x60; or &#x60;recognize-multipart&#x60; endpoints instead.
RecognizeApi | [**recognizeBase64**](docs/index.md#recognizebase64) | **POST** /barcode/recognize-body | Recognize barcode from file in request body using POST requests with parameters in body in json or xml format.
RecognizeApi | [**recognizeMultipart**](docs/index.md#recognizemultipart) | **POST** /barcode/recognize-multipart | Recognize barcode from file in request body using POST requests with parameters in multipart form.
ScanApi | [**scan**](docs/index.md#scan) | **GET** /barcode/scan | Scan barcode from file on server in the Internet using GET requests with parameter in query string. For scaning files from your hard drive use &#x60;scan-body&#x60; or &#x60;scan-multipart&#x60; endpoints instead.
ScanApi | [**scanBase64**](docs/index.md#scanbase64) | **POST** /barcode/scan-body | Scan barcode from file in request body using POST requests with parameter in body in json or xml format.
ScanApi | [**scanMultipart**](docs/index.md#scanmultipart) | **POST** /barcode/scan-multipart | Scan barcode from file in request body using POST requests with parameter in multipart form.
