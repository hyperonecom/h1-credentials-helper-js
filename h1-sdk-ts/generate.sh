openapi-generator generate -i .\\openapi.json -c config.yaml -g javascript
yarn add -D typescript@4.0.2
yarn tsc
yarn build