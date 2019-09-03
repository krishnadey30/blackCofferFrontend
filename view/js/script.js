//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, uder interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
var baseUrl = "http://localhost:5000/";
var token = getCookie("access_token");

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}

//New task list item
var createNewTaskElement=function(taskString,id){

	var listItem=document.createElement("li");

	//input (checkbox)
	// var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	// checkBox.type="checkbox";
	editInput.type="text";
	editInput.id = id;
	editInput.className = "input-task";
	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//and appending.
	// listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	
	$.ajax({
		type:'POST',
		url: baseUrl+"bucketlists/",
		data: 'name='+taskInput.value,
		crossDomain: true,
		beforeSend: function (xhr) {
			/* Authorization header */
			xhr.setRequestHeader("Authorization", "Bearer "+token);
		},
		success:function (result) {
			console.log(result);
			var listItem=createNewTaskElement(taskInput.value,result.id);
			//Append listItem to incompleteTaskHolder
			incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem, taskCompleted);

			taskInput.value="";
		},
		error:function (error) {
			console.log(error);
			// $('#loader').delay(1000).fadeOut();
		}
	});


}

//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
		
		$.ajax({
			type:'PUT',
			url: baseUrl+"bucketlists/"+editInput.id,
			data: 'name='+editInput.value,
			crossDomain: true,
			beforeSend: function (xhr) {
				/* Authorization header */
				xhr.setRequestHeader("Authorization", "Bearer "+token);
			},
			success:function (result) {
				console.log(result);
				label.innerText=editInput.value;
			},
			error:function (error) {
				console.log(error);
				// $('#loader').delay(1000).fadeOut();
			}
		});
			
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");
		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		var id = this.parentNode.getElementsByTagName("input")[0].id;
		$.ajax({
			type:'DELETE',
			url: baseUrl+"bucketlists/"+id,
			crossDomain: true,
			beforeSend: function (xhr) {
				/* Authorization header */
				xhr.setRequestHeader("Authorization", "Bearer "+token);
			},
			success:function (result) {
				console.log(result);
				//Remove the parent list item from the ul.
				ul.removeChild(listItem);
			},
			error:function (error) {
				console.log(error);
				// $('#loader').delay(1000).fadeOut();
			}
		});
		

}


//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
	//select ListItems children
	// var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			// checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
