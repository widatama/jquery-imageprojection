module.exports = {
  production: {
    options: [
      "REMOVE START",
      "REMOVE END"
    ],
    files: [
      {src: "<%= srcDir %>/container.js", dest: "<%= tempDir %>/container.js"},
      {src: "<%= srcDir %>/surface.js", dest: "<%= tempDir %>/surface.js"},
      {src: "<%= srcDir %>/projection.js", dest: "<%= tempDir %>/projection.js"},
      {src: "<%= srcDir %>/viewfinder.js", dest: "<%= tempDir %>/viewfinder.js"},
      {src: "<%= srcDir %>/plugin.js", dest: "<%= tempDir %>/plugin.js"}
    ]
  }
};
