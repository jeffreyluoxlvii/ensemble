(this.webpackJsonpensemble=this.webpackJsonpensemble||[]).push([[0],{59:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(4),c=a.n(s),i=a(50),r=a.n(i),l=(a(59),a(16)),o=a(17),u=a(19),h=a(18),d=a(22),j=a(35),b=a(7),m=a(11),x=a(28);a(62),a(63);x.a.initializeApp({apiKey:"AIzaSyByuTcTjIv3I74eLaXfe-fP_1hEyj-kTgA",authDomain:"ensemble-7df30.firebaseapp.com",databaseURL:"https://ensemble-7df30-default-rtdb.firebaseio.com/"});var g=x.a.auth,p=x.a.database();var O=function(){return Object(n.jsx)("header",{className:"header",children:Object(n.jsxs)("nav",{className:"navbar navbar-expand-sm fixed-top navbar-dark bg-transparent",children:[Object(n.jsx)(m.b,{className:"navbar-brand",to:"/",children:"Ensemble"}),Object(n.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(n.jsx)("span",{className:"navbar-toggler-icon"})}),Object(n.jsx)("div",{className:"collapse navbar-collapse justify-content-end",id:"navbarNavAltMarkup",children:g().currentUser?Object(n.jsx)("div",{className:"navbar-nav",children:Object(n.jsx)("button",{className:"logOut",onClick:function(){return g().signOut()},children:"Logout"})}):Object(n.jsxs)("div",{className:"navbar-nav",children:[Object(n.jsx)(m.b,{className:"nav-item nav-link mr-3",to:"/login",children:"Log In"}),Object(n.jsx)(m.b,{className:"nav-item nav-link mr-3",to:"/signup",children:"Sign Up"})]})})]})})};var v=function(){return Object(n.jsx)("footer",{className:"pt-5",children:Object(n.jsx)("div",{className:"footer",children:Object(n.jsx)("p",{children:"\xa9 Ensemble 2020."})})})},f=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"body",children:[Object(n.jsx)(O,{}),Object(n.jsx)("div",{className:"mainSection",children:Object(n.jsx)("div",{className:"center",children:Object(n.jsxs)("div",{className:"container text-center py-5",children:[Object(n.jsx)("h1",{className:"text1",children:"Welcome to"}),Object(n.jsx)("h1",{className:"text2",children:" Ensemble"}),Object(n.jsx)("p",{className:"text",children:"A great place to stream music with friends"}),Object(n.jsxs)("div",{className:"mt-4",children:[Object(n.jsx)(m.b,{className:"btn px-5  mr-3",to:"/login",children:"Log In"}),Object(n.jsx)(m.b,{className:"btn px-5",to:"/signup",children:"Sign Up"})]})]})})}),Object(n.jsx)(v,{})]})}}]),a}(s.Component),y=a(9),N=a.n(y),S=a(20),I=a(8),k=a(52),w={part:"snippet",maxResults:1,key:"AIzaSyDJtsr6slxOC8M86hybW6TFyW8zxzL9JXY"},C=a.n(k).a.create({baseURL:"https://www.googleapis.com/youtube/v3/"});function P(e){return p.ref("queue").push({title:e.title,videoId:e.videoId}).getKey()}function B(e){return E.apply(this,arguments)}function E(){return(E=Object(S.a)(N.a.mark((function e(t){var a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/search",{params:Object(d.a)(Object(d.a)({},w),{},{q:t})});case 2:return a=e.sent,console.log(a.data.items),e.abrupt("return",{title:a.data.items[0].snippet.title,videoId:a.data.items[0].id.videoId});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(e){p.ref("index").set(e)}var A=a(53),D=a.n(A),T=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e))._isMounted=!1,n.onEnterPress=function(e){13===e.keyCode&&!1===e.shiftKey&&(e.preventDefault(),n.handleSubmit(e))},n.scrollToBottom=function(){n.messagesEnd.scrollIntoView({behavior:"smooth"})},n.state={user:g().currentUser,chats:[],queue:[],playerVolume:.26,content:"",readError:null,writeError:null,isPlaying:!0,loadingQueue:!0,loadingChats:!0,loadingIndex:!0,loadingPlayState:!0,songIndex:0},n.handleChange=n.handleChange.bind(Object(I.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(I.a)(n)),n.onEnterPress=n.onEnterPress.bind(Object(I.a)(n)),n.playNextSong=n.playNextSong.bind(Object(I.a)(n)),n.playPrevSong=n.playPrevSong.bind(Object(I.a)(n)),n.setVolume=n.setVolume.bind(Object(I.a)(n)),n.pauseSong=n.pauseSong.bind(Object(I.a)(n)),n.playSong=n.playSong.bind(Object(I.a)(n)),n.removeSong=n.removeSong.bind(Object(I.a)(n)),n.myRef=c.a.createRef(),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=Object(S.a)(N.a.mark((function e(){var t,a=this;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({readError:null,loadingChats:!0,loadingQueue:!0}),t=this.myRef.current;try{p.ref("chats").on("value",(function(e){var n=[];e.forEach((function(e){n.push(e.val())})),n.sort((function(e,t){return e.timestamp-t.timestamp})),a.setState({chats:n}),t.scrollBy(0,t.scrollHeight),a.setState({loadingChats:!1})}))}catch(n){this.setState({readError:n.message,loadingChats:!1})}this.scrollToBottom();try{p.ref("queue").on("value",(function(e){var t=[];e.forEach((function(e){var a=e.val();t.push({videoId:a.videoId,title:a.title,id:e.key})})),a.setState({queue:t}),a.setState({loadingQueue:!1})}))}catch(n){this.setState({readError:n.message,loadingQueue:!1})}try{p.ref("index").on("value",(function(e){var t=e.val();a.setState({songIndex:t}),a.setState({loadingIndex:!1})}))}catch(n){this.setState({readError:n.message,loadingIndex:!1})}try{p.ref("isPlaying").on("value",(function(e){var t=e.val();a.setState({isPlaying:t}),a.setState({loadingPlayState:!1})}))}catch(n){this.setState({readError:n.message,loadingPlayState:!1})}case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"setVolume",value:function(e){this.setState({playerVolume:e.target.valueAsNumber})}},{key:"handleChange",value:function(e){this.setState({content:e.target.value})}},{key:"pauseSong",value:function(){this.state.isPlaying&&(this.setState({isPlaying:!1}),p.ref("isPlaying").set(!1))}},{key:"playSong",value:function(){this.state.isPlaying||(this.setState({isPlaying:!0}),p.ref("isPlaying").set(!0))}},{key:"playNextSong",value:function(){var e=this;this.state.songIndex+1<this.state.queue.length&&this.setState({songIndex:this.state.songIndex+1},(function(){return L(e.state.songIndex)}))}},{key:"playPrevSong",value:function(){var e=this;this.state.songIndex-1>=0&&this.setState({songIndex:this.state.songIndex-1},(function(){return L(e.state.songIndex)}))}},{key:"removeSong",value:function(){var e=Object(S.a)(N.a.mark((function e(t,a){var n=this;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a<=this.state.songIndex&&this.state.songIndex>0&&this.setState({songIndex:this.state.songIndex-1},(function(){return L(n.state.songIndex)})),p.ref("queue/"+t).remove();case 2:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"handleSubmit",value:function(){var e=Object(S.a)(N.a.mark((function e(t){var a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.setState({writeError:null}),a=this.myRef.current,e.prev=3,e.next=6,p.ref("chats").push({content:this.state.content,timestamp:Date.now(),uid:this.state.user.email});case 6:if(!this.state.content.startsWith("-p ")){e.next=12;break}return e.t0=P,e.next=10,B(this.state.content.substring(3));case 10:e.t1=e.sent,(0,e.t0)(e.t1);case 12:this.setState({content:""}),a.scrollBy(0,a.scrollHeight),e.next=19;break;case 16:e.prev=16,e.t2=e.catch(3),this.setState({writeError:e.t2.message});case 19:case"end":return e.stop()}}),e,this,[[3,16]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(n.jsx)("div",{children:Object(n.jsxs)("main",{className:"container-fluid d-flex h-100 flex-column",children:[Object(n.jsx)(O,{}),Object(n.jsxs)("div",{className:"row main-container flex-fill",children:[Object(n.jsxs)("div",{className:"col-3 main-instructions-column",children:[Object(n.jsx)("h4",{className:"titleBox",children:"Current Queue: "}),Object(n.jsx)("div",{className:"scroll",children:Object(n.jsx)("div",{className:"textBox",children:Object(n.jsx)("ol",{children:this.state.queue.map((function(t,a){return Object(n.jsx)("li",{className:e.state.songIndex===a?"highlighted":"",children:Object(n.jsxs)("div",{className:"flexBox",children:[Object(n.jsx)("div",{onClick:function(){return L(a)},children:t.title}),Object(n.jsx)("i",{class:"removeButton fas fa-times",onClick:function(){return e.removeSong(t.id,a)}})]})},a)}))})})})]}),Object(n.jsx)("div",{className:"col-6 main-instructions-column",children:Object(n.jsxs)("div",{className:"center",children:[this.state.loadingIndex||this.state.loadingQueue||0===this.state.queue.length?null:Object(n.jsx)(D.a,{volume:this.state.playerVolume,onEnded:this.playNextSong,onReady:this.playSong,onPlay:this.playSong,onPause:this.pauseSong,playing:this.state.isPlaying,className:"videoFormat",url:"https://youtu.be/".concat(this.state.queue[this.state.songIndex].videoId)}),Object(n.jsxs)("div",{className:"buttonList",children:[Object(n.jsx)("button",{className:"buttonPadding2",onClick:this.playPrevSong,type:"button",children:Object(n.jsx)("i",{class:"fas fa-step-backward"})}),this.state.isPlaying?Object(n.jsx)("button",{className:"buttonPadding",onClick:this.pauseSong,type:"button",children:Object(n.jsx)("i",{class:"fas fa-pause"})}):Object(n.jsx)("button",{className:"buttonPadding",onClick:this.playSong,type:"button",children:Object(n.jsx)("i",{class:"fas fa-play"})}),Object(n.jsx)("button",{className:"buttonPadding2",onClick:this.playNextSong,type:"button",children:Object(n.jsx)("i",{class:"fas fa-step-forward"})})]}),Object(n.jsxs)("div",{className:"slider",children:[Object(n.jsx)("div",{className:"soundIconLeft",children:Object(n.jsx)("i",{class:"fas fa-volume-off"})}),Object(n.jsx)("input",{type:"range",min:"0",max:"1",step:"0.01",onChange:this.setVolume,value:this.state.playerVolume,class:"range blue"}),Object(n.jsx)("div",{className:"soundIconRight",children:Object(n.jsx)("i",{class:"fas fa-volume-up"})})]})]})}),Object(n.jsxs)("div",{className:"col-3 main-command-column",children:[Object(n.jsxs)("div",{className:"chat-area",ref:this.myRef,children:[this.state.loadingChats?Object(n.jsx)("div",{className:"spinner-border text-success",role:"status",children:Object(n.jsx)("span",{className:"sr-only",children:"Loading..."})}):"",this.state.chats.map((function(t){return Object(n.jsxs)("p",{className:"chat-bubble "+(e.state.user.email===t.uid?"current-user":""),children:[t.content,Object(n.jsx)("br",{}),Object(n.jsx)("span",{className:"chat-time float-right",children:t.uid})]},t.timestamp)})),Object(n.jsx)("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}})]}),Object(n.jsx)("div",{className:"form",children:Object(n.jsxs)("form",{onSubmit:this.handleSubmit,className:"mx-3",children:[Object(n.jsx)("textarea",{className:"border border-color w-100 rounded",name:"content",rows:"2",onKeyDown:this.onEnterPress,onChange:this.handleChange,value:this.state.content,placeholder:"Type your message here! Type '-p [songname]' to queue a song."}),this.state.error?Object(n.jsx)("p",{className:"text-danger",children:this.state.error}):null,Object(n.jsx)("button",{type:"submit",className:"sendButton",children:"Send"})]})}),Object(n.jsxs)("div",{className:"logIn",children:["Logged in as: ",Object(n.jsx)("strong",{className:"text2",children:this.state.user.email})]})]})]})]})})}}]),a}(s.Component),q=a(26);function U(){var e=new g.GoogleAuthProvider;return g().signInWithPopup(e)}var R=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={error:null,email:"",password:""},e.handleChange=e.handleChange.bind(Object(I.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(I.a)(e)),e.googleSignIn=e.googleSignIn.bind(Object(I.a)(e)),e}return Object(o.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(q.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(){var e=Object(S.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.setState({error:""}),e.prev=2,e.next=5,a=this.state.email,n=this.state.password,g().createUserWithEmailAndPassword(a,n);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),this.setState({error:e.t0.message});case 10:case"end":return e.stop()}var a,n}),e,this,[[2,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"googleSignIn",value:function(){var e=Object(S.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,U();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this.setState({error:e.t0.message});case 8:case"end":return e.stop()}}),e,this,[[0,5]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(n.jsxs)("form",{className:"mt-5 py-5 px-5",onSubmit:this.handleSubmit,children:[Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsxs)("h1",{className:"text1",children:["Sign Up to",Object(n.jsx)(m.b,{className:"title ml-2",to:"/",children:Object(n.jsx)("h1",{className:"text2",children:"Ensemble"})})]})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("p",{className:"text",children:"Fill in the form below to create an account."})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("input",{className:"form-control2",placeholder:"Email",name:"email",type:"email",onChange:this.handleChange,value:this.state.email})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("input",{className:"form-control2",placeholder:"Password",name:"password",onChange:this.handleChange,value:this.state.password,type:"password"})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsxs)("div",{className:"form-group",children:[this.state.error?Object(n.jsx)("p",{className:"text-danger",children:this.state.error}):null,Object(n.jsx)("button",{className:"signUpButton",type:"submit",children:"Sign up"})]})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("p",{className:"text",children:"You can also sign up with any of these services:"})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("button",{className:"googleSignUp",type:"button",onClick:this.googleSignIn,children:Object(n.jsx)("i",{class:"fab fa-google"})})}),Object(n.jsx)("hr",{}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsxs)("p",{className:"text1",children:["Already have an account? ",Object(n.jsx)(m.b,{to:"/login",children:Object(n.jsx)("p",{className:"text2",children:"Login"})})]})})]})}}]),a}(s.Component),V=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={error:null,email:"",password:""},e.handleChange=e.handleChange.bind(Object(I.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(I.a)(e)),e.googleSignIn=e.googleSignIn.bind(Object(I.a)(e)),e}return Object(o.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(q.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(){var e=Object(S.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.setState({error:""}),e.prev=2,e.next=5,a=this.state.email,n=this.state.password,g().signInWithEmailAndPassword(a,n);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),this.setState({error:e.t0.message});case 10:case"end":return e.stop()}var a,n}),e,this,[[2,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"googleSignIn",value:function(){var e=Object(S.a)(N.a.mark((function e(){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,U();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this.setState({error:e.t0.message});case 8:case"end":return e.stop()}}),e,this,[[0,5]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(n.jsxs)("form",{className:"mt-5 py-5 px-5",autoComplete:"off",onSubmit:this.handleSubmit,children:[Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsxs)("h1",{className:"text1",children:["Login to",Object(n.jsx)(m.b,{className:"title ml-2",to:"/",children:Object(n.jsx)("h1",{className:"text2",children:"Ensemble"})})]})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("p",{className:"text",children:"Fill in the form below to login to your account."})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("input",{className:"form-control2",placeholder:"Email",name:"email",type:"email",onChange:this.handleChange,value:this.state.email})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("input",{className:"form-control2",placeholder:"Password",name:"password",onChange:this.handleChange,value:this.state.password,type:"password"})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsxs)("div",{className:"form-group",children:[this.state.error?Object(n.jsx)("p",{className:"text-danger",children:this.state.error}):null,Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("button",{className:"logInButton",type:"submit",children:"Login"})})]})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("p",{className:"text",children:"You can also log in with any of these services: "})}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsx)("button",{className:"googleLogIn",type:"button",onClick:this.googleSignIn,children:Object(n.jsx)("i",{class:"fab fa-google"})})}),Object(n.jsx)("hr",{}),Object(n.jsx)("div",{className:"logInBox",children:Object(n.jsxs)("p",{className:"text1",children:["Don't have an account? ",Object(n.jsx)(m.b,{to:"/signup",children:Object(n.jsx)("p",{className:"text2",children:"Sign up"})})]})})]})}}]),a}(s.Component),F=(a(92),function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"body",children:[Object(n.jsx)(O,{}),Object(n.jsx)("div",{className:"mainSection",children:Object(n.jsx)("div",{className:"center",children:Object(n.jsxs)("div",{className:"container text-center py-5",children:[Object(n.jsx)("h1",{className:"text1",children:"Welcome to"}),Object(n.jsx)("h1",{className:"text2",children:" Ensemble"}),Object(n.jsx)("p",{className:"text",children:"A great place to stream music with friends"}),Object(n.jsx)("div",{className:"mt-4",children:Object(n.jsx)(m.b,{className:"btn px-5 mr-3",to:"/signup",children:"Begin streaming"})})]})})}),Object(n.jsx)(v,{})]})}}]),a}(s.Component));function M(e){var t=e.component,a=e.authenticated,s=Object(j.a)(e,["component","authenticated"]);return Object(n.jsx)(b.b,Object(d.a)(Object(d.a)({},s),{},{render:function(e){return!0===a?Object(n.jsx)(t,Object(d.a)({},e)):Object(n.jsx)(b.a,{to:{pathname:"/login",state:{from:e.location}}})}}))}function W(e){var t=e.component,a=e.authenticated,s=Object(j.a)(e,["component","authenticated"]);return Object(n.jsx)(b.b,Object(d.a)(Object(d.a)({},s),{},{render:function(e){return!1===a?Object(n.jsx)(t,Object(d.a)({},e)):Object(n.jsx)(b.a,{to:"/play"})}}))}var Q=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={authenticated:!1,loading:!0},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;g().onAuthStateChanged((function(t){t?e.setState({authenticated:!0,loading:!1}):e.setState({authenticated:!1,loading:!1})}))}},{key:"render",value:function(){return!0===this.state.loading?Object(n.jsx)("div",{className:"spinner-border text-success",role:"status",children:Object(n.jsx)("span",{className:"sr-only",children:"Loading..."})}):Object(n.jsx)(m.a,{children:Object(n.jsxs)(b.d,{children:[Object(n.jsx)(b.b,{exact:!0,path:"/",component:this.state.authenticated?F:f}),Object(n.jsx)(M,{path:"/play",authenticated:this.state.authenticated,component:T}),Object(n.jsx)(W,{path:"/signup",authenticated:this.state.authenticated,component:R}),Object(n.jsx)(W,{path:"/login",authenticated:this.state.authenticated,component:V})]})})}}]),a}(s.Component),z=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,94)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),s(e),c(e),i(e)}))};r.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(Q,{})}),document.getElementById("root")),z()}},[[93,1,2]]]);
//# sourceMappingURL=main.f04b5b36.chunk.js.map