using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace SInnovations.PortalFramework
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.MinimumLevel = LogLevel.Information;
            loggerFactory.AddConsole();
            loggerFactory.AddDebug();

            // Add the platform handler to the request pipeline.
            app.UseIISPlatformHandler();

            app.UseDefaultFiles();
            // Configure the HTTP request pipeline.
            app.UseStaticFiles();

            // Add MVC to the request pipeline.

            // Add the following route for porting Web API 2 controllers.
            // routes.MapWebApiRoute("DefaultApi", "api/{controller}/{id?}");
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
