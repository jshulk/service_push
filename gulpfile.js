var gulp = require("gulp"),
	browserSync = require("browser-sync").create();

gulp.task("serve", function(){
	browserSync.init({
		server: {
			baseDir: "./"
		},
		open: false
	});
});