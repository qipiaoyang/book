### canvas的常用api文档

canvas 是h5的新标签，使用canvas可以创建一个固定大小的画布，他公开了一个或多个渲染上下文，
可以用来绘制或者处理要展示的内容。

```
<canvas id="line" width="500" height="500" style="border: 1px solid red;"></canvas>
<script type="text/javascript">
    let canvas = document.getElementById('line');
    if(canvas.getContext) {
	let ctx = canvas.getContext("2d"); // 获取canvas的2d对象画笔
	ctx.moveTo(300,100);  //将画笔移动到x:300,y:100的位置
	ctx.lineTo(300,300); //画笔绘画一条直线至300，300位置
	ctx.stroke(); //绘画
    }
</script>
```

这样我就可以在画布里面画出一条直线。假如最后我们没有ctx.stroke();我们会看不到一条直线，
__这说明我们在绘制的时候最后一步一定要stroke，当然，某些api里面会封装stroke会让你更加方便.__


后面我会介绍更多关于canvas的api.

> MDN里面关于canvas的文档 [canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)