@echo off
cd /d "%~dp0public"
if not exist assets mkdir assets
cd assets
echo Downloading your images from Figma...
set FAIL=0
curl -fsSL -o "hero-art.png" "https://www.figma.com/api/mcp/asset/b4a6623c-4df6-498d-84c4-60dcd4751c3d.png" || set FAIL=1
curl -fsSL -o "hero-logo.png" "https://www.figma.com/api/mcp/asset/082b2246-f694-4a2b-abba-1e7ee824bec3.png" || set FAIL=1
curl -fsSL -o "lead-abiola.png" "https://www.figma.com/api/mcp/asset/d95957cd-3d46-4083-ae2d-34e10bdb8706.png" || set FAIL=1
curl -fsSL -o "lead-salome.png" "https://www.figma.com/api/mcp/asset/d83d5b22-cc47-4b32-b155-1b8046c0c298.png" || set FAIL=1
curl -fsSL -o "lead-goodnews.png" "https://www.figma.com/api/mcp/asset/e75472f3-1ba1-4452-8f96-72dc0118083a.png" || set FAIL=1
curl -fsSL -o "lead-dreysongz.png" "https://www.figma.com/api/mcp/asset/d535b82b-ca69-4e63-983e-56e6e97b25da.png" || set FAIL=1
curl -fsSL -o "lead-israel.png" "https://www.figma.com/api/mcp/asset/39807c9e-444d-4729-9977-0c3666528adb.png" || set FAIL=1
curl -fsSL -o "lead-people.png" "https://www.figma.com/api/mcp/asset/10d3dae5-0305-4ab6-8d81-84095a5c137e.png" || set FAIL=1
curl -fsSL -o "firm-logo-footer.png" "https://www.figma.com/api/mcp/asset/cf47a9e6-095f-41a6-a5da-6886236abe39.png" || set FAIL=1
curl -fsSL -o "m1.png" "https://www.figma.com/api/mcp/asset/ed0a965a-f393-4a78-a471-5f439309fbaa.png" || set FAIL=1
curl -fsSL -o "m2.png" "https://www.figma.com/api/mcp/asset/2cfbb554-f898-44a0-b86a-64c640f05bb8.png" || set FAIL=1
curl -fsSL -o "m3.png" "https://www.figma.com/api/mcp/asset/fb375ba5-066a-4d6b-b962-507444de7007.png" || set FAIL=1
curl -fsSL -o "m4.png" "https://www.figma.com/api/mcp/asset/fe17e37b-b68a-4591-8671-ddded2d48fca.png" || set FAIL=1
curl -fsSL -o "m5.png" "https://www.figma.com/api/mcp/asset/0cff3741-75da-465e-a2eb-1d3d795b1bd4.png" || set FAIL=1
curl -fsSL -o "m6.png" "https://www.figma.com/api/mcp/asset/3f144b2f-1033-48a5-af42-8cae55a07580.png" || set FAIL=1
curl -fsSL -o "m7.png" "https://www.figma.com/api/mcp/asset/75c38437-1661-44af-8a98-28fbcc344baf.png" || set FAIL=1
curl -fsSL -o "m8.png" "https://www.figma.com/api/mcp/asset/f7e9e608-65d8-480a-b381-bf70af9195d6.png" || set FAIL=1
curl -fsSL -o "m9.png" "https://www.figma.com/api/mcp/asset/213cec38-c734-4cfb-ae8b-4885b8951f27.png" || set FAIL=1
curl -fsSL -o "m10.png" "https://www.figma.com/api/mcp/asset/6bda0cd1-6f3a-4535-b86a-cc4ed296872c.png" || set FAIL=1
curl -fsSL -o "nav-logo.svg" "https://www.figma.com/api/mcp/asset/4e640454-65da-4fa1-bd75-c4eb8725f6fc.svg" || set FAIL=1
curl -fsSL -o "nav-logo-light.svg" "https://www.figma.com/api/mcp/asset/34e475c0-e812-4e88-ab1b-03dd357bfef1.svg" || set FAIL=1
curl -fsSL -o "icon-menu.svg" "https://www.figma.com/api/mcp/asset/92a54530-f53c-4925-9183-f9f24a56fd85.svg" || set FAIL=1
curl -fsSL -o "icon-directions.svg" "https://www.figma.com/api/mcp/asset/4da4c3c5-3cdf-4068-b13d-619025347490.svg" || set FAIL=1
curl -fsSL -o "icon-arrow-dark.svg" "https://www.figma.com/api/mcp/asset/43aabaeb-a8d7-4f52-9508-4b0e60c6470a.svg" || set FAIL=1
curl -fsSL -o "icon-arrow-light.svg" "https://www.figma.com/api/mcp/asset/d693b7c8-82df-4935-bfe3-3d573ce301b2.svg" || set FAIL=1
curl -fsSL -o "icon-tab.svg" "https://www.figma.com/api/mcp/asset/4fb15a6d-eb8a-4ccc-82c0-21d4399403af.svg" || set FAIL=1
curl -fsSL -o "icon-tab-active.svg" "https://www.figma.com/api/mcp/asset/9871ec9b-bb2c-4eeb-95c9-e30e8f8fcdb9.svg" || set FAIL=1
curl -fsSL -o "icon-instagram.svg" "https://www.figma.com/api/mcp/asset/04bac53b-62da-407a-8d9f-5488da873f2e.svg" || set FAIL=1
curl -fsSL -o "icon-youtube.svg" "https://www.figma.com/api/mcp/asset/e512e5ae-81e4-43e7-a822-e9d195c0e55e.svg" || set FAIL=1
curl -fsSL -o "icon-arrow-small.svg" "https://www.figma.com/api/mcp/asset/897ef87f-0e91-48d1-9ea1-8d623b654ad2.svg" || set FAIL=1
curl -fsSL -o "icon-close.svg" "https://www.figma.com/api/mcp/asset/b8fcaad4-1320-4739-ab94-6c1c640858af.svg" || set FAIL=1
echo.
if "%FAIL%"=="0" (echo DONE. All images downloaded. You can close this window.) else (echo Some images could not be downloaded. Ask Claude for fresh image links.)
pause
