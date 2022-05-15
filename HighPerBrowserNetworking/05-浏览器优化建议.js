/*

  
  -- 核心优化策略(浏览器自动完成)

    1. 基于文档的优化
    2. 推测性优化


  -- 四种技术

    1. 资源预取&排定优先次序
    2. DNS预解析
    3. TCP预解析
    4. 页面预渲染


  -- 关注页面结构&交付

    1. CSS&JS等资源应当尽早文档出现
    2. 尽早交付CSS, 从而解除渲染阻塞并让JS执行
    3. 非关键性JS应该推迟, 避免DOM&CSSOM构建
    4. HTML文档由解析器递增执行


  -- 文档嵌入提示
  
    预解析特定域名(主流浏览器皆有效)
    <link rel="dns-prefetch" href="//hostname_to_resolve.com">

    预取得页面后续所需关键资源(兼容性差)
    <link rel="subresource" href="//hostname_to_resolve.com/js/app.js">

    预取得未来导航要用资源(除safari其他主流OK)
    <link rel="prefetch" href="//hostname_to_resolve.com/move.jpg">

    预测下一个目标页面渲染(兼容性差)
    <link rel="prerender" href="//hostname_to_resolve.com/next.html">




*/