
# S-innovations Portal Framework (siPortal)

Since I been creating a few SPA portals over the past years and every time starting a new project I copy / paste in the same core files that I always use, I decided to try create a generic framework for creating Management Portals with Typescript. The target audience is .NET / Visual studio developers that are used to use VS as their IDE and would like to continue using Visual Studio for their frontend JavaScript development using typescript. 

I am familiar with most of the frontend package repositories like NPM and Bower, and build tools like gulp and grunt. These tools will be used and they are also at a point where I find them mature enough to be working nicely inside visual studio.

I hope that this project can be inspiration for working with Typescript and creating web portals for fellow .net developers who have to create web portals. 

The first three goals of the project is to bring in the generic knockout extensions I always use as well as keeping this readme informative - and to make a nice project structure and work environment within VS 2015.


*Disclaimers*: 
1. I do not work for Microsoft and this has nothing to do with their azure portal. I only used a small part of their layout as an example in the demo project.
2. The content of this readme is not yet structured, I just brain dumped some content to get started. 
3. The work in the repository is not tested for consumption - give me a few more weeks. I believe that the content is useful for others at the current state so here it is.



## Project structure

```
.
+-- tsconfig.json
+-- tsd.json
+-- project.json
+-- package.json
+-- bower.json
+-- typings/        (TSD outputted typescript definition files used for development in source) 
|   +--             
+-- src/            (The folder of all active development. All files here are editable.)
+-- dist/           (The generated folder that can be consumed when importing the respository with bower)
|   +-- src/        (The compiled typescript files, templates and less files - for doing custom bundlings of single JavaScript files. Note that each class, function and modules are created in each own file using AMD modules)
|   +-- typings/    (The folder with all .d.ts files needed for typescript development)       
+-- artifacts/      (The generated folder which build artifacts are put in)
```

## Separation of concerns
This framework is intended to give the tools needed to work with the design principle of separation of concerns. Meaning it advertise the concepts of Model, View and View Model by adding a concepts of Layouts. We know what a Model is, as well as what a View is. The view model is also known to most, but in my words it is the components that takes a model and provide some extended behaviors on top of it for the view to communicate with. In practice we can see this as, the model being the response coming from a JSON web service, the view model being the extended model that in this case uses KnockoutJS to create observable properties such the view can interact with the model and possible update it. The view is just html markup, in these cases put in separate files and loaded with a tool called RequireJS and its text plugin.

What this framework is added to the above definition of MVVM, is the concept of a Layout - a Layouts concern is about binding together a View Model with a Template and can provide extended functionality that has only to do with rendering. In normal MVVM, the functionality in a layout would fit under the View Model. 


### Examples:
From the [demo projects](https://github.com/s-innovations/SiPortalFrameworkDemos) one can see the Azure Portal demo which has implemented the Sidebar used in the new azure portal.

The index.html page will have a [very empty body](https://github.com/s-innovations/SiPortalFrameworkDemos/blob/master/AzurePortal/wwwroot/index.html#L37), which is one of the goals of the library to move layouts into code such one can compose a layout using JavaScript and even possible later from a JSON markup.
```
<body class="si-theme-dark">
    <!-- koLayout: $data -->
</body>
```
which will use `ko.applyBindings` and the binding handler extension (koLayout)[https://github.com/s-innovations/S-Innovations.PortalFramework/blob/master/src/koExtensions/koLayout.ts#L40] that is part of this library. The layout concept is made to work nicely with knockout and the custom koLayout binding handler, moving the template binding options into the layout code in contrast to doing a normal knockout template binding in html.

The root layout of the Azure Portal Demo looks like (this)[https://github.com/s-innovations/SiPortalFrameworkDemos/blob/master/AzurePortal/src/azure-portal/AzurePortalLayout.ts]
```
class AzurePortalLayout extends WebContainerLayout {
    constructor(opt?) {
        super({
            layout: new SIStackLayout({
                classes : ["portal-main"],
                orientation: SIStackLayoutOrientation.horizontal,
                elements: [new AzurePortalSideBarLayout(
                    {
                        collapsed: false,
                        favorites: {
                            favorites: [
                                { opensExternal: true, label: "Test 1", uri: "#/Test1" },
                                { opensExternal: true, label: "Test 2", uri: "#/Test2" },
                                { opensExternal: true, label: "Test 3", uri: "#/Test3" },
                                { opensExternal: true, label: "Test 4", uri: "#/Test4" },
                                { opensExternal: true, label: "Test 5", uri: "#/Test5" },
                            ]
                        }
                    }
                )]
            })            
        });           
    }
}
```
which will generate the following layout with the sidebar. 
![SideBar Layout](https://raw.githubusercontent.com/s-innovations/S-Innovations.PortalFramework/master/docs/azure_portal_sidebar.png "Sidebar Layout")

One should notice how the layout reuses a generic horizontal stack layout from this library - which means that the developer do not have to worry about html and css but can focus on composing the UI and leave this concern to a different developer. One of the goals in this project would be to make generic reusable layouts like the stack layout or provide the documentation for others to do so as my expertise is not UX/UI but rather a consumer of these layouts if provided to me.

#### Sidebar
You can read more about the sidebar layout in [the demo project](https://github.com/s-innovations/SiPortalFrameworkDemos/tree/master/AzurePortal/src/azure-portal/sidebar)


## Knockout
I know angular exists, and this is not an attempt to create another stack like angular. Angular takes care of everything, this library is mostly about composing a UI portal using View Models and templates and build a good foundation to build on top of, by using knockoutjs.

For architects I highly recommend the following blog post and linked video within the post : http://jbeckwith.com/2014/09/20/how-the-azure-portal-works/ since it share many of my ideas for creating a web management portal.

The siPortal project also has some cool knockout extensions that I digged up across the internet, that has been modified to use typescript. [TODO: sort out links to these and check license issues)
 

## Visual Studio 15
I am using visual studio 15 as my IDE and will provide some get started information at some point to crate a typescript project in VS2015. In Typescript 1.5 the tsconfig.json was introduced and updated further in 1.6, which is what I will use in VS2015 in contrast to the vs2013 where it was part of the vsproj file.

### Support for less
With VS 2015 Web Essential is split into multiple extensions, http://madskristensen.net/post/bundling-minification-and-client-side-compilation, you can download the Web Compiler extension from here, https://visualstudiogallery.msdn.microsoft.com/3b329021-cd7a-4a01-86fc-714c2d05bb6c, and it also has details on how to use it. But we will also take a look at how to use the grunt tools to compile less.

After right clicking a less file and enabling for compilation, a compilerconfig.json is added that is again manageable from the Task Runner Explore.


## Typescript and AMD modules
I been working with typescript the past 3 years and always been a big fan of AMD modules and RequireJs as my loader. It has gotten more adoption over time. The main advantages of this is that we can modularize our libraries and load on demand resources while still use build tools to compose optimized distributions of modules if needed.

## TSD (https://github.com/Definitelytyped/tsd)
tsd is a tool that you want to use to pull in definition files over nuget packages, it fits better with the common frontend project structures out there. It also creates a tsd.d.ts that has reference to all typing files included with tsd, which is nice for grunt/gulp build tools. In this project the first thing I did was to run `tsd install knockout --save`.


## Bower
Since I want knockout.js to be available for tests in this project I ran `bower install knockout --save-dev` to pull in knockout.js but only as a dev dependency. I want users of the library to decide for them self if they want to use a CDN version or local with RequireJs loaders.

I also intent to distribute this library with bower, so a few basics here will also be covert.
