# Define paths
$sourceFolder = "G:\c_h_g-frontend\.next"
$baseDestination = "\\192.168.0.102\share\Upload-Logs\centum-health-tracker\frontend"
$winrarPath = "C:\Program Files\WinRAR\WinRAR.exe"

# Generate timestamp for zip name and folder structure
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$dateFolder = Get-Date -Format "dd-MM-yyyy"  # 👈 dd-MM-yyyy format
$monthName = (Get-Date).ToString("MMMM").ToLower()
$zipName = "frontend_$timestamp.zip"
$tempZipPath = "$env:TEMP\$zipName"

# Final path: \frontend\august\01-08-2025\upload
$finalDestination = Join-Path $baseDestination -ChildPath "$monthName\$dateFolder\upload"

# Ensure folder exists
if (-Not (Test-Path $finalDestination)) {
    New-Item -ItemType Directory -Path $finalDestination -Force | Out-Null
}

# Prepare WinRAR compression
$parentPath = Split-Path $sourceFolder -Parent
$folderName = Split-Path $sourceFolder -Leaf
$rarArgs = "a -afzip `"$tempZipPath`" `"$folderName`""

# Execute WinRAR in correct working directory
Start-Process -FilePath $winrarPath -ArgumentList $rarArgs -WorkingDirectory $parentPath -Wait -NoNewWindow

# Check if zip was created
if (-Not (Test-Path $tempZipPath)) {
    Write-Host "`n❌ Zip file not created!"
    Read-Host "Press Enter to exit"
    exit 1
}

# Move zip to final destination
Copy-Item -Path $tempZipPath -Destination $finalDestination -Force
Write-Host "`n✅ Zip successfully created and moved to: $finalDestination"
Read-Host "Press Enter to exit"
