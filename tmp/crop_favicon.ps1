Add-Type -AssemblyName System.Drawing
$srcPath = "e:\New folder\portfolio\public\favicon.png"
$backupPath = "e:\New folder\portfolio\public\favicon_original.png"
if (-Not (Test-Path $backupPath)) {
    Copy-Item $srcPath $backupPath -Force
}

$img = [System.Drawing.Image]::FromFile($backupPath)
$origSize = $img.Width

# Calculate the inner circle bounds that we want to keep (based on previous 1.35x scale CSS fix)
$circleSize = [math]::Round($origSize / 1.35)
$offset = [math]::Round(($origSize - $circleSize) / 2)

# Create a new bitmap of the smaller size, so the circle touches the edges
$bitmap = New-Object System.Drawing.Bitmap($circleSize, $circleSize)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Set clip to a perfect circle touching the edges of the new bitmap
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$rect = New-Object System.Drawing.Rectangle(0, 0, $circleSize, $circleSize)
$path.AddEllipse($rect)
$graphics.SetClip($path)

# Draw the original image but shifted so the center ROI aligns with the new bitmap
$graphics.DrawImage($img, -$offset, -$offset, $origSize, $origSize)

$graphics.Dispose()
$img.Dispose()

# Save it as favicon.png
$bitmap.Save($srcPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
Write-Host "Image successfully cropped to transparent circle"
