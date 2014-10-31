module.exports = ( grunt ) ->
  srcs = [
    'src/emerald.coffee'

    'src/abstract_fn.coffee'
    'src/constant.coffee'
    'src/power_fn.coffee'
    'src/product_fn.coffee'
    'src/rational_fn.coffee'
    'src/sum_fn.coffee'
    'src/difference_fn.coffee'

    'src/sequence_entry.coffee'
    'src/sequence.coffee'
    'src/series.coffee'
    'src/geometric_series.coffee'

    'src/event.coffee'
    'src/random_variable.coffee'
    'src/bernoulli.coffee'
    'src/binomial.coffee'
    'src/geometric.coffee'
    'src/uniform.coffee'

    'src/export.coffee'
  ]

  specs = [
    '.grunt/emerald/spec_compiled/emerald.js'

    '.grunt/emerald/spec_compiled/abstract_fn.js'
    '.grunt/emerald/spec_compiled/constant.js'
    '.grunt/emerald/spec_compiled/power_fn.js'
    '.grunt/emerald/spec_compiled/product_fn.js'
    '.grunt/emerald/spec_compiled/rational_fn.js'
    '.grunt/emerald/spec_compiled/sum_fn.js'
    '.grunt/emerald/spec_compiled/difference_fn.js'

    '.grunt/emerald/spec_compiled/sequence.js'
    '.grunt/emerald/spec_compiled/series.js'
    # '.grunt/emerald/spec_compiled/geometric_series.js'

    # '.grunt/emerald/spec_compiled/event.js'
    # '.grunt/emerald/spec_compiled/random_variable.js'
    # '.grunt/emerald/spec_compiled/bernoulli.js'
    # '.grunt/emerald/spec_compiled/binomial.js'
    # '.grunt/emerald/spec_compiled/geometric.js'
    # '.grunt/emerald/spec_compiled/uniform.js'

    # '.grunt/emerald/spec_compiled/export.js'
  ]

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      dist:
        options:
          join: true
          sourceMap: true
        files:
          'dist/emerald.js': srcs

      build:
        options:
          join: true
          sourceMap: true
        files:
          'build/emerald.js': srcs

      spec:
        files: [
          expand: true
          cwd: 'spec'
          src: ['**/*.coffee']
          dest: '.grunt/emerald/spec_compiled'
          ext: '.js'
        ]

    jasmine:
      build:
        src: ['build/**/*.js']
        options:
          vendor: [
            "bower_components/sonic/dist/sonic.js",
            "bower_components/big.js/big.js",
          ]
          keepRunner: true
          specs: specs
          # template: require('grunt-template-jasmine-istanbul')
          # templateOptions:
          #   coverage: 'statistics/coverage/coverage.json'
          #   report:
          #     type: 'lcovonly'
          #     options:
          #       dir: 'statistics/coverage/lcov'
          #   thresholds:
          #     lines: 60
          #     statements: 60
          #     branches: 60
          #     functions: 60

    clean:
      build: ['build']
      spec:  ['.grunt/emerald/spec_compiled']
      grunt: ['.grunt']

    watch:
      all:
        files: ['src/**/*.coffee']
        tasks: ['coffee:dist', 'coffee:spec', 'coffee:build']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'build',   ['coffee:build']
  grunt.registerTask 'dist',    ['coffee:dist']
  grunt.registerTask 'spec',    ['clean:spec', 'coffee:build', 'coffee:spec', 'jasmine:build']



# module.exports = ( grunt ) ->
#   srcs = [
#     'src/list.coffee'
#   ]

#   grunt.initConfig
#     pkg: grunt.file.readJSON('package.json')

#     meta:
#       banner:
#         '// Collection\n' +
#         '// version: <%= pkg.version %>\n' +
#         '// contributors: <%= pkg.contributors %>\n' +
#         '// license: <%= pkg.licenses[0].type %>\n'

#     coffee:
#       dist:
#         options:
#           join: true
#         files:
#           'dist/list.js': 'src/list.coffee'

#       build:
#         options:
#           join: true
#           sourceMap: true
#         files:
#           'build/list.js': 'src/list.coffee'

#       spec:
#         files: [
#           expand: true
#           cwd: 'spec'
#           src: ['**/*.coffee']
#           dest: '.grunt/list/spec_compiled'
#           ext: '.js'
#         ]

#     jasmine:
#       build:
#         src: ['build/list.js']
#         options:
#           specs: '.grunt/list/spec_compiled/**/*.js'
#           vendor: []
#           template: require('grunt-template-jasmine-istanbul')
#           templateOptions:
#             coverage: 'statistics/coverage/coverage.json'
#             report:
#               type: 'lcovonly'
#               options:
#                 dir: '.grunt/list/coverage/lcov'
#             thresholds:
#               lines: 60
#               statements: 60
#               branches: 60
#               functions: 60
#       html:
#         src: ['build/list.js']
#         options:
#           specs: '.grunt/list/spec_compiled/**/*.js'
#           vendor: []
#           template: require('grunt-template-jasmine-istanbul')
#           templateOptions:
#             coverage: 'statistics/coverage/coverage.json'
#             report:
#               type: 'html'
#               options:
#                 dir: 'statistics/coverage/html'
#             thresholds:
#               lines: 60
#               statements: 60
#               branches: 60
#               functions: 60

#     plato:
#       all:
#         options:
#           jshint: false
#         files:
#           'statistics/complexity' : ['.grunt/list/src_compiled/**/*.js']


#     clean:
#       build: ['build']
#       spec:  ['.grunt/list/spec_compiled']
#       grunt: ['.grunt']

#     watch:
#       all:
#         files: 'src/**/*.coffee'
#         tasks: ['build', 'spec']

#   grunt.registerTask 'watch',   ['coffee:build', 'watch']
#   grunt.registerTask 'spec',    ['clean:spec', 'coffee:build', 'coffee:spec', 'jasmine:build', 'clean:spec']
#   grunt.registerTask 'build',   ['coffee:build']
#   grunt.registerTask 'dist',    ['coffee:dist']
#   grunt.registerTask 'analyze', ['coffee','jasmine:html', 'plato']
