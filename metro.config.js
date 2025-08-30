const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// To resolve Better Auth exports you'll need to enable unstable_enablePackageExports in your metro config.
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, {
  input: './app/global.css',
  inlineRem: 16,
});
