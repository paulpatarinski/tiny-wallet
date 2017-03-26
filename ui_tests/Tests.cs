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
            app.Repl();
        }

        private void TakeScreenshot(string screenshotTitle)
        {
            var screenshotFileInfo = app.Screenshot(screenshotTitle);
            var device = AppInitializer.AppConfig.phone ? "phone" : "tablet";
            var newScreenshotName = screenshotFileInfo.Name.Replace("screenshot", device);
            var newFilePath = $"{screenshotFileInfo.Directory}/{newScreenshotName}";
            screenshotFileInfo.MoveTo(newFilePath);
        }
    }
}
