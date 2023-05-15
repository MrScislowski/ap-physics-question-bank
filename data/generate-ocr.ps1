
function Generate-OCR-Text-Using-Tesseract {
  $imageFiles = Get-ChildItem .\public\images\*.png
  foreach ($image in $imageFiles) {
    if ($image.Name -match "([0-9][0-9][B]?Q[1-9][a-z]?).png") {
      $baseName =  $Matches[1]
      C:\Users\13167\Local\tesseract\tesseract.exe ".\public\images\$($image.Name)" ".\data\ocr\$baseName" -l eng+equ --psm 4 
    }
  }
}

# Generate-OCR-Text-Using-Tesseract