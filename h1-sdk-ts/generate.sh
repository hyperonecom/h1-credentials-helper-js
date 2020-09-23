openapi-generator generate -i .\\openapi.json -c config.yaml -g typescript-axios
yarn add -D typedoc typedoc-plugin-markdown # todo: pin version
yarn typedoc --plugin typedoc-plugin-markdown
yarn build