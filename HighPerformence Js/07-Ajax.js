/*  高性能JavaScript  */ 


// ------ Ajax 性能指南


// 考虑数据传输技术时, 因素为功能集, 兼容性, 性能以及方向(发送给服务器还是接收自服务器), 
// 考虑数据格式时, 唯一比较标准为速度

// 标准JSON < 简化JSON < 数组JSON
{ id: 1, username: 'Fits', realname: 'Dave', email: 'qq@.com' } 
{ i: 1, u: 'Fits', r: 'Dave', e: 'qq@.com'}
[ 1, 'Fits', 'Dave', 'qq@.com' ]


// 缓存数据: 
// 1. 在服务端, 设置HTTP头信息以确保你的响应会被浏览器缓存 => Expires: GMT日期
// 2. 在客户端, 把获取到的信息存入本地, 从而避免再次请求 => localCache = {}













