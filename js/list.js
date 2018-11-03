mui.init({
	subpages: [
	{
	    url: 'list.html',
		id: 'list',
		styles: {
			top: '0px',
			bottom: '0px'
		}
	}]
})
mui.ready(function() {
	console.log('success')

	mui('.mui-table-view').on('tap', 'li', function(e){
		var target = e.target || e.srcElement
		console.log(target.innerText)
		var type = target.innerText
      mui.get('http://route.showapi.com/126-2', {
        showapi_appid: 79072,
        showapi_sign: 'a5791ca1510d4f5abaf37ae0ed12cfe0',
        type: type
      }, function (result) {
        if (result.showapi_res_code === 0) {
          vm.mvlist = result.showapi_res_body.pagebean.contentlist;
        } else {
          mui.toast(result.showapi_res_error);
        }
        console.log(JSON.stringify(vm.mvlist))
        })	
	})
	
	mui('.nav-r').on('click', '.detail', function(){
      var img = this.getAttribute('img');
      var type = this.getAttribute('type');
      var name = this.getAttribute('name');
	  mui.openWindow({
	  	url:'detail.html',
	  	id:'detail',
	  	styles:{
	  	  top:'0px',
	  	  bottom:0
	  	},
	  	extras: {
          infoType:type,
          infoName:name,
          infoImg:img
        },
	  	
	  })
	})
})
var vm = new Vue({
  el: '#app',
  data: {
    list: [],
    mvlist: []
  },
  methods: {
    getList: function() {
      var that = this;
      mui.get('http://route.showapi.com/126-1', {
        showapi_appid: 79072,
        showapi_sign: 'a5791ca1510d4f5abaf37ae0ed12cfe0'
      }, function (result) {
        console.log(JSON.stringify(result))
        if (result.showapi_res_code === 0) {
          that.list = result.showapi_res_body.allTypeList;
        } else {
          mui.toast(result.showapi_res_error);
        }
        console.log(JSON.stringify(that.list))
      })
    }
  },
  created: function () {
    this.getList();
  }
})

