$files = Get-ChildItem -Path "app" -Include *.jsx, *.js -Recurse
foreach ($file in $files) {
    if ($file.Name -ne "api.js") {
        $content = Get-Content -LiteralPath $file.FullName
        if ($content -match 'process\.env\.NEXT_PUBLIC_BACKEND_BASE_URL' -and -not ($content -match 'process\.env\.BACKEND_URL \|\| process\.env\.NEXT_PUBLIC_BACKEND_BASE_URL')) {
            $newContent = $content -replace 'process\.env\.NEXT_PUBLIC_BACKEND_BASE_URL', '(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)'
            Set-Content -LiteralPath $file.FullName -Value $newContent
            Write-Host "Fixed: $($file.FullName)"
        }
    }
}
