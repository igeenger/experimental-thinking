echo "--- build server ---"
  cd server
  npm i
  npm run build
  cp ./package.json ../build/package.json
  cp ./path.json ../build/tsconfig.json
  cd ..

echo "--- build client ---"
  cd client
  npm i
  npm run build
  cd ..

echo "--- install modules ---"
  cd build
  npm i
