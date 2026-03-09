Add-Type -AssemblyName System.Drawing
$srcPath = "e:\New folder\portfolio\public\favicon_original.png"
$destPath = "e:\New folder\portfolio\public\favicon.png"

if (-Not (Test-Path $srcPath)) {
    Write-Host "Source image not found: $srcPath"
    exit
}

$img = [System.Drawing.Image]::FromFile($srcPath)
$width = $img.Width
$height = $img.Height

# Create a new bitmap with transparency
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Calculate a circle that fits the black part better (usually a bit smaller than the full image if there's white padding)
# We'll use 92% of the center to avoid any white slivers at the edges of the circle
$diameter = [math]::Min($width, $height) * 0.94
$x = ($width - $diameter) / 2
$y = ($height - $diameter) / 2

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$rect = New-Object System.Drawing.RectangleF($x, $y, $diameter, $diameter)
$path.AddEllipse($rect)
$graphics.SetClip($path)

# Draw original image into the clipped region
$graphics.DrawImage($img, 0, 0, $width, $height)

$graphics.Dispose()
$img.Dispose()

# Save final image
$bitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()

Write-Host "Successfully cropped logo to transparent circle: $destPath"
