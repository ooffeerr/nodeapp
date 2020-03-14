import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

const cmdFlags = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    }
]);

const loadingEnvResult = dotenv.config({
    path: `./env/${cmdFlags.env}.env`
});

if (loadingEnvResult.error) {
    throw loadingEnvResult.error;
}
else {
    console.log('env loaded succesfully');
}