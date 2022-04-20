# app

アプリケーションサービス層、REST API のエンドポイントなどを実装する
`service`, `model` 層に依存可能
ここで定義した IF を `infrastructure` 層で実装することもある
DI を駆使して、`infrastructure` 層から依存注入を行う
