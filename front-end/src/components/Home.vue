<template>
	<div class="container">
		<alert
		v-for="(alert,index) in alerts":key="index"
		v-if="alert.showAlert"
		v-bind:variant = "alert.variant"
		v-bind:message ="alert.message"
		>
		</alert>
		<button type="button" class="btn btn-primary">HomePage</button>
	</div>

</template>

<script>
	import Alert from './Alert' //导入组件用 './name'			
	export default{
		name: 'Home', // this is the name of the component
		components:{
			alert: Alert //小写alert为新定义的Alert组件名称，并在上面的标签中引用，将绑定的值传入到alert组件的props中
		},
		data(){
			return {
				alerts: [
				{
					showAlert:true,
					variant:'danger',
					message:'Oops..'
				},
				{
					showAlert:true,
					variant:'info',
					message:'Hi'

				},
				{
					showAlert:true,
					variant:'success',
					message:'OK'
				}


				]
			}
		}
	}
</script>