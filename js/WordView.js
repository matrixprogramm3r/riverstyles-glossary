var WordView = function(word) {
    
    this.initialize = function() {
        this.el = $('<div/>');
    };
    this.initialize();
 
    this.render = function() {
    this.el.html(WordView.template(word));
        return this;
    };
}

WordView.template = Handlebars.compile($("#word-tpl").html());