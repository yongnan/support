(self.webpackChunklite=self.webpackChunklite||[]).push([[97332],{47628:(e,n,t)=>{"use strict";t.d(n,{$:()=>p});var r=t(23450),o=t.n(r),l=t(67294),i=t(17878),a=t(93310),s=t(87691),u=t(21372),c=function(e){return function(n){return{textAlign:"left",":hover":{color:"LIGHTER"===e?n.baseColor.fill.darker:n.baseColor.fill.lighter}}}},p=function(e){var n=e.showVoters,t=e.shouldShowResponsiveLabelText,r=e.shouldHideClapsText,p=e.hasLabel,d=e.clapCount,v=e.showFullNumber,f=e.countColor,m=e.countScale,g=void 0===m?"M":m,C=v?(0,u.rR)(d):(0,u.pY)(d),h=p&&!r?" ".concat(o()("clap",d)):"";return f||(f=t||p||r?"DARKER":"LIGHTER"),l.createElement(s.F,{color:f,scale:g},n?l.createElement(a.r,{onClick:n,rules:c(f)},C,t?l.createElement(i.s,null,h):h):C)}},73130:(e,n,t)=>{"use strict";t.d(n,{x:()=>f});var r=t(87757),o=t.n(r),l=t(48926),i=t.n(l),a=t(63038),s=t.n(a),u=t(67294),c=t(30472),p=t(77355),d=t(47230),v=t(20113),f=function(e){var n=e.isVisible,t=e.hide,r=e.voters,l=e.fetchMore,a=e.voterCount,f=e.title,m=e.clapCount,g=u.useState(!1),C=s()(g,2),h=C[0],b=C[1],w=u.useCallback(i()(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!l||h){e.next=8;break}return b(!0),e.prev=2,e.next=5,l();case 5:return e.prev=5,b(!1),e.finish(5);case 8:case"end":return e.stop()}}),e,null,[[2,,5,8]])}))),[l,h,b]);return u.createElement(c.V,{isVisible:n,hide:t,withAnimation:!0},u.createElement(p.x,{maxWidth:"550px",sm:{paddingTop:"0"},paddingTop:"88px"},u.createElement(p.x,{display:"flex",flexDirection:"column",marginBottom:"24px",textAlign:"center"},u.createElement(v.X6,{scale:"S"},m," claps from ",a," ",1===a?"person":"people",' for "',f,'"')),r,l&&u.createElement(p.x,{display:"flex",flexDirection:"column",margin:"24px",alignItems:"center"},u.createElement(d.z,{buttonStyle:"SOCIAL",size:"SMALL",onClick:w},"Show more claps"))))}},13195:(e,n,t)=>{"use strict";t.d(n,{CP:()=>E});var r=t(59713),o=t.n(r),l=t(63038),i=t.n(l),a=t(28655),s=t.n(a),u=t(71439),c=t(46829),p=t(67294),d=t(22802),v=t(11462);function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?f(Object(t),!0).forEach((function(n){o()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function g(){var e=s()(["\n  mutation ClapMutation($targetPostId: ID!, $userId: ID!, $numClaps: Int!) {\n    clap(targetPostId: $targetPostId, userId: $userId, numClaps: $numClaps) {\n      viewerEdge {\n        ...ClapMutation_viewerEdge\n      }\n      ...ClapMutation_post\n    }\n  }\n  ","\n  ","\n"]);return g=function(){return e},e}function C(){var e=s()(["\n  fragment ClapMutation_viewerEdge on PostViewerEdge {\n    __typename\n    id\n    clapCount\n  }\n"]);return C=function(){return e},e}function h(){var e=s()(["\n  fragment ClapMutation_post on Post {\n    __typename\n    id\n    clapCount\n    ...MultiVoteCount_post\n  }\n  ","\n"]);return h=function(){return e},e}var b=(0,u.Ps)(h(),d.U),w=(0,u.Ps)(C()),x=(0,u.Ps)(g(),b,w),E=function(){var e=(0,c.useMutation)(x),n=i()(e,1)[0];return(0,p.useCallback)((function(e,t,r,o){var l;return n({variables:{targetPostId:e.id,userId:t,numClaps:r},optimisticResponse:{clap:m(m({__typename:"Post"},e),{},{clapCount:(null!==(l=e.clapCount)&&void 0!==l?l:0)+r,viewerEdge:{__typename:"PostViewerEdge",id:(0,v.Q)(e.id,t),clapCount:r}})},update:function(n,t){var l,i,a=null==t||null===(l=t.data)||void 0===l?void 0:l.clap;if(a){var s=n.readFragment({id:"Post:".concat(a.id),fragment:b,fragmentName:"ClapMutation_post"});n.writeFragment({id:"Post:".concat(a.id),fragment:b,fragmentName:"ClapMutation_post",data:m(m({},s),{},{clapCount:(null!==(i=e.clapCount)&&void 0!==i?i:0)+r,viewerClapCount:((null==o?void 0:o.clapCount)||0)+r})})}}})}),[])}},22802:(e,n,t)=>{"use strict";t.d(n,{_:()=>_,U:()=>O});var r=t(28655),o=t.n(r),l=t(71439),i=t(67294),a=t(47628),s=t(319),u=t.n(s),c=t(82492),p=t.n(c),d=t(80439),v=t(73130),f=t(45365),m=t(32317),g=t(47431);function C(){var e=o()(["\n  query PostVotersDialogQuery($postId: ID!, $pagingOptions: PagingOptions) {\n    post(id: $postId) {\n      id\n      title\n      clapCount\n      voterCount\n      voters(paging: $pagingOptions) {\n        items {\n          user {\n            id\n            ...UserFollowButton_user\n            ...Voter_user\n          }\n          clapCount\n        }\n        pagingInfo {\n          next {\n            page\n          }\n        }\n      }\n      ...UserFollowButton_post\n    }\n  }\n  ","\n  ","\n  ","\n"]);return C=function(){return e},e}var h=function(e){var n=e.post,t=e.hide,r=e.isVisible,o=e.fetchMore;if(!n)return null;var l=n.title,a=n.voters,s=n.clapCount,u=n.voterCount;return i.createElement(v.x,{isVisible:r,fetchMore:o,hide:t,title:l,clapCount:null!=s?s:0,voterCount:null!=u?u:0,voters:a?a.items.map((function(e){var t=e.user,r=e.clapCount;return t&&i.createElement(f.a,{user:t,clapCount:r,key:t.id,followButton:i.createElement(m.Bv,{buttonSize:"SMALL",post:n,user:t,susiEntry:"follow_list"})})})):null})};function b(e){var n=e.postId,t=e.isVisible,r=e.hide;return t?i.createElement(d.AE,{ssr:!1,query:w,variables:{postId:n,pagingOptions:{limit:10}}},(function(e){var n,o=e.data,l=(o=void 0===o?{}:o).post,a=e.loading,s=e.error,c=e.fetchMore;if(a)return i.createElement(g.T,null);if(s||null==l||!l.voters)return null;var d=l.voters.pagingInfo&&l.voters.pagingInfo.next;if(d){var v={page:d.page};n=function(){return c({variables:{pagingOptions:v},updateQuery:function(e,n){var t,r,o,l,i,a,s=n.fetchMoreResult;return p()({},s,{post:{voters:{items:[].concat(u()(null!==(t=null==e||null===(r=e.post)||void 0===r||null===(o=r.voters)||void 0===o?void 0:o.items)&&void 0!==t?t:[]),u()(null!==(l=null==s||null===(i=s.post)||void 0===i||null===(a=i.voters)||void 0===a?void 0:a.items)&&void 0!==l?l:[]))}}})}})}}return i.createElement(h,{hide:r,fetchMore:n,post:l,isVisible:t})})):null}var w=(0,l.Ps)(C(),f.J,m.sj,m.S$);function x(){var e=o()(["\n  fragment PostVotersNetwork_post on Post {\n    id\n    voterCount\n    recommenders {\n      name\n    }\n  }\n"]);return x=function(){return e},e}t(23450);var E=(0,l.Ps)(x()),y=t(30020),P=t(66227);function I(){var e=o()(["\n  fragment MultiVoteCount_post on Post {\n    id\n    ...PostVotersNetwork_post\n  }\n  ","\n"]);return I=function(){return e},e}function _(e){var n=e.clapCount,t=e.hasLabel,r=void 0!==t&&t,o=e.showFullNumber,l=void 0!==o&&o,s=e.post,u=e.hasDialog,c=void 0!==u&&u,p=e.shouldShowResponsiveLabelText,d=void 0!==p&&p,v=e.shouldHideClapsText,f=void 0!==v&&v,m=e.countColor,g=e.countScale,C=s.id;if(!(n>0))return null;var h=function(e){var t=e.showVoters;return i.createElement(a.$,{showVoters:t,hasLabel:r,showFullNumber:l,shouldShowResponsiveLabelText:d,shouldHideClapsText:f,clapCount:n,countColor:m,countScale:g})};return c&&C?i.createElement(P.B,null,(function(e){var n=e.isVisible,t=e.show,r=e.hide;return i.createElement(i.Fragment,null,i.createElement(y._,{tooltipText:"View Claps",targetDistance:15},i.createElement(h,{showVoters:t})),i.createElement(b,{isVisible:n,hide:r,postId:C}))})):i.createElement(h,null)}var O=(0,l.Ps)(I(),E)},17878:(e,n,t)=>{"use strict";t.d(n,{s:()=>u,e:()=>c});var r=t(67154),o=t.n(r),l=t(6479),i=t.n(l),a=t(67294),s=t(77355),u=function(e){var n=e.xs,t=e.sm,r=e.children,l=i()(e,["xs","sm","children"]);return a.createElement(s.x,o()({xs:{display:"none"},sm:{display:n?"inline-block":"none"},md:{display:n||t?"inline-block":"none"},lg:{display:"inline-block"},xl:{display:"inline-block"},tag:"span"},l),r)},c=function(e){var n=e.xs,t=e.sm,r=e.children,l=i()(e,["xs","sm","children"]);return a.createElement(s.x,o()({xs:{display:"inline-block"},sm:{display:n?"none":"inline-block"},md:{display:n||t?"none":"inline-block"},lg:{display:"none"},xl:{display:"none"},tag:"span"},l),r)}},51681:(e,n,t)=>{"use strict";function r(e,n,t){return!!n&&e[n.id]||{clapCount:(null==n?void 0:n.clapCount)||0,viewerClapCount:(null==t?void 0:t.clapCount)||0,viewerHasClappedSinceFetch:!1}}t.d(n,{l:()=>r})}}]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/97332.9da11470.chunk.js.map