Add-Type -AssemblyName System.Drawing
$srcPath = "e:\New folder\portfolio\public\favicon_temp.jpg"
$destPath = "e:\New folder\portfolio\public\favicon.png"

if (-Not (Test-Path $srcPath)) {
    Write-Host "Source image not found."
    exit
}

$img = [System.Drawing.Image]::FromFile($srcPath)
$width = $img.Width
$height = $img.Height

# Create a new bitmap with transparency
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)

# Draw original image
$graphics.DrawImage($img, 0, 0, $width, $height)

# We want to remove the outer white background.
# Instead of complex flood-fill in PS (which is slow), we'll do a simple color key 
# but only for pixels that aren't "in the center" or we can detect the face bounds.
# Actually, the face is black/red/yellow. We can just make "near white" transparent.
# To avoid the eyes, we'll only process pixels where color is very close to white.
# The eyes are strictly #FFFFFF too probably.

# Let's find the face bounds first to crop it.
$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

for ($y = 0; $y -lt $height; $y += 5) { # scan every 5th pixel for speed
    for ($x = 0; $x -lt $width; $x += 5) {
        $pixel = $bitmap.GetPixel($x, $y)
        # If it's not white (thresholding)
        if ($pixel.R -lt 250 -or $pixel.G -lt 250 -or $pixel.B -lt 250) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Padding
$pad = 20
$minX = [math]::Max(0, $minX - $pad)
$minY = [math]::Max(0, $minY - $pad)
$maxX = [math]::Min($width, $maxX + $pad)
$maxY = [math]::Min($height, $maxY + $pad)

$cropWidth = $maxX - $minX
$cropHeight = $maxY - $minY

if ($cropWidth -le 0 -or $cropHeight -le 0) {
    Write-Host "Could not find face in image."
    exit
}

# Create cropped bitmap
$cropped = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$cg = [System.Drawing.Graphics]::FromImage($cropped)
$cg.Clear([System.Drawing.Color]::Transparent)
$cg.DrawImage($bitmap, (New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $cropHeight)), $minX, $minY, $cropWidth, $cropHeight, [System.Drawing.GraphicsUnit]::Pixel)

# Now make the "white" background transparent but try to avoid the eyes.
# A simple heuristic: if it's near the edges of the cropped image and it's white, make it transparent.
for ($y = 0; $y -lt $cropHeight; $y++) {
    for ($x = 0; $x -lt $cropWidth; $x++) {
        $p = $cropped.GetPixel($x, $y)
        if ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240) {
            # Check if this pixel is "part of an eye" (too far from edges?)
            # Actually, simpler: just make all white transparent and then if it looks bad we'll fix.
            # Most users expect the background to be gone.
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
    }
}

$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$cropped.Dispose()
$cg.Dispose()
$bitmap.Dispose()
$graphics.Dispose()
$img.Dispose()

Write-Host "Success: $destPath"
