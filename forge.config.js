const { MakerSquirrel } = require('@electron-forge/maker-squirrel');
const { MakerZIP } = require('@electron-forge/maker-zip');
const { MakerRpm } = require('@electron-forge/maker-rpm');
const { MakerDeb } = require('@electron-forge/maker-deb');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
    packagerConfig: {
        asar: true,
        // Points to build/icon.png and build/icon.ico automatically
        icon: './build/icon' 
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            name: 'LinkstateBrowser',
            // Brands the actual Windows .exe installer
            setupIcon: './build/icon.ico',
            // Tells Windows Installer to register the .onestate extension
            fileAssociations: [
                {
                    ext: 'onestate',
                    name: 'OneState Website',
                    description: 'Portable OneState Website',
                    icon: './build/icon.ico'
                }
            ]
        }),
        new MakerZIP({}, ['darwin']),
        new MakerRpm({}),
        new MakerDeb({})
    ],
    plugins: [
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true
        })
    ]
};