---
sidebar_position: 2
---
# PHP (Laravel)

You can add a simple command to get your language files.

## Create the command

Go to your bash and submit this call `php artisan make:command FetchAndProcessLangFiles` to create the file.

## File contents

Copy the following code into the `App/Console/Commands/FetchAndProcessLangFiles.php` file:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use ZipArchive;
use File;

class FetchAndProcessLangFiles extends Command
{
    protected $signature = 'lang:fetch';
    protected $description = 'Fetch language files, extract and move them to the resources/lang directory';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->handleLangFolder();

        $this->getData();
    }

    protected function handleLangFolder()
    {
        if (!File::exists(base_path('resources/lang'))) {
            File::makeDirectory(base_path('resources/lang'), 0755, true);
            $this->info('Created directory: resources/lang');
        }
    }

    protected function getData()
    {
        try {
            $response = Http::post('http://localhost/language-key/export', [
                'project_id' => 27,
                'languages' => json_encode(['de_DE', 'en_US']),
                'format' => 'json',
            ]);

            if ($response->successful()) {
                $zipUrl = $response->json();
                $this->downloadAndExtractZip($zipUrl, base_path('resources/lang'));
            } else {
                $this->error('Failed to fetch data from server');
            }
        } catch (\Exception $e) {
            $this->error('Error fetching data: ' . $e->getMessage());
        }
    }

    protected function downloadAndExtractZip($url, $destFolder)
    {
        try {
            $zipFile = $destFolder . '/temp.zip';
            $response = Http::get($url);

            if ($response->successful()) {
                File::put($zipFile, $response->body());
                $this->extractZip($zipFile, $destFolder);
                File::delete($zipFile);
            } else {
                $this->error('Failed to download ZIP file');
            }
        } catch (\Exception $e) {
            $this->error('Error downloading or extracting ZIP: ' . $e->getMessage());
        }
    }

    protected function extractZip($zipFile, $destFolder)
    {
        $zip = new ZipArchive;

        if ($zip->open($zipFile) === true) {
            $tempFolder = $destFolder . '/temp_unzip';
            File::makeDirectory($tempFolder, 0755, true);

            $zip->extractTo($tempFolder);
            $zip->close();

            $this->moveFilesFromSubfolder($tempFolder, $destFolder);
            File::deleteDirectory($tempFolder);
        } else {
            $this->error('Failed to open ZIP file');
        }
    }

    protected function moveFilesFromSubfolder($srcFolder, $destFolder)
    {
        $folders = File::directories($srcFolder);
        if (count($folders) > 0) {
            $subfolderPath = $folders[0];
            $files = File::files($subfolderPath);

            foreach ($files as $file) {
                $fileName = $file->getFilename();
                File::move($file->getRealPath(), $destFolder . '/' . $fileName);
                $this->info('Moved file: ' . $fileName . ' to ' . $destFolder);
            }
        }
    }
}
```

### Adjust API Call Parameters

Before running the script, make sure to adjust the parameters in the API call according to your project needs. Specifically, you will need to modify the `format`, `project_id` and the list of `languages` in the getData function:


## Run the script

You can now run the script with the following command:
`php artisan lang:fetch`