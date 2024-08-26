---
sidebar_position: 5
---
# Export

You have two options for exporting data from the software: via the interface or through an API call.

## Interface
Manual Export via the Interface: In the interface, you can choose whether to export all languages or just a specific one. You can also select the export format. Currently, only the .json format is supported. If you need additional formats, please feel free to submit a feature request.

## API
Alternatively, you can perform an export through an API call. To do this, send a POST request to the URL `http://localhost:2402/language-key/export`. The following parameters need to be specified:
	- **format**: The desired format, e.g., `json`.
	- **project_id**: The ID of the project, which can be found in the URL.
	- **languages**: A list of languages to export, e.g., `["de_DE", "en_US"]`.

This flexibility allows you to customize the export process according to your needs.

