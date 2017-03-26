using System.IO;
using Xamarin.UITest;
using Newtonsoft.Json;

namespace ui_tests
{
    public class AppInitializer
    {
        private static Config _appConfig;
        public static Config AppConfig
        {
            get
            {
                if (_appConfig == null)
                {
                    _appConfig = ParseConfig();
                }
                return _appConfig;
            }
        }

        public static IApp StartApp(Platform platform)
        {
            if (platform == Platform.Android)
            {
                return ConfigureApp
                    .Android
                    .ApkFile(AppConfig.apk_path)
                    .EnableLocalScreenshots()
                    .StartApp();
            }

            var deviceIdentifier = AppConfig.phone ? AppConfig.iphone_identifier : AppConfig.ipad_identifier;

            return ConfigureApp
                .iOS
                .AppBundle(AppConfig.app_bundle_path)
                .DeviceIdentifier(deviceIdentifier)
                .EnableLocalScreenshots()
                .StartApp();
        }

        private static Config ParseConfig()
        {
            return JsonConvert.DeserializeObject<PackageJson>(File.ReadAllText(@"../../package.json")).config;
        }

        public class PackageJson
        {
            public Config config { get; set; }
        }

        public class Config
        {
            public string apk_path { get; set; }
            public string app_bundle_path { get; set; }
            public string iphone_identifier { get; set; }
            public string ipad_identifier { get; set; }
            public bool phone { get; set; }
        }
    }
}
