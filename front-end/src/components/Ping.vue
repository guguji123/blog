<template>
	<div class="container">
		<button type="button" class="btn btn-primary">{{msg}}</button>
	</div>
</template>

<script>
	import axios from 'axios' //导入第三方'name'
	export default {
		name: 'Ping',
		data(){
			return {
				msg:'123'
			}
		},
		methods:{
			getMessage(){
				const path = 'http://localhost:5000/api/ping'
				axios.get(path)
					.then((res)=>{
						this.msg = res.data.name; //这个res其实就是get到的response, res可以定义任何名称
					})
					.catch((error)=>{
						//eslint-disable-next-line
						console.error(error);
					})
				}	
			},
			
			created(){
				this.getMessage()
				}
	}
</script>