const fs = require("fs");

const defaultTaskName = "default";
const sourceSvgsTasks = ["copyAndOptimizeImages", "svg_sprite"];

const PATH_FOLDER_srcImages = "assets/images/svg/src";
const PATH_FOLDER_stagedImages = "assets/images/svg/staging";
const PATH_FOLDER_distImages = "assets/images/svg";

// This variable should be prefixed to filenames of those SVGs,
// where we don't want to perform any SVG optimizations so
// files like:
//    NO_CHANGE_logo.svg
// won't be modified by SVGO
const NO_CHANGE_prefix = "NO_CHANGE_";

module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      sourceSvgs: {
        files: [`${PATH_FOLDER_srcImages}/*.svg`],
        tasks: [defaultTaskName],
      },
    },

    svg_sprite: {
      stagedSvgs: {
        cwd: PATH_FOLDER_stagedImages,
        src: ["**/*.svg"],
        dest: PATH_FOLDER_distImages,

        options: {
          log: "verbose",
          dest: ".",
          mode: {
            symbol: {
              dest: PATH_FOLDER_distImages,
              prefix: "",
              bust: false,
              example: true,
              sprite: "output",
            },
          },
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-svg-sprite");

  // 1. Remove the existing staging folder
  // 2. Move the src folder files (only *.svg) to a fresh staging folder
  // 3. Optimize all the files (except NO_CHANGE_*.svg)
  // 4. Rename any (NO_CHANGE_<filename>.svg) to (<filename>.svg)
  grunt.registerTask(sourceSvgsTasks[0], function () {
    if (fs.existsSync(PATH_FOLDER_stagedImages)) {
      console.log(`Removing Dir: ${PATH_FOLDER_stagedImages}`);
      fs.rmSync(PATH_FOLDER_stagedImages, {
        recursive: true,
        force: true,
      });
    }

    console.log(`Creating Dir: ${PATH_FOLDER_stagedImages}`);
    fs.mkdirSync(PATH_FOLDER_stagedImages);

    fs.readdirSync(PATH_FOLDER_srcImages).forEach((file) => {
      if (!file.endsWith(".svg")) {
        return;
      }

      const sourceFilePath = PATH_FOLDER_srcImages + "/" + file;
      const destinationFilePath = PATH_FOLDER_stagedImages + "/" + file;

      console.log(`Copying: ${sourceFilePath} -> ${destinationFilePath}`);

      fs.copyFileSync(sourceFilePath, destinationFilePath);
    });
    const { execSync } = require("child_process");
    const commandToBeExecuted = `svgo -f ${PATH_FOLDER_stagedImages} --exclude "${NO_CHANGE_prefix}.*" `;
    console.log(`Optimizing SVGs: ${commandToBeExecuted}`);
    execSync(commandToBeExecuted);

    const prefixLength = NO_CHANGE_prefix.length;

    fs.readdirSync(PATH_FOLDER_stagedImages).forEach((file) => {
      if (!file.startsWith(NO_CHANGE_prefix)) {
        return;
      }

      const sourceFilePath = PATH_FOLDER_stagedImages + "/" + file;
      const destinationFilePath =
        PATH_FOLDER_stagedImages + "/" + file.substring(prefixLength);

      console.log(`Renaming: ${sourceFilePath} -> ${destinationFilePath}`);

      fs.renameSync(sourceFilePath, destinationFilePath);
    });
  });

  // Executes sourceSvgsTasks in order, one after the other (NOT IN PARALLEL)
  grunt.registerTask(defaultTaskName, sourceSvgsTasks);
};
