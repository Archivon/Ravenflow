# Script para remover arquivos .vsidx do Git
# Execute este script com o Visual Studio FECHADO

Write-Host "Removendo arquivos .vs do cache do Git..." -ForegroundColor Yellow

# Remove a pasta .vs do cache do Git
git rm -r --cached --ignore-unmatch "Aplicação/RavenFlow/.vs" 2>&1 | Out-Null

# Tenta remover o arquivo específico
$filePath = "Aplicação/RavenFlow/.vs/RavenFlow/FileContentIndex/5a43478b-249a-4e74-93e9-ccadddeb6bfc.vsidx"
git rm --cached --ignore-unmatch $filePath 2>&1 | Out-Null

Write-Host "Verificando status do Git..." -ForegroundColor Yellow
git status --short | Select-String -Pattern "\.vs" | ForEach-Object { Write-Host $_ -ForegroundColor Green }

Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "1. Se houver arquivos listados acima, faça commit: git commit -m 'Remove arquivos .vs do Git'"
Write-Host "2. Faça push: git push"
Write-Host "`nNOTA: Certifique-se de que o Visual Studio está FECHADO antes de executar este script!" -ForegroundColor Red

