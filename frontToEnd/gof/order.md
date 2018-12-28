### 命令模式

命令模式：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作
是什么，此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

#### 命令模式的案例

```
var _add = document.getElementById("add");
var _delete = document.getElementById("delete");
var _command = document.getElementById("command");
var _command1 = document.getElementById("command1");
var command = {
	add: function( obj ) {
		var _obj = judge(obj);
		var p = document.createElement("P");
		p.innerHTML = _obj.ps[ _obj.len - 1 ].innerHTML;
		obj.appendChild(p);
	},
	delete: function( obj ) {
		var _obj = judge(obj);
		obj.removeChild(_obj.ps[ _obj.len - 1 ]);
	},
};
function judge(obj) {
	var ps = obj.querySelectorAll("p"),
			len = ps.length;
	if( !ps || len === 0 ) {
		console.log("不存在p标签");
		return false;
	}
	return {
		ps: ps,
		len: len
	}
}
//新增命令
_add.addEventListener("click",function() {
	command.add( _command );
});
//删除命令
_delete.addEventListener("click",function() {
	command.delete( _command );
});
```


#### 宏命令

首先宏命令是一组命令的集合，而且可以随时挂载或取消.


```
var command1 = {
	excute: function() {
		console.log("我是命令1");
	}
};
var command2 = {
	excute: function() {
		console.log("我是命令2");
	}
};
var command3 = {
	excute: function() {
		console.log("我是命令3");
	}
};
var MacroCommand = function() {
	return {
		commandList:[],
		add: function(command) {
			this.commandList.push(command);
		},
		excute: function() {
			for(var i = 0,len; len.excute(); = this.commandList[ i++ ];) {
				len.excute();
			}
		}
	}
};
var MacroCommand = MacroCommand();
MacroCommand.add(command1);
MacroCommand.add(command2);
MacroCommand.add(command3);
MacroCommand.excute();
```


#### 小结

命令模式的核心要素就是解耦__请求发送者__ 与 __请求接收者__ ,通过命令对象将二者关联起来。