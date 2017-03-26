using System;
using System.Threading;
using NUnit.Framework;
using Xamarin.UITest;

namespace ui_tests
{
    [TestFixture(Platform.Android)]
    [TestFixture(Platform.iOS)]
    public class Tests
    {
        IApp app;
        Platform platform;

        public Tests(Platform platform)
        {
            this.platform = platform;
        }

        [SetUp]
        public void BeforeEachTest()
        {
            app = AppInitializer.StartApp(platform);
        }

        [Test]
        public void Generate_App_Screenshots()
        {
            TakeScreenshot("Sample Screenshot");
        }

        private void TakeScreenshot(string screenshotTitle)
        {
            var plt = platform == Platform.Android ? "android" : "ios";
            var screenshotFileInfo = app.Screenshot(screenshotTitle);
            var device = AppInitializer.AppConfig.phone ? "phone" : "tablet";
            var newScreenshotName = screenshotFileInfo.Name.Replace("screenshot", device);
            var newFilePath = $"{screenshotFileInfo.Directory}/{plt}-{newScreenshotName}";
            screenshotFileInfo.MoveTo(newFilePath);
        }
    }
}
