_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[54],{"+fu8":function(t,e,n){"use strict";n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return p}));var r=n("aWzz"),o=n.n(r),i=n("ERkP"),a=n.n(i),c=n("O94r"),l=n.n(c),s=["className","top","left","offsetLeft","offsetTop","style","children","unstyled","applyPositionStyle"];function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var f={position:"absolute",backgroundColor:"white",color:"#666666",padding:".3rem .5rem",borderRadius:"3px",fontSize:"14px",boxShadow:"0 1px 2px rgba(33,33,33,0.2)",lineHeight:"1em",pointerEvents:"none"};function p(t){var e=t.className,n=t.top,r=t.left,o=t.offsetLeft,i=void 0===o?10:o,c=t.offsetTop,p=void 0===c?10:c,d=t.style,h=void 0===d?f:d,v=t.children,y=t.unstyled,m=void 0!==y&&y,g=t.applyPositionStyle,b=void 0!==g&&g,x=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,s);return a.a.createElement("div",u({className:l()("visx-tooltip",e),style:u({top:null==n||null==p?n:n+p,left:null==r||null==i?r:r+i},b&&{position:"absolute"},!m&&h)},x),v)}p.propTypes={children:o.a.node,className:o.a.string,left:o.a.number,offsetLeft:o.a.number,offsetTop:o.a.number,top:o.a.number,applyPositionStyle:o.a.bool,unstyled:o.a.bool}},"0RyW":function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var r=n("ERkP"),o=n.n(r),i=n("7nmT"),a=n.n(i);function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={top:0,right:0,bottom:0,left:0,width:0,height:0};function p(t){var e,n;return n=e=function(e){var n,r;function i(t){var n;return u(l(n=e.call(this,t)||this),"node",void 0),n.state={rect:void 0,parentRect:void 0},n.getRects=n.getRects.bind(l(n)),n}r=e,(n=i).prototype=Object.create(r.prototype),n.prototype.constructor=n,s(n,r);var p=i.prototype;return p.componentDidMount=function(){var t=this;this.node=a.a.findDOMNode(this),this.setState((function(){return t.getRects()}))},p.getRects=function(){if(!this.node)return this.state;var t=this.node,e=t.parentNode;return{rect:t.getBoundingClientRect?t.getBoundingClientRect():f,parentRect:null!=e&&e.getBoundingClientRect?e.getBoundingClientRect():f}},p.render=function(){return o.a.createElement(t,c({getRects:this.getRects},this.state,this.props))},i}(o.a.PureComponent),u(e,"displayName","withBoundingRects("+(t.displayName||"")+")"),n}},"8/jq":function(t,e,n){"use strict";var r=n("ERkP"),o=n.n(r),i=n("0RyW"),a=n("+fu8"),c=["children","getRects","left","offsetLeft","offsetTop","parentRect","rect","style","top","unstyled"];function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}e.a=Object(i.a)((function(t){var e,n=t.children,r=(t.getRects,t.left),i=void 0===r?0:r,s=t.offsetLeft,u=void 0===s?10:s,f=t.offsetTop,p=void 0===f?10:f,d=t.parentRect,h=t.rect,v=t.style,y=void 0===v?a.b:v,m=t.top,g=void 0===m?0:m,b=t.unstyled,x=void 0!==b&&b,O=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,c);if(h&&d){var k=i,j=g,w=!1,T=!1;if(d.width){var _=k+u+h.width-d.width,E=h.width-k-u;w=_>0&&_>E}else{var S=k+u+h.width-window.innerWidth,R=h.width-k-u;w=S>0&&S>R}if(d.height){var D=j+p+h.height-d.height,P=h.height-j-p;T=D>0&&D>P}else T=j+p+h.height>window.innerHeight;k=w?k-h.width-u:k+u,j=T?j-h.height-p:j+p,e="translate("+(k=Math.round(k))+"px, "+(j=Math.round(j))+"px)"}return o.a.createElement(a.a,l({style:l({left:0,top:0,transform:e},!x&&y)},O),n)}))},"9Jhr":function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));var r=n("ERkP"),o=n.n(r),i=n("O94r"),a=n.n(i),c=n("1Wmu"),l=n("dGDr"),s=["x","x0","x1","y","y1","y0","yScale","data","defined","className","curve","innerRef","children"];function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function f(t){var e=t.x,n=t.x0,r=t.x1,i=t.y,f=t.y1,p=t.y0,d=t.yScale,h=t.data,v=void 0===h?[]:h,y=t.defined,m=void 0===y?function(){return!0}:y,g=t.className,b=t.curve,x=t.innerRef,O=t.children,k=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,s),j=Object(l.b)({x:e,x0:n,x1:r,defined:m,curve:b});return null==p?j.y0(d.range()[0]):Object(c.a)(j.y0,p),i&&!f&&Object(c.a)(j.y1,i),f&&!i&&Object(c.a)(j.y1,f),O?o.a.createElement(o.a.Fragment,null,O({path:j})):o.a.createElement("path",u({ref:x,className:a()("visx-area-closed",g),d:j(v)||""},k))}},"Cf/J":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n("aWzz"),o=n.n(r),i=n("ERkP"),a=n.n(i),c=["children","id","from","to","x1","y1","x2","y2","fromOffset","fromOpacity","toOffset","toOpacity","rotate","transform","vertical"];function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t){var e=t.children,n=t.id,r=t.from,o=t.to,i=t.x1,s=t.y1,u=t.x2,f=t.y2,p=t.fromOffset,d=void 0===p?"0%":p,h=t.fromOpacity,v=void 0===h?1:h,y=t.toOffset,m=void 0===y?"100%":y,g=t.toOpacity,b=void 0===g?1:g,x=t.rotate,O=t.transform,k=t.vertical,j=void 0===k||k,w=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,c),T=i,_=u,E=s,S=f;return!j||T||_||E||S||(T="0",_="0",E="0",S="1"),a.a.createElement("defs",null,a.a.createElement("linearGradient",l({id:n,x1:T,y1:E,x2:_,y2:S,gradientTransform:x?"rotate("+x+")":O},w),!!e&&e,!e&&a.a.createElement("stop",{offset:d,stopColor:r,stopOpacity:v}),!e&&a.a.createElement("stop",{offset:m,stopColor:o,stopOpacity:b})))}s.propTypes={id:o.a.string.isRequired,from:o.a.string,to:o.a.string,x1:o.a.oneOfType([o.a.string,o.a.number]),x2:o.a.oneOfType([o.a.string,o.a.number]),y1:o.a.oneOfType([o.a.string,o.a.number]),y2:o.a.oneOfType([o.a.string,o.a.number]),fromOffset:o.a.oneOfType([o.a.string,o.a.number]),fromOpacity:o.a.oneOfType([o.a.string,o.a.number]),toOffset:o.a.oneOfType([o.a.string,o.a.number]),toOpacity:o.a.oneOfType([o.a.string,o.a.number]),rotate:o.a.oneOfType([o.a.string,o.a.number]),transform:o.a.string,children:o.a.node,vertical:o.a.bool}},DTjC:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/areas",function(){return n("SYW9")}])},EbDF:function(t,e,n){"use strict";function r(t){return t<0?-1:1}function o(t,e,n){var o=t._x1-t._x0,i=e-t._x1,a=(t._y1-t._y0)/(o||i<0&&-0),c=(n-t._y1)/(i||o<0&&-0),l=(a*i+c*o)/(o+i);return(r(a)+r(c))*Math.min(Math.abs(a),Math.abs(c),.5*Math.abs(l))||0}function i(t,e){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-e)/2:e}function a(t,e,n){var r=t._x0,o=t._y0,i=t._x1,a=t._y1,c=(i-r)/3;t._context.bezierCurveTo(r+c,o+c*e,i-c,a-c*n,i,a)}function c(t){this._context=t}function l(t){this._context=new s(t)}function s(t){this._context=t}function u(t){return new c(t)}function f(t){return new l(t)}n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return f})),c.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:a(this,this._t0,i(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){var n=NaN;if(e=+e,(t=+t)!==this._x1||e!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,a(this,i(this,n=o(this,t,e)),n);break;default:a(this,this._t0,n=o(this,t,e))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e,this._t0=n}}},(l.prototype=Object.create(c.prototype)).point=function(t,e){c.prototype.point.call(this,e,t)},s.prototype={moveTo:function(t,e){this._context.moveTo(e,t)},closePath:function(){this._context.closePath()},lineTo:function(t,e){this._context.lineTo(e,t)},bezierCurveTo:function(t,e,n,r,o,i){this._context.bezierCurveTo(e,t,r,n,i,o)}}},HlJr:function(t,e,n){"use strict";function r(t){if(("function"===typeof t||"object"===typeof t&&t)&&"valueOf"in t){var e=t.valueOf();if("number"===typeof e)return e}return t}n.d(e,"a",(function(){return r}))},Ifh9:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));var r=n("aWzz"),o=n.n(r),i=n("ERkP"),a=n.n(i),c=n("O94r"),l=n.n(c),s=n("hsl+"),u=n.n(s),f=n("JmwF"),p=n("rkTo"),d=n("nNND"),h=n("HlJr"),v=n("tZ4l"),y=["top","left","scale","width","stroke","strokeWidth","strokeDasharray","className","children","numTicks","lineStyle","offset","tickValues"];function m(){return(m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function g(t){var e=t.top,n=void 0===e?0:e,r=t.left,o=void 0===r?0:r,i=t.scale,c=t.width,s=t.stroke,g=void 0===s?"#eaf0f6":s,b=t.strokeWidth,x=void 0===b?1:b,O=t.strokeDasharray,k=t.className,j=t.children,w=t.numTicks,T=void 0===w?10:w,_=t.lineStyle,E=t.offset,S=t.tickValues,R=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,y),D=null!=S?S:Object(d.a)(i,T),P=(null!=E?E:0)+Object(v.a)(i)/2,N=D.map((function(t){var e,n=(null!=(e=Object(h.a)(i(t)))?e:0)+P;return{from:new p.a({x:0,y:n}),to:new p.a({x:c,y:n})}}));return a.a.createElement(f.a,{className:l()("visx-rows",k),top:n,left:o},j?j({lines:N}):N.map((function(t,e){var n=t.from,r=t.to;return a.a.createElement(u.a,m({key:"row-line-"+e,from:n,to:r,stroke:g,strokeWidth:x,strokeDasharray:O,style:_},R))})))}g.propTypes={tickValues:o.a.array,width:o.a.number.isRequired}},JmwF:function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));var r=n("aWzz"),o=n.n(r),i=n("ERkP"),a=n.n(i),c=n("O94r"),l=n.n(c),s=["top","left","transform","className","children","innerRef"];function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function f(t){var e=t.top,n=void 0===e?0:e,r=t.left,o=void 0===r?0:r,i=t.transform,c=t.className,f=t.children,p=t.innerRef,d=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,s);return a.a.createElement("g",u({ref:p,className:l()("visx-group",c),transform:i||"translate("+o+", "+n+")"},d),f)}f.propTypes={top:o.a.number,left:o.a.number,transform:o.a.string,className:o.a.string,children:o.a.node,innerRef:o.a.oneOfType([o.a.string,o.a.func,o.a.object])}},QnoR:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n("ERkP"),o=["tooltipOpen"];function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function a(t){var e=Object(r.useState)(i({tooltipOpen:!1},t)),n=e[0],a=e[1],c=Object(r.useCallback)((function(t){return a("function"===typeof t?function(e){e.tooltipOpen;var n=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(e,o);return i({},t(n),{tooltipOpen:!0})}:{tooltipOpen:!0,tooltipLeft:t.tooltipLeft,tooltipTop:t.tooltipTop,tooltipData:t.tooltipData})}),[a]),l=Object(r.useCallback)((function(){return a({tooltipOpen:!1,tooltipLeft:void 0,tooltipTop:void 0,tooltipData:void 0})}),[a]);return{tooltipOpen:n.tooltipOpen,tooltipLeft:n.tooltipLeft,tooltipTop:n.tooltipTop,tooltipData:n.tooltipData,updateTooltip:a,showTooltip:c,hideTooltip:l}}},SYW9:function(t,e,n){"use strict";n.r(e);var r=n("jg1C"),o=(n("ERkP"),n("6wy5")),i=n("qyW2"),a=n("bf+l");e.default=function(){return Object(r.jsx)(o.a,{component:i.c,title:"Areas",codeSandboxDirectoryName:"visx-area",packageJson:a,children:"import React, { useMemo, useCallback } from 'react';\nimport { AreaClosed, Line, Bar } from '@visx/shape';\nimport appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';\nimport { curveMonotoneX } from '@visx/curve';\nimport { GridRows, GridColumns } from '@visx/grid';\nimport { scaleTime, scaleLinear } from '@visx/scale';\nimport { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';\nimport { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';\nimport { localPoint } from '@visx/event';\nimport { LinearGradient } from '@visx/gradient';\nimport { max, extent, bisector } from 'd3-array';\nimport { timeFormat } from 'd3-time-format';\n\ntype TooltipData = AppleStock;\n\nconst stock = appleStock.slice(800);\nexport const background = '#3b6978';\nexport const background2 = '#204051';\nexport const accentColor = '#edffea';\nexport const accentColorDark = '#75daad';\nconst tooltipStyles = {\n  ...defaultStyles,\n  background,\n  border: '1px solid white',\n  color: 'white',\n};\n\n// util\nconst formatDate = timeFormat(\"%b %d, '%y\");\n\n// accessors\nconst getDate = (d: AppleStock) => new Date(d.date);\nconst getStockValue = (d: AppleStock) => d.close;\nconst bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left;\n\nexport type AreaProps = {\n  width: number;\n  height: number;\n  margin?: { top: number; right: number; bottom: number; left: number };\n};\n\nexport default withTooltip<AreaProps, TooltipData>(\n  ({\n    width,\n    height,\n    margin = { top: 0, right: 0, bottom: 0, left: 0 },\n    showTooltip,\n    hideTooltip,\n    tooltipData,\n    tooltipTop = 0,\n    tooltipLeft = 0,\n  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {\n    if (width < 10) return null;\n\n    // bounds\n    const innerWidth = width - margin.left - margin.right;\n    const innerHeight = height - margin.top - margin.bottom;\n\n    // scales\n    const dateScale = useMemo(\n      () =>\n        scaleTime({\n          range: [margin.left, innerWidth + margin.left],\n          domain: extent(stock, getDate) as [Date, Date],\n        }),\n      [innerWidth, margin.left],\n    );\n    const stockValueScale = useMemo(\n      () =>\n        scaleLinear({\n          range: [innerHeight + margin.top, margin.top],\n          domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],\n          nice: true,\n        }),\n      [margin.top, innerHeight],\n    );\n\n    // tooltip handler\n    const handleTooltip = useCallback(\n      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {\n        const { x } = localPoint(event) || { x: 0 };\n        const x0 = dateScale.invert(x);\n        const index = bisectDate(stock, x0, 1);\n        const d0 = stock[index - 1];\n        const d1 = stock[index];\n        let d = d0;\n        if (d1 && getDate(d1)) {\n          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;\n        }\n        showTooltip({\n          tooltipData: d,\n          tooltipLeft: x,\n          tooltipTop: stockValueScale(getStockValue(d)),\n        });\n      },\n      [showTooltip, stockValueScale, dateScale],\n    );\n\n    return (\n      <div>\n        <svg width={width} height={height}>\n          <rect\n            x={0}\n            y={0}\n            width={width}\n            height={height}\n            fill=\"url(#area-background-gradient)\"\n            rx={14}\n          />\n          <LinearGradient id=\"area-background-gradient\" from={background} to={background2} />\n          <LinearGradient id=\"area-gradient\" from={accentColor} to={accentColor} toOpacity={0.1} />\n          <GridRows\n            left={margin.left}\n            scale={stockValueScale}\n            width={innerWidth}\n            strokeDasharray=\"1,3\"\n            stroke={accentColor}\n            strokeOpacity={0}\n            pointerEvents=\"none\"\n          />\n          <GridColumns\n            top={margin.top}\n            scale={dateScale}\n            height={innerHeight}\n            strokeDasharray=\"1,3\"\n            stroke={accentColor}\n            strokeOpacity={0.2}\n            pointerEvents=\"none\"\n          />\n          <AreaClosed<AppleStock>\n            data={stock}\n            x={(d) => dateScale(getDate(d)) ?? 0}\n            y={(d) => stockValueScale(getStockValue(d)) ?? 0}\n            yScale={stockValueScale}\n            strokeWidth={1}\n            stroke=\"url(#area-gradient)\"\n            fill=\"url(#area-gradient)\"\n            curve={curveMonotoneX}\n          />\n          <Bar\n            x={margin.left}\n            y={margin.top}\n            width={innerWidth}\n            height={innerHeight}\n            fill=\"transparent\"\n            rx={14}\n            onTouchStart={handleTooltip}\n            onTouchMove={handleTooltip}\n            onMouseMove={handleTooltip}\n            onMouseLeave={() => hideTooltip()}\n          />\n          {tooltipData && (\n            <g>\n              <Line\n                from={{ x: tooltipLeft, y: margin.top }}\n                to={{ x: tooltipLeft, y: innerHeight + margin.top }}\n                stroke={accentColorDark}\n                strokeWidth={2}\n                pointerEvents=\"none\"\n                strokeDasharray=\"5,2\"\n              />\n              <circle\n                cx={tooltipLeft}\n                cy={tooltipTop + 1}\n                r={4}\n                fill=\"black\"\n                fillOpacity={0.1}\n                stroke=\"black\"\n                strokeOpacity={0.1}\n                strokeWidth={2}\n                pointerEvents=\"none\"\n              />\n              <circle\n                cx={tooltipLeft}\n                cy={tooltipTop}\n                r={4}\n                fill={accentColorDark}\n                stroke=\"white\"\n                strokeWidth={2}\n                pointerEvents=\"none\"\n              />\n            </g>\n          )}\n        </svg>\n        {tooltipData && (\n          <div>\n            <TooltipWithBounds\n              key={Math.random()}\n              top={tooltipTop - 12}\n              left={tooltipLeft + 12}\n              style={tooltipStyles}\n            >\n              {`$${getStockValue(tooltipData)}`}\n            </TooltipWithBounds>\n            <Tooltip\n              top={innerHeight + margin.top - 14}\n              left={tooltipLeft}\n              style={{\n                ...defaultStyles,\n                minWidth: 72,\n                textAlign: 'center',\n                transform: 'translateX(-50%)',\n              }}\n            >\n              {formatDate(getDate(tooltipData))}\n            </Tooltip>\n          </div>\n        )}\n      </div>\n    );\n  },\n);\n"})}},"VB+g":function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("rkTo"),o=n("ZQHj");function i(){return(i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var a={x:0,y:0};function c(t,e){if(!t||!e)return null;var n=function(t){if(!t)return i({},a);if(Object(o.g)(t))return t.changedTouches.length>0?{x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}:i({},a);if(Object(o.c)(t))return{x:t.clientX,y:t.clientY};var e=null==t?void 0:t.target,n=e&&"getBoundingClientRect"in e?e.getBoundingClientRect():null;return n?{x:n.x+n.width/2,y:n.y+n.height/2}:i({},a)}(e),c=Object(o.d)(t)?t.ownerSVGElement:t,l=Object(o.e)(c)?c.getScreenCTM():null;if(Object(o.f)(c)&&l){var s=c.createSVGPoint();return s.x=n.x,s.y=n.y,s=s.matrixTransform(l.inverse()),new r.a({x:s.x,y:s.y})}var u=t.getBoundingClientRect();return new r.a({x:n.x-u.left-t.clientLeft,y:n.y-u.top-t.clientTop})}},WqRU:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n("ERkP"),o=n.n(r),i=n("O94r"),a=n.n(i),c=["from","to","fill","className","innerRef"];function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t){var e=t.from,n=void 0===e?{x:0,y:0}:e,r=t.to,i=void 0===r?{x:1,y:1}:r,s=t.fill,u=void 0===s?"transparent":s,f=t.className,p=t.innerRef,d=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,c),h=n.x===i.x||n.y===i.y;return o.a.createElement("line",l({ref:p,className:a()("visx-line",f),x1:n.x,y1:n.y,x2:i.x,y2:i.y,fill:u,shapeRendering:h?"crispEdges":"auto"},d))}},ZQHj:function(t,e,n){"use strict";function r(t){return!!t&&t instanceof Element}function o(t){return!!t&&(t instanceof SVGElement||"ownerSVGElement"in t)}function i(t){return!!t&&"createSVGPoint"in t}function a(t){return!!t&&"getScreenCTM"in t}function c(t){return!!t&&"changedTouches"in t}function l(t){return!!t&&"clientX"in t}function s(t){return!!t&&(t instanceof Event||"nativeEvent"in t&&t.nativeEvent instanceof Event)}n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return o})),n.d(e,"f",(function(){return i})),n.d(e,"e",(function(){return a})),n.d(e,"g",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return s}))},"bf+l":function(t){t.exports=JSON.parse('{"name":"@visx/demo-area","description":"Standalone visx area demo.","main":"index.tsx","private":true,"dependencies":{"@babel/runtime":"^7.8.4","@types/react":"^17","@types/react-dom":"^17","@visx/curve":"latest","@visx/event":"latest","@visx/gradient":"latest","@visx/grid":"latest","@visx/mock-data":"latest","@visx/responsive":"latest","@visx/scale":"latest","@visx/shape":"latest","@visx/tooltip":"latest","d3-array":"^2.4.0","d3-time-format":"2.2.3","react":"^17","react-dom":"^17","react-scripts-ts":"3.1.0","typescript":"^3"},"keywords":["visualization","d3","react","visx","area"]}')},eMuC:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));var r=n("aWzz"),o=n.n(r),i=n("ERkP"),a=n.n(i),c=n("O94r"),l=n.n(c),s=n("hsl+"),u=n.n(s),f=n("JmwF"),p=n("rkTo"),d=n("nNND"),h=n("HlJr"),v=n("tZ4l"),y=["top","left","scale","height","stroke","strokeWidth","strokeDasharray","className","numTicks","lineStyle","offset","tickValues","children"];function m(){return(m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function g(t){var e=t.top,n=void 0===e?0:e,r=t.left,o=void 0===r?0:r,i=t.scale,c=t.height,s=t.stroke,g=void 0===s?"#eaf0f6":s,b=t.strokeWidth,x=void 0===b?1:b,O=t.strokeDasharray,k=t.className,j=t.numTicks,w=void 0===j?10:j,T=t.lineStyle,_=t.offset,E=t.tickValues,S=t.children,R=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,y),D=null!=E?E:Object(d.a)(i,w),P=(null!=_?_:0)+Object(v.a)(i)/2,N=D.map((function(t){var e,n=(null!=(e=Object(h.a)(i(t)))?e:0)+P;return{from:new p.a({x:n,y:0}),to:new p.a({x:n,y:c})}}));return a.a.createElement(f.a,{className:l()("visx-columns",k),top:n,left:o},S?S({lines:N}):N.map((function(t,e){var n=t.from,r=t.to;return a.a.createElement(u.a,m({key:"column-line-"+e,from:n,to:r,stroke:g,strokeWidth:x,strokeDasharray:O,style:T},R))})))}g.propTypes={tickValues:o.a.array,height:o.a.number.isRequired}},g2fB:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n("ERkP"),o=n.n(r),i=n("O94r"),a=n.n(i),c=["className","innerRef"];function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t){var e=t.className,n=t.innerRef,r=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,c);return o.a.createElement("rect",l({ref:n,className:a()("visx-bar",e)},r))}},"hsl+":function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t){var e=t.from,n=void 0===e?{x:0,y:0}:e,a=t.to,l=void 0===a?{x:1,y:1}:a,s=t.fill,u=void 0===s?"transparent":s,f=t.className,p=t.innerRef,d=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,i),h=n.x===l.x||n.y===l.y;return r.default.createElement("line",c({ref:p,className:(0,o.default)("visx-line",f),x1:n.x,y1:n.y,x2:l.x,y2:l.y,fill:u,shapeRendering:h?"crispEdges":"auto"},d))};var r=a(n("ERkP")),o=a(n("O94r")),i=["from","to","fill","className","innerRef"];function a(t){return t&&t.__esModule?t:{default:t}}function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}},jpI8:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n("VB+g"),o=n("ZQHj");function i(t,e){if(Object(o.a)(t)&&e)return Object(r.a)(t,e);if(Object(o.b)(t)){var n=t,i=n.target;if(i)return Object(r.a)(i,n)}return null}},nNND:function(t,e,n){"use strict";function r(t,e){var n=t;return"ticks"in n?n.ticks(e):n.domain().filter((function(t,n,r){return null==e||r.length<=e||n%Math.round((r.length-1)/e)===0}))}n.d(e,"a",(function(){return r}))},qyW2:function(t,e,n){"use strict";n.d(e,"b",(function(){return _})),n.d(e,"a",(function(){return E}));var r=n("zjfJ"),o=n("jg1C"),i=n("ERkP"),a=n("9Jhr"),c=n("g2fB"),l=n("WqRU"),s=n("oT5u"),u=n.n(s),f=n("EbDF"),p=n("Ifh9"),d=n("eMuC"),h=n("cjvV"),v=n("67po"),y=n("+fu8"),m=n("xc3W"),g=n("8/jq"),b=n("jpI8"),x=n("Cf/J"),O=n("ue4z"),k=n("mHfT");function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var T=u.a.slice(800),_="#3b6978",E="#edffea",S=w(w({},y.b),{},{background:_,border:"1px solid white",color:"white"}),R=Object(k.a)("%b %d, '%y"),D=function(t){return new Date(t.date)},P=function(t){return t.close},N=Object(O.a)((function(t){return new Date(t.date)})).left;e.c=Object(m.a)((function(t){var e=t.width,n=t.height,r=t.margin,s=void 0===r?{top:0,right:0,bottom:0,left:0}:r,u=t.showTooltip,m=t.hideTooltip,k=t.tooltipData,j=t.tooltipTop,C=void 0===j?0:j,W=t.tooltipLeft,M=void 0===W?0:W;if(e<10)return null;var L=e-s.left-s.right,V=n-s.top-s.bottom,A=Object(i.useMemo)((function(){return Object(h.a)({range:[s.left,L+s.left],domain:Object(O.b)(T,D)})}),[L,s.left]),z=Object(i.useMemo)((function(){return Object(v.a)({range:[V+s.top,s.top],domain:[0,(Object(O.c)(T,P)||0)+V/3],nice:!0})}),[s.top,V]),B=Object(i.useCallback)((function(t){var e=(Object(b.a)(t)||{x:0}).x,n=A.invert(e),r=N(T,n,1),o=T[r-1],i=T[r],a=o;i&&D(i)&&(a=n.valueOf()-D(o).valueOf()>D(i).valueOf()-n.valueOf()?i:o),u({tooltipData:a,tooltipLeft:e,tooltipTop:z(P(a))})}),[u,z,A]);return Object(o.jsxs)("div",{children:[Object(o.jsxs)("svg",{width:e,height:n,children:[Object(o.jsx)("rect",{x:0,y:0,width:e,height:n,fill:"url(#area-background-gradient)",rx:14}),Object(o.jsx)(x.a,{id:"area-background-gradient",from:_,to:"#204051"}),Object(o.jsx)(x.a,{id:"area-gradient",from:E,to:E,toOpacity:.1}),Object(o.jsx)(p.a,{left:s.left,scale:z,width:L,strokeDasharray:"1,3",stroke:E,strokeOpacity:0,pointerEvents:"none"}),Object(o.jsx)(d.a,{top:s.top,scale:A,height:V,strokeDasharray:"1,3",stroke:E,strokeOpacity:.2,pointerEvents:"none"}),Object(o.jsx)(a.a,{data:T,x:function(t){var e;return null!==(e=A(D(t)))&&void 0!==e?e:0},y:function(t){var e;return null!==(e=z(P(t)))&&void 0!==e?e:0},yScale:z,strokeWidth:1,stroke:"url(#area-gradient)",fill:"url(#area-gradient)",curve:f.a}),Object(o.jsx)(c.a,{x:s.left,y:s.top,width:L,height:V,fill:"transparent",rx:14,onTouchStart:B,onTouchMove:B,onMouseMove:B,onMouseLeave:function(){return m()}}),k&&Object(o.jsxs)("g",{children:[Object(o.jsx)(l.a,{from:{x:M,y:s.top},to:{x:M,y:V+s.top},stroke:"#75daad",strokeWidth:2,pointerEvents:"none",strokeDasharray:"5,2"}),Object(o.jsx)("circle",{cx:M,cy:C+1,r:4,fill:"black",fillOpacity:.1,stroke:"black",strokeOpacity:.1,strokeWidth:2,pointerEvents:"none"}),Object(o.jsx)("circle",{cx:M,cy:C,r:4,fill:"#75daad",stroke:"white",strokeWidth:2,pointerEvents:"none"})]})]}),k&&Object(o.jsxs)("div",{children:[Object(o.jsx)(g.a,{top:C-12,left:M+12,style:S,children:"$".concat(P(k))},Math.random()),Object(o.jsx)(y.a,{top:V+s.top-14,left:M,style:w(w({},y.b),{},{minWidth:72,textAlign:"center",transform:"translateX(-50%)"}),children:R(D(k))})]})]})}));try{Example.displayName="Example",Example.__docgenInfo={description:"",displayName:"Example",props:{width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"number"}},margin:{defaultValue:null,description:"",name:"margin",required:!1,type:{name:"{ top: number; right: number; bottom: number; left: number; } | undefined"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/sandboxes/visx-area/Example.tsx#Example"]={docgenInfo:Example.__docgenInfo,name:"Example",path:"src/sandboxes/visx-area/Example.tsx#Example"})}catch(C){}},rkTo:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return o}));var o=function(){function t(t){var e=t.x,n=void 0===e?0:e,o=t.y,i=void 0===o?0:o;r(this,"x",0),r(this,"y",0),this.x=n,this.y=i}var e=t.prototype;return e.value=function(){return{x:this.x,y:this.y}},e.toArray=function(){return[this.x,this.y]},t}()},tZ4l:function(t,e,n){"use strict";function r(t){return"bandwidth"in t?t.bandwidth():0}n.d(e,"a",(function(){return r}))},ue4z:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return u})),n.d(e,"e",(function(){return l})),n.d(e,"f",(function(){return f}));var r=function(t,e){return t<e?-1:t>e?1:t>=e?0:NaN},o=function(t){var e;return 1===t.length&&(e=t,t=function(t,n){return r(e(t),n)}),{left:function(e,n,r,o){for(null==r&&(r=0),null==o&&(o=e.length);r<o;){var i=r+o>>>1;t(e[i],n)<0?r=i+1:o=i}return r},right:function(e,n,r,o){for(null==r&&(r=0),null==o&&(o=e.length);r<o;){var i=r+o>>>1;t(e[i],n)>0?o=i:r=i+1}return r}}};var i=o(r);i.right,i.left;var a=function(t,e){var n,r,o,i=t.length,a=-1;if(null==e){for(;++a<i;)if(null!=(n=t[a])&&n>=n)for(r=o=n;++a<i;)null!=(n=t[a])&&(r>n&&(r=n),o<n&&(o=n))}else for(;++a<i;)if(null!=(n=e(t[a],a,t))&&n>=n)for(r=o=n;++a<i;)null!=(n=e(t[a],a,t))&&(r>n&&(r=n),o<n&&(o=n));return[r,o]},c=Array.prototype,l=(c.slice,c.map,function(t,e,n){t=+t,e=+e,n=(o=arguments.length)<2?(e=t,t=0,1):o<3?1:+n;for(var r=-1,o=0|Math.max(0,Math.ceil((e-t)/n)),i=new Array(o);++r<o;)i[r]=t+r*n;return i});Math.sqrt(50),Math.sqrt(10),Math.sqrt(2);var s=function(t,e){var n,r,o=t.length,i=-1;if(null==e){for(;++i<o;)if(null!=(n=t[i])&&n>=n)for(r=n;++i<o;)null!=(n=t[i])&&n>r&&(r=n)}else for(;++i<o;)if(null!=(n=e(t[i],i,t))&&n>=n)for(r=n;++i<o;)null!=(n=e(t[i],i,t))&&n>r&&(r=n);return r},u=function(t){for(var e,n,r,o=t.length,i=-1,a=0;++i<o;)a+=t[i].length;for(n=new Array(a);--o>=0;)for(e=(r=t[o]).length;--e>=0;)n[--a]=r[e];return n},f=function(t){if(!(o=t.length))return[];for(var e=-1,n=function(t,e){var n,r,o=t.length,i=-1;if(null==e){for(;++i<o;)if(null!=(n=t[i])&&n>=n)for(r=n;++i<o;)null!=(n=t[i])&&r>n&&(r=n)}else for(;++i<o;)if(null!=(n=e(t[i],i,t))&&n>=n)for(r=n;++i<o;)null!=(n=e(t[i],i,t))&&r>n&&(r=n);return r}(t,p),r=new Array(n);++e<n;)for(var o,i=-1,a=r[e]=new Array(o);++i<o;)a[i]=t[i][e];return r};function p(t){return t.length}},xc3W:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("ERkP"),o=n.n(r),i=n("QnoR");function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function c(t,e,n){void 0===e&&(e={style:{position:"relative",width:"inherit",height:"inherit"}}),void 0===n&&(n=function(t,e){return o.a.createElement("div",e,t)});return function(r){var c=Object(i.a)();return n(o.a.createElement(t,a({},c,r)),e)}}},zjfJ:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))}},[["DTjC",0,2,1,3,4,5,6,7,11,16,17]]]);