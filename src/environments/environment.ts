// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    API: 'http://localhost:3003/api/',
    encryptionKey: 'ek_test_QwU8v0z1WwAzZaAQZ5supJeJxU5DzQ',
    http_timeout: 45000,
};
