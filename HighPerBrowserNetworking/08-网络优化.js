/*

    
  -- 减少DNS查询
    每次域名解析都需要一次网络往返, 增加请求的延迟, 在查询期间会阻塞请求


  -- 重用TCP连接
    尽可能使用持久连接, 以消除TCP握手和慢启动延迟

    HTTP1.1 
      res.setHeader('Connection', 'keep-alive')
      res.setHeader('Keep-alive', 'timeout=10') // 10s后断开
    HTTP2.0 升级使用


  -- 使用CDN
    地理上部署数据接近客户端地方, 减少TCP延迟增加吞吐量


  -- 客户端缓存资源
    Expires首部可用指定缓存时间
    Cache-Control 首部用于缓存时间
    ETag & Last-Modified提供验证机制(最后一次更新指纹&时间戳)


  -- Gzip资源
    所有文本资源都应使用Gzip压缩, 然后再在客户端&服务端传输(减少60%~80%文件大小)
    针对图片资源则需要以下考量:
      a. 去掉不必要的元数据把图片文件变小
      b. 调整大小在服务器上调整, 避免传输不必要字节
      c. 根据图片选择最优图片格式(webP)
      d. 尽可能使用有损压缩

    nginx & webpack 配置

      nginx
       gzip_comp_level 5 (级别0~9, 数值越大CPU消耗性能越大, 折中5之后对压缩&CPU平衡最佳)

      webpack(静态压缩)
        CompressionWebpackPlugin({
          ...
          compressionOptions: { level: 9 } // 压缩等级默认9
        }) 
        构建完成在生成对应文件同时, 还会生成对应.gz文件(建议压缩等级最高, 牺牲点打包时间获得更小体积包)
        nginx开启静态压缩使用http_gzip_static_module模块
        配置添加gzip_static: on; gzip_proxied expired no-cache no-store private auth即可开启静态压缩
        tips:
          1. gzip_static配置优先级高于gzip
          2. 开启静态压缩后, 任何文件都会查找存在对应gz文件, 如有则直接返回.gz文件内容
          3. gzip_types设置对gzip_static无效


  -- 避免HTTP重定向 
    这个动作极其耗时, 特别是把客户端定向到一个完全不同域名下会导致额外的DNS查询 & TCP连接延迟等


  -- 减少HTTP请求
    任何请求都没有没有请求快, 去掉页面没必要资源



*/