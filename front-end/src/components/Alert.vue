<template>
	<div class="alert" role="alert" v-bind:class="'alert-' + variant">
		{{message}}
	</div>
</template>
<script>
	export default{
		props:['variant','message'] //接受外部传来的对应props名称的值，并渲染template中的对应变量
	}
</script>