/// <binding AfterBuild='devAfterBuild' ProjectOpened='initProject' />

/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('dts-generator');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-tsd');

    grunt.registerTask("initProject", ["clean:dev","bower:install", "tsd:refresh"]);
    grunt.registerTask('devAfterBuild', ["sync:default", "dtsGenerator:default"]);
    grunt.registerTask('devWatch', ["devAfterBuild", "watch:default"]);
    grunt.registerTask("devBuildAndTest", ["devAfterBuild", "jasmine:tests"]);
    grunt.registerTask("distBuild", ["initProject", "ts:distBuild", "devBuildAndTest"]);

    grunt.initConfig({
        ts: {
            distBuild : {
                tsconfig: true,
                options: {
                    fast: "never",
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: "wwwroot/libs",
                    
                }
            }
        },
        watch: { /* when typescritp files are compiled with vs, then sync to wwwroot */
            default: {
                files: ["artifacts/dev/**/*"],
                tasks: ["devAfterBuild"],
                options: {
                    debounceDelay: 100,
                },
            },
        },
        clean: {
            dev: ["artifacts", "dist"]
        },
        sync: {
            default: {
                files: [{
                    cwd: "src",
                    src: ["**/*.d.ts"],
                    dest: "dist/typings",
                },
                {
                    cwd: "src",
                    src: ["**/*.less", "**/*.html"],
                    dest: "dist/src",
                },
                {
                    cwd: "artifacts/dev",
                    src: ["**/*.js"],
                    dest: "dist/src",
                }
                ],
                pretend: false,
                verbose: true
            }
        },
        dtsGenerator: {
            options: {
                name: 'si-portal-framework',
                baseDir: 'artifacts/dev',
                out: 'dist/typings/si-portal-framework.d.ts',
             //   main: 'si-portal-framework/index',
                externs: ["./koExtensions/knockoutExtensions.d.ts", "./utils/utils.d.ts"]

            },
            default: {
                src: ['artifacts/dev/**/*.d.ts']
            }
        },
        jasmine: {
            tests: {
                src: [],
                options: {
                    specs: ['tests/**/*.js'],
                    //     vendor: "node_modules/**/*.js",
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            //   baseUrl: '.grunt/grunt-contrib-jasmine/src/main/js/'
                            paths: {
                                "si-portal-framework": "artifacts/dev"
                            }
                        }
                    }
                }
            }
        },
        tsd: {
            'refresh': {
                'options': {
                    'command': 'reinstall',
                    'latest': true,
                    'config': 'tsd.json',
                    'opts': {}
                }
            }
        },
    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};