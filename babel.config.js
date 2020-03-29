module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["@babel/proposal-decorators", {
      "legacy": true
    }],
    ["@babel/proposal-class-properties", {
      "loose": true
    }],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
