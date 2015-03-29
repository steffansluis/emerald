module.exports = ( grunt ) ->
  srcs = [
    'emerald'

    'factory'
    'utilities'

    'vector'

    'abstract_fn'
    'constant'
    'sum_fn'
    'difference_fn'
    'product_fn'
    'rational_fn'
    'power_fn'
  ]

  # Coverage thresholds
  thresholds =
    lines: 40
    # statements: 40
    # branches: 40
    # functions: 40


  # This functions makes the config shorter and clearer later on.
  # It just returns the type specific coverage config
  coverage = ( type, optionsRef ) ->
    optionsRef.template = require('grunt-template-jasmine-istanbul')
    optionsRef.templateOptions =
      coverage: 'stat/coverage/coverage.json'
      thresholds: thresholds
      report:
        type: type
        options:
          dir: "stat/coverage/#{type}"

    return optionsRef


  # Configure all the tasks!

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      default:
        options:
          sourceMap: true
        files: [
          expand: true
          cwd: 'src'
          src: srcs.map ( src ) -> src + '.coffee'
          dest: 'dist'
          ext: '.js'
        ]

      spec:
        # options:
        #   sourceMap: true
        files: [
          expand: true
          cwd: 'spec'
          src: ['**/*.coffee']
          dest: 'build/spec'
          ext: '.js'
        ]

    browserify:
      default:
        files: 'dist/emerald.browser.js': 'dist/emerald.js'
        options:
          sourceMap: true
          browserifyOptions:
            standalone: 'Emerald'

      istanbul:
        files: 'build/spec/sonic.browser.js': 'dist/emerald.js'
        options:
          sourceMap: true
          transform: [require('browserify-istanbul')]
          browserifyOptions:
            standalone: 'Emerald'

    jasmine:
      default:
        src:  ['dist/emerald.browser.js']
        options:
          keepRunner: true
          specs: 'build/spec/**/*.js'
      lcovonly:
        src:  ['build/spec/emerald.browser.js']
        options: (coverage 'lcovonly',
          keepRunner: true
          specs: 'build/spec/**/*.js'
        )
      html:
        src: ['build/spec/emerald.browser.js']
        options: (coverage 'html',
          specs: 'build/spec/**/*.js'
        )

    clean:
      build: ['build']

    watch:
      dist:
        files: ['src/**/*.coffee']
        tasks: ['coffee:dist']
      spec:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['spec']

    codo:
      files: ['src/**/*.coffee']

  # grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-codo'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'dist',    ['coffee', 'browserify:default']
  grunt.registerTask 'spec',    ['clean', 'dist', 'coffee:spec' ,'jasmine:default']
  grunt.registerTask 'test',    ['spec', 'browserify:istanbul' ,'jasmine:lcovonly']
