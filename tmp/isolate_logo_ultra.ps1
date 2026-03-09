Add-Type -AssemblyName System.Drawing
$srcPath = "e:\New folder\portfolio\public\favicon_temp.jpg"
$destPath = "e:\New folder\portfolio\public\favicon.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$bitmap = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.DrawImage($img, 0, 0, $img.Width, $img.Height)

# Find the logo bounds by looking for Red, Yellow, or Black (not white/light grey)
$minX = $bitmap.Width
$maxX = 0
$minY = $bitmap.Height
$maxY = 0

for ($y = 0; $y -lt $bitmap.Height; $y++) {
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
        $p = $bitmap.GetPixel($x, $y)
        # Check for darker/colored pixels (Red, Yellow, Black)
        # Logo has strong colors: Red (~230, 40, 40), Yellow (~250, 200, 40), Black (~0,0,0)
        # The background is transparent-grid or white.
        # We also need to ignore the vertical black bars if they exist at the corners.
        # Let's look for pixels that are colored or solid black.
        
        $isColored = ($p.R -lt 240 -or $p.G -lt 240 -or $p.B -lt 240)
        
        # Heuristic: exclude pixels that are too close to the very left/right edge if they are just black vertical lines
        $isEdgeBar = ($x -lt ($bitmap.Width * 0.1) -or $x -gt ($bitmap.Width * 0.9))
        
        if ($isColored -and -not $isEdgeBar) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add tiny padding
$pad = 5
$minX = [math]::Max(0, $minX - $pad)
$minY = [math]::Max(0, $minY - $pad)
$maxX = [math]::Min($bitmap.Width, $maxX + $pad)
$maxY = [math]::Min($bitmap.Height, $maxY + $pad)

$w = $maxX - $minX
$h = $maxY - $minY

if ($w -le 0 -or $h -le 0) {
    Write-Host "Failed to find logo. Reverting to basic crop."
    $minX = 0; $minY = 0; $w = $bitmap.Width; $h = $bitmap.Height
}

# Create final cropped bitmap
$final = New-Object System.Drawing.Bitmap($w, $h)
$fg = [System.Drawing.Graphics]::FromImage($final)
$fg.Clear([System.Drawing.Color]::Transparent)
$fg.DrawImage($bitmap, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $minX, $minY, $w, $h, [System.Drawing.GraphicsUnit]::Pixel)

# Set all white pixels to transparent
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $final.GetPixel($x, $y)
        if ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240) {
            $final.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
    }
}

$final.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$final.Dispose(); $fg.Dispose(); $bitmap.Dispose(); $g.Dispose(); $img.Dispose()
Write-Host "Logo Isolated Successfully: $destPath ($w x $h)"
