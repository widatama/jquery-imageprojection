srcFiles = [
  "src/image.projection.js"
];

module.exports = {
  options: {
    enclose: {"window.jQuery": "$"}
  },

  normal: {
    options: {
      mangle: false,
      compress: false,
      beautify: true
    },

    files: {
      "<%= buildDir %>/image.projection.js": srcFiles
    }
  },

  min: {
    options: {
      mangle: true,
      compress: true
    },

    files: {
      "<%= buildDir %>/image.projection.min.js": srcFiles
    }
  }
}
