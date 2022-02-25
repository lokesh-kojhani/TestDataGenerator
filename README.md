# Generating Test Data.

## Pre-Requisites:
Node.js should be installed on the machine.

## Libraries
- [casual](https://www.npmjs.com/package/casual) uses javascript properties for common generators so you don't need to use function call operator.
- [fs-extra](https://www.npmjs.com/package/fs-extra) provides support to read and write to files.

## NPM Packages

### Casual

`npm i casual`

### FS-Extra

`npm i fs-extra`

## Template

```json
    {
        "client_first_name": "first_name", // first_name is derived from Casual library
        "client_last_name": "last_name", // last_name is derived from Casual library
        "service_description": "service_description", //Custom generator
        "service_date": "date(format = 'YYYY-MM-DD')", // date(format = 'YYYY-MM-DD') is derived from Casual library
        "service_performed_by": "performed_by", // performed_by is a custom generator
        "service_amount_paid": "double(from = 1, to = 1000)", // double(from = 1, to = 1000) is derived from Casual library
        "service_amount_currency": "currency", //  custom generator
        "service_notes":"" //Edge case scenrario.

    }

```

## Settings

```json
    {
        "DataSet": 10
    }
```

## Code Execution

- Clone the code.
- First delete `TestData.json` (if exists).
- Open the terminal and go to the source code folder.
- Run `npm install`.
- Run `node main.js`.

## Results
It will generate a file named `TestData.json`.
