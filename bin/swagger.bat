@ECHO OFF

set executable=bin\swagger-codegen-cli.jar

echo "Typescript Petstore API client (default)"
set ags=generate -i build\swagger.yaml -l typescript-fetch -o src\common\apis -c bin\swagger-config.json
java %JAVA_OPTS% -jar %executable% %ags%