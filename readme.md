
# S-innovations Portal Framework (siPortal)

Since I been creating a few SPA portals over the past years and everytime starting a new project I copy / paste in the same core files that I always use, I decided to try create a generic framework for creating Management Portals with Typescript. The target audience is .NET / Visual studio developers that are used to use VS as their IDE and would like to continue using Visual Studio for their frontend javascript development using typescript. 

I am familiar with most of the frontend package repositories like NPM andBower, and build tools like gulp and grunt. These tools will be used and they are also at a point where I find them mature enough to be working nicely inside visual studio.

I hope that this project can be inspiration for working with Typescript and creating web portals for fellow .net developers who have to create web portals. 

The first three goals of the project is to bring in the generic knockout extensions I always use aswell as keeping this readme informative - and to make a nice project structure and work environment within VS 2015.


## Knockout
I know angular exists, and this is not an attempt to create another stack like angular. Angular takes care of everything, this library is mostly about composing a UI portal using ViewModels and templates and build a good fundation to build ontop of, by using knockoutjs.

For architects I highly recomend the following blog post and linked video within the post : http://jbeckwith.com/2014/09/20/how-the-azure-portal-works/ since it share many of my ideas for creating a web management portal.

The siPortal project also has some cool knockout extensions that I digged up accross the internet, thats been modified abit to use typescript.
 

## Visual Studio 15
I am using visual studio 15 as my IDE and will provide some get started information at some point to crate a typescript project in VS2015. In Typescript 1.5 the tsconfig.json was introduced and updated further in 1.6, which is what I will use in VS2015 in contrast to the vs2013 where it was part of the vsproj file.

##Typescript and AMD modules
I been working with typescript the past 3 years and always been a big fan of AMD moduels and requirejs as my loader. Its has gotten more adorption over time. The main advantages of this is that we can modulalize our libraries and load on demand resources while still use build tools to compose optimized distributions of modules if needed.

## TSD (https://github.com/Definitelytyped/tsd)
tsd is a tool that you want to use to pull in definition files over nuget packages, it fits better with the common frontend project structures out there. It also createds a tsd.d.ts that has reference to all typing files included with tsd, which is nice for grunt/gulp build tools. In this project the first thing I did was to run `tsd install knockout --save`.


## Bower
Since I want knockout.js to be avaible for tests in this project I ran `bower install knockout --save-dev` to pull in knockout.js but only as a dev dependency. I want users of the library to dedice for them self if they want to use a CDN version or local with requirejs loaders.

I also intent to distribute this library with bower, so a few basics here will also be covert.