Remove-Item -Path "package.json" -ErrorAction SilentlyContinue
npx -y create-next-app@latest demo --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
Move-Item -Path "demo\*" -Destination "." -Force
Get-ChildItem -Path "demo" -Hidden | Move-Item -Destination "." -Force
Remove-Item -Path "demo" -Recurse -Force
npm install react-inner-image-zoom react-player
