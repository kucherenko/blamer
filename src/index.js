require('./vcs/git')(__dirname + '/../README.md', function(result){
    console.log(result);
});