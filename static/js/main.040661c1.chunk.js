(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,n){e.exports={"upload-btn":"App_upload-btn__2zG_I","selected-file":"App_selected-file__1SV6C"}},105:function(e,t,n){},109:function(e,t,n){e.exports={"file-tree":"FileTree_file-tree__3yELz",spin:"FileTree_spin__uCCEv"}},116:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return r});var a=e.window?"".concat(window.location.protocol,"//").concat(window.location.hostname):"http://localhost",o=e.window?window.location.pathname:"",i=e.window?window.location.port:"3000",l="".concat(a,":").concat(i),r="".concat(l).concat(o,"/fakedata")}).call(this,n(72))},121:function(e,t,n){e.exports=n(252)},126:function(e,t,n){},252:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(9),l=n.n(i),r=(n(126),n(57),n(16)),c=n(118),s=n(30),d=n(31),u=n(35),p=n(32),f=n(36),h=n(33),m=n.n(h),b=n(104),w=n.n(b),v=(n(133),n(117)),T=n(105),k=n.n(T),O=m.a.bind(k.a),C=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).handleOk=function(){n.props.onModalOk()},n.handleCancel=function(){!n.props.loading&&n.props.onCloseModal()},n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,n=e.visible,a=e.width,i=e.title,l=e.cancelBtnText,c=e.okBtnText,s=e.loading,d=e.prepareToSubmit;return o.a.createElement(v.a,{className:O("modal",t),visible:n,width:a,title:i,onOk:this.handleOk,onCancel:this.handleCancel,centered:!0,footer:[o.a.createElement(r.a,{key:"cancel",disabled:s,onClick:this.handleCancel},l),o.a.createElement(r.a,{key:"ok",type:"primary",loading:s,disabled:!d,onClick:this.handleOk},c)]},this.props.children)}}]),t}(a.Component);C.defaultProps={className:"",width:"50%",title:"",cancelBtnText:"Cancel",okBtnText:"Ok",prepareToSubmit:!0};var S=C,y=(n(189),n(113)),N=(n(253),n(78)),g=n(76),j=n.n(g),E=n(109),F=n.n(E),L=m.a.bind(F.a),_=N.a.TreeNode,D=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,i=new Array(a),l=0;l<a;l++)i[l]=arguments[l];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).onSelect=function(e,t){n.props.setSelectedFile(j()(e)?"":t.node.props.path)},n.renderTreeNodes=function(e){return e.map(function(e){return o.a.createElement(_,{title:e.name,key:e.id,path:e.path,isLeaf:!e.isFolder,selectable:!e.isFolder,dataRef:e},e.children?n.renderTreeNodes(e.children):null)})},n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,n=e.fileTreeData,a=e.onLoadTreeNodeChild;return j()(n)?o.a.createElement("div",{className:L("file-tree",t)},o.a.createElement(y.a,{className:L("spin"),tip:"Loading..."})):o.a.createElement(N.a,{className:L("file-tree",t),loadData:a,onSelect:this.onSelect},this.renderTreeNodes(n))}}]),t}(a.Component);D.defaultProps={className:"",onLoadTreeNodeChild:function(){},setSelectedFile:function(){}};var M=D,x=n(119),B=n(114),V=n.n(B),A=n(115),P=n.n(A),z=n(116),I=function(e){return function(e){var t=e.method,n=void 0===t?"get":t,a=e.endpoint,o=e.query,i=void 0===o?{}:o,l=e.fullUrl,r=(void 0===l?"":l)||z.a+a;return V()({method:n,url:r,params:i})}({endpoint:e+".json"}).then(function(e){var t=e.data.path;return e.data.fileList.map(function(e){return Object(x.a)({},e,{path:t+"/"+e.name,id:P.a.generate()})})}).catch(function(e){return console.error(e)})},J=m.a.bind(w.a),R=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={modalVisible:!1,modalLoading:!1,selectedFile:"",fileTreeData:[]},n.showModal=function(){n.setState(function(e,t){return{modalVisible:!0,fileTreeData:[]}}),setTimeout(n.initTreeData,2e3)},n.onCloseModal=function(){n.setState(function(e,t){return{modalVisible:!1,selectedFile:""}})},n.onModalOk=function(){return n.setState(function(e,t){return{modalLoading:!0}}),new Promise(function(e){setTimeout(function(){n.setState(function(e,t){return{modalVisible:!1,modalLoading:!1,selectedFile:""}}),e()},3e3)})},n.initTreeData=function(){I("/root").then(function(e){return n.setState(function(t,n){return{fileTreeData:e}})})},n.onLoadTreeNodeChild=function(e){return e.props.children||e.props.isLeaf?null:I(e.props.path).then(function(t){e.props.dataRef.children=t,n.setState({fileTreeData:Object(c.a)(n.state.fileTreeData)})})},n.setSelectedFile=function(e){n.setState(function(t,n){return{selectedFile:e}})},n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.state,t=e.modalVisible,n=e.modalLoading,a=e.selectedFile,i=e.fileTreeData;return o.a.createElement("div",{className:J("app")},o.a.createElement(r.a,{className:J("upload-btn"),type:"primary",onClick:this.showModal},"Choose a file"),o.a.createElement(S,{visible:t,title:"Please choose a file",okBtnText:"Submit",loading:n,prepareToSubmit:a.length>0,onCloseModal:this.onCloseModal,onModalOk:this.onModalOk},o.a.createElement(M,{fileTreeData:i,setSelectedFile:this.setSelectedFile,onLoadTreeNodeChild:this.onLoadTreeNodeChild}),o.a.createElement("div",{className:J("selected-file")},a?"Selected file : "+a:null)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[121,2,1]]]);
//# sourceMappingURL=main.040661c1.chunk.js.map