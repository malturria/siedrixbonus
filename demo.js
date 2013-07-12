var socket = io.connect();

window.ponyExpress = new PonyExpress ({
	io : "http://localhost:3000"
});

window.ToDoTaskModel = Backbone.Model.extend({
	urlRoot: "/ToDoTask"
});

window.TodoTaskCollection = Backbone.Collection.extend({
	name : "ToDoList",
	model : window.ToDoTaskModel
});

window.ToDoCommentModel = Backbone.Model.extend({
	urlRoot : "/ToDoComment"
});

window.CommentCollection = Backbone.Collection.extend({
	name : "ToDoComment",
	model : window.ToDoCommentModel 
});

window.ToDoNotificationModel = Backbone.Model.extend({
	urlRoot : "/ToDoNotification"
});

window.NotificationCollection = Backbone.Collection.extend({
	name : "ToDoNotifications",
	model : window.ToDoNotificationModel
});

window.ToDoListCollection = new TodoTaskCollection();
window.ToDoCommentCollection = new CommentCollection();
window.ToDoNotificationCollection = new NotificationCollection();

window.ponyExpress.bind('connect',function () {

	var ToDoComment = $.get('/ToDoComment');
	ToDoComment.done(function (data){
		window.ToDoCommentCollection.add(data);
		window.ToDoCommentPlug = PonyExpress.BackbonePlug({
			collection : window.ToDoCommentCollection
		});
	});

	var ToDoNotification = $.get('/ToDoNotification');

	ToDoNotification.done(function (data){
		window.ToDoNotificationCollection.add(data);

		window.ToDoListPlug = new PonyExpress.BackbonePlug({
			collection : window.ToDoNotificationCollection,
			chanel : "notification"
		});

		ToDoNotificationCollection.forEach(function(data){
			$('#notification').prepend('<div class="not">' + data.attributes.text + '</div>');
		});
	});

	var ToDoTask = $.get('/ToDoTask');
	ToDoTask.done(function (data){
		window.ToDoListCollection.add(data);
		window.ToDoListPlug = new PonyExpress.BackbonePlug({
			collection : window.ToDoListCollection 
		});
	});

});







