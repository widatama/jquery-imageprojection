module.exports = {
  stylesheets: {
    files: [{
      expand: true,
      cwd: "stylesheets/",
      src: "image-projection.css",
      dest: "<%= buildDir %>/stylesheets/"
    }]
  }
};
