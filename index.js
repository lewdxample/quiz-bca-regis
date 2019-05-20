var firebaseRef = firebase.database();
var checkId = firebase.database().ref("users");
var ids;
var finalNickname;
var arr = [];

// checkId.once("value")
// .then(function(snapshot){
// 	snapshot.forEach(function(childSnapshot){
// 		var id = childSnapshot.key;
// 		arr.push(id);
// 		console.log(arr);
// 	})
// });

checkId.on("value", function(snapshot){
	arr = [];
	snapshot.forEach(function(childSnapshot){
		var id = childSnapshot.key;
		arr.push(id);
		console.log(arr);
	})
})

function showTotalScore(){
	finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	var checkNick = firebase.database().ref("users");

	loadsc();

	checkNick.once("value")
	.then(function(snapshot){
		if(snapshot.hasChild(finalNickname)){
			document.getElementById("bodycontainer1").style.display = "none";
			document.getElementById("bodycontainer3").style.display = "block";
			document.getElementById("bodycontainer2").style.display = "none";
			document.getElementById("nickname").innerHTML = finalNickname;

			firebase.database()
			.ref(`users/${finalNickname}/`)
			.once("value", snapshot => {

				var quiz = {};
				var total_point = 0;

				for (let index = 1; index <= 20; index++) {
					quiz[index] = snapshot.child("quiz"+index).val();
				}

				for (let index = 1; index <= 20; index++) {
					document.getElementById("p"+index).innerHTML = quiz[index];
					total_point += quiz[index];
				}

				document.getElementById("score").innerHTML = total_point;
			});
		}
		else{
			window.alert("Nickname is not available");
			removeLoad();
		}
	});	
}

function submitClick(){
	finalNickname = document.getElementById("inputNickname").value;
    ids = Math.floor((Math.random() * 100) + 1);
	document.documentElement.scrollTop = 0;

	if(finalNickname != ""){
		loadsc();
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == ids){
				ids = Math.floor((Math.random() * 100) + 1);
			}else{
				trueCond();
				break;
			}
		}
	}else{
		window.alert("nickname tidak boleh kosong!");
	}
}	
	
function loadsc(){
	document.getElementById("lds-ring").style.visibility = "visible";
}

function removeLoad(){
	document.getElementById("lds-ring").style.visibility = "hidden";
}

function trueCond(){
	document.getElementById("bodycontainer1").style.display = "none";
	document.getElementById("bodycontainer2").style.display = "block";
	removeLoad();

	firebaseRef.ref('users/'+ids).set({
		quiz1 : 0,
		quiz2 : 0,
		quiz3 : 0,
		quiz4 : 0,
		quiz5 : 0,
		quiz6 : 0,
		quiz7 : 0,
		quiz8 : 0,
		quiz9 : 0,
		quiz10 : 0,
		quiz11 : 0,
		quiz12 : 0,
		quiz13 : 0,
		quiz14 : 0,
		quiz15 : 0,
		quiz16 : 0,
		quiz17 : 0,
		quiz18 : 0,
		quiz19 : 0,
		quiz20 : 0,
		total_score : 0,
		nickname: finalNickname,
		id: ids
	},function(error){
		if(error){
			window.alert("Error");
			removeLoad();
		}
		else{
			document.getElementById("editId").innerHTML = ids;
			document.getElementById("editName").innerHTML = "Hello, "+finalNickname;
		}
	});
}
