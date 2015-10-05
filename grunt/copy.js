module.exports = {
  deps: {
    files: [{
      expand: true,
      cwd: "node_modules/jquery/dist/",
      src: "jquery.min.js",
      dest: "<%= buildDir %>/javascripts/"
    }]
  },
  stylesheets: {
    files: [{
      expand: true,
      cwd: "stylesheets/",
      src: "image-projection.css",
      dest: "<%= buildDir %>/stylesheets/"
    }]
  }
};
