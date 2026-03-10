Add-Type -AssemblyName System.Drawing

$srcPath = "e:\New folder\portfolio\public\favicon.png"
$destPath = "e:\New folder\portfolio\public\favicon-dark.png"

$img = [System.Drawing.Bitmap]::new($srcPath)
$newImg = [System.Drawing.Bitmap]::new($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $img.Width; $x++) {
    for ($y = 0; $y -lt $img.Height; $y++) {
        $pixel = $img.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            # Check if pixel is dark (black/near-black) - threshold of 80
            if ($pixel.R -lt 80 -and $pixel.G -lt 80 -and $pixel.B -lt 80) {
                # Replace dark pixels with white, keeping alpha
                $newColor = [System.Drawing.Color]::FromArgb($pixel.A, 255, 255, 255)
                $newImg.SetPixel($x, $y, $newColor)
            } else {
                # Keep other colored pixels as-is
                $newImg.SetPixel($x, $y, $pixel)
            }
        } else {
            # Keep transparent pixels transparent
            $newColor = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
            $newImg.SetPixel($x, $y, $newColor)
        }
    }
}

$newImg.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$newImg.Dispose()
Write-Host "Dark mode logo saved to $destPath"
