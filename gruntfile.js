/// <binding AfterBuild='devAfterBuild' />

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

    grunt.registerTask('devAfterBuild', ["sync:default", "dtsGenerator:default"]);
    grunt.registerTask('devWatch', ["devAfterBuild", "watch:default"]);

    grunt.initConfig({
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
            //default: {
            //    files: [{
            //        cwd: "artifacts/dev",
            //        src: ["**/*"],
            //        dest: "wwwroot/libs",
            //    }, {
            //        cwd: "src/",
            //        src: ["**/content/**/*", "**/templates/**/*"],
            //        dest: "wwwroot/libs"
            //    }
            //    ],
            //    pretend: false,
            //    verbose: true
            //},
            default: {
                files: [{
                    cwd: "src",
                    src: ["**/*.d.ts"],
                    dest: "dist/typings",
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
                main: 'artifacts/dev/index',
                externs: ["./koExtensions/knockoutExtensions.d.ts", "./utils/utils.d.ts"]
                
            },
            default: {
                src: ['artifacts/dev/**/*.d.ts']
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};