srcFiles = [
  "<%= tempDir %>/container.js",
  "<%= tempDir %>/surface.js",
  "<%= tempDir %>/projection.js",
  "<%= tempDir %>/viewfinder.js",
  "<%= tempDir %>/plugin.js"
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
      "<%= buildDir %>/javascripts/image.projection.js": srcFiles
    }
  },

  min: {
    options: {
      mangle: true,
      compress: true
    },

    files: {
      "<%= buildDir %>/javascripts/image.projection.min.js": srcFiles
    }
  }
};
