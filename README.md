# OTP Designer jQuery Plugin

## Overview

**OTP-designer-jquery** is a user-friendly jQuery plugin that enables you to create an easy-to-use One-Time Password (OTP) input system in your web applications. The plugin allows users to enter OTP codes with convenience and provides customizable options to adapt the OTP input to your design.

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Installation](#installation)
  - [npm](#npm)
  - [CDN](#cdn)
  - [Local Download](#local-download)
- [Usage](#usage)
- [Examples](#examples)
  - [Example 1: Basic Usage](#example-1-basic-usage)
  - [Example 2: Customized OTP Input](#example-2-customized-otp-input)
  - [Example 3: Using Options as an Object](#example-3-using-options-as-an-object)
- [Options](#options)
- [Methods](#methods)
- [Demo](#demo)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Features

- Simple and intuitive OTP input system.
- Customize the number of OTP input fields.
- Allow only numeric input or alphanumeric input (configurable).
- Easily integrate with your existing jQuery projects.
- Minimal and lightweight design.



## Requirements

To use the OTP Designer jQuery Plugin, you need the following dependencies:
- jQuery (minimum version 3.7.0)
You can include these dependencies in your HTML file via CDN or by downloading the files locally.

## Installation
To use the OTP Designer jQuery Plugin in your project, you can include the necessary files via npm, CDN or by downloading the files locally.
### npm
You can install OTP-designer-jquery via npm:
```bash
  npm install otp-designer-jquery
```


### CDN
You can also include OTP-designer-jquery directly from a CDN by adding the following script tag to your HTML file:

```HTML
    <script src="https://cdn.jsdelivr.net/gh/HichemTab-tech/OTP-designer-jquery@1.0.0/dist/otpdesigner.min.js"></script>
```
    
### Local Download
If you prefer to host the library locally, you can download the latest release from the source code and include it in your project:

```HTML
  <script src="path/to/otpdesigner.min.js"></script>
```
## Usage

To use the OTP Designer jQuery Plugin, follow these steps:
- Include the necessary scripts and stylesheets as described in the installation section.
- Create a target element in your HTML to initialize the OTP designer. You can use either options as an object or attributes to customize the OTP designer:
```HTML
<!-- Option 1: Using attributes -->
<div id="otp_target" data-input-classes="some-class text-danger" data-otp-length="4"></div>

<!-- Option 2: Using options as an object -->
<div id="otp_target"></div>

```
- Initialize the OTP designer on the target element using jQuery:

```javascript
// Option 1: Using attributes
$('#otp_target').otpdesigner({
  typingDone: function (code) {
    console.log('Entered OTP code: ' + code);
  },
});

// Option 2: Using options as an object
$('#otp_target').otpdesigner({
  typingDone: function (code) {
    console.log('Entered OTP code: ' + code);
  },
  length: 4,
  onlyNumbers: false,
  inputClasses: 'some-class text-danger',
});

```

- Customize the options as needed.

## Examples

### Example 1: Basic Usage

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OTP Designer jQuery Plugin - Basic Usage</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <div class="card mt-5 p-3">
      <h1 class="h1">OTP Designer jQuery Plugin - Basic Usage</h1>
      <div id="otp_target"></div>
      <button class="btn btn-primary mt-3" id="ok">OK</button>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
  <script src="dist/otpdesigner.js"></script>
  <script>
    $(document).ready(function() {
      $('#otp_target').otpdesigner({
        typingDone: function (code) {
          console.log('Entered OTP code: ' + code);
        },
      });

      $('#ok').on('click', function () {
        let result = $('#otp_target').otpdesigner('code');
        if (result.done) {
          alert('Entered OTP code: ' + result.code);
        } else {
          alert('Typing incomplete!');
        }
      });
    });
  </script>
</body>
</html>

```

### Example 2: Customized OTP Input

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OTP Designer jQuery Plugin - Customized OTP Input</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <div class="card mt-5 p-3">
      <h1 class="h1">OTP Designer jQuery Plugin - Customized OTP Input</h1>
      <div id="otp_target" data-input-classes="form-control-lg" data-otp-length="8"></div>
      <button class="btn btn-primary mt-3" id="ok">OK</button>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
  <script src="dist/otpdesigner.js"></script>
  <script>
    $(document).ready(function() {
      $('#otp_target').otpdesigner({
        typingDone: function (code) {
          console.log('Entered OTP code: ' + code);
        },
      });

      $('#ok').on('click', function () {
        let result = $('#otp_target').otpdesigner('code');
        if (result.done) {
          alert('Entered OTP code: ' + result.code);
        } else {
          alert('Typing incomplete!');
        }
      });
    });
  </script>
</body>
</html>

```

### Example 3: Using Options as an Object

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OTP Designer jQuery Plugin - Using Options as an Object</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <div class="card mt-5 p-3">
      <h1 class="h1">OTP Designer jQuery Plugin - Using Options as an Object</h1>
      <div id="otp_target"></div>
      <button class="btn btn-primary mt-3" id="ok">OK</button>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
  <script src="dist/otpdesigner.js"></script>
  <script>
    $(document).ready(function() {
      $('#otp_target').otpdesigner({
        typingDone: function (code) {
          console.log('Entered OTP code: ' + code);
        },
        length: 4,
        onlyNumbers: false,
        inputClasses: 'some-class text-danger',
      });

      $('#ok').on('click', function () {
        let result = $('#otp_target').otpdesigner('code');
        if (result.done) {
          alert('Entered OTP code: ' + result.code);
        } else {
          alert('Typing incomplete!');
        }
      });
    });
  </script>
</body>
</html>
```
In these examples, the OTP designer is initialized inside the otp_target element with different configurations. The first example demonstrates the basic usage without custom options, while the second example shows a customized OTP input with larger input fields and a length of 8 digits. The third example demonstrates using options as an object to customize the OTP input.
## Options

| **Option**                | **Type** | **Default**  | **Description**                                                                  |
|---------------------------|----------|--------------|----------------------------------------------------------------------------------|
| **`length`**              | Integer  | 6            | The number of OTP input fields.                                                  |
| **`onluNumbers`**         | Boolean  | false        | Allow only numeric input.                                                        |
| **`inputClasses`**        | String   | ""           | Additional CSS classes to apply to the OTP input fields.                         |
| **`inputsParentClasses`** | String   | ""           | Additional CSS classes to apply to the parent container of the OTP input fields. |
| **`typingDone`**          | Function | (code) => {} | A callback function executed when the user completes typing the OTP.             |

## Methods
The OTP Designer jQuery Plugin provides the following method:
- **`code`**: Get the current OTP code entered by the user. Returns an object with properties:

| **Property** | **Type** | **Description**                                         |
|--------------|----------|---------------------------------------------------------|
| **`done`**   | Boolean  | A boolean indicating if the OTP code entry is complete. |
| **`code`**   | String   | The entered OTP code.                                   |

## Demo

Here's a Demo example : 

[Demo](https://hichemtab-tech.github.io/OTP-designer-jquery)

## Contributing

Contributions are always welcome!

If you have any ideas, improvements, or bug fixes, please [open an issue](https://github.com/HichemTab-tech/OTP-designer-jquery/issues) or [submit a pull request](https://github.com/HichemTab-tech/OTP-designer-jquery/pulls).

## Author

- [@HichemTab-tech](https://www.github.com/HichemTab-tech)

## License

[MIT](https://github.com/HichemTab-tech/OTP-designer-jquery/blob/master/LICENSE)
