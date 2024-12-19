Add-Type -AssemblyName System.Web
$ProgressPreference = 'SilentlyContinue'

Write-Output "Attempting to automatically find Player.log."
$logLocation = [Environment]::GetFolderPath("ApplicationData") + "\..\LocalLow\SunBorn\EXILIUM\Player.log"
$gachaRecordUrl = ""
$accessToken = ""
$uid = ""
$method = "automatic"

if (-Not (Test-Path $logLocation)) {
    Write-Output "Unable to automatically find Player.log."
    Write-Output 'You can find the Player.log file at User\AppData\LocalLow\SunBorn\EXILIUM\Player.log.'
    $path = (Read-Host "Player.log path: ").replace("\Player.log", "") + "\Player.log"

    if (Test-Path $path) {
        $logLocation = $path
        $method = "manual"
    } else {
        Write-Output "Invalid path. please try again."
    }
}

if (Test-Path $logLocation) {
    Write-Output "Finding gacha log data."
    $logLines = Get-Content ($logLocation)

    for ($i = $logLines.Length - 1; $i -ge 0; $i--) {
        $logLine = $logLines[$i]

        if ($logLine.StartsWith("Response = ")) {
            if ($logLine.Contains("access_token")) {
                $response = $logLine.Replace("Response = ", "") | ConvertFrom-Json

                $accessToken = $response.data.access_token
                $uid = $response.data.uid
            } elseif ($logLine.Contains("gacha_record_url")) {
                $gachaRecordUrl = (($logLine.Replace("Response = ", "") -split "gacha_record_url" | select-object -index 1) -split '"}' | select-object -index 0).Substring(7)
            }
        }
    }

    if ($accessToken -And $uid -And $gachaRecordUrl) {
        $data = @{
            gachaRecordUrl = $gachaRecordUrl
            accessToken = $accessToken
            uid = $uid
            method = $method
        } | ConvertTo-Json

        Set-Clipboard $data

        Write-Output "Successfully found and copied Gacha Data to clipboard."
        Write-Output "Please enter it at the import page."
    } else {
        Write-Output "Unable to find access_token, UID, or gacha_log_url, please try again."
    }
}