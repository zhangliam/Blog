/*

  
  -- TCP/IP协议族按层次分为: 应用层, 传输层，网络层，数据链路层

    应用层 - 决定了向用户提供应用服务时通信的活动(FTP: 文件传输协议, DNS: 域名系统, HTTP)
      DNS协议通过域名查找IP协议, 或逆向通过IP查域名

    传输层 - 传输层对上层应用层, 提供处理网络连接中两台计算机之间数据传输(TCP: 用户传输协议, UDP: 用户数据报协议)

    网络层 - 处理网络上流动的数据包(最小数据单位), 该层规定特定路径到达对方计算机并传输数据包
      IP地址 => 指定节点被分配到的地址
      MAC地址 => 网卡所属的固定地址
      IP协议作用是把数据包传送给对方, 其中两个重要前置条件为MAC地址&IP地址, IP可换, MAC地址基本不会改
      IP间通信依赖MAC地址, 通常是多台计算机和网络设备中转才能连接. 中转过程中采用ARP协议(解析地址的协议, 根据IP反查MAC地址)

    链路层 - 处理连接网络硬件部分, 包括操作系统, 硬件设备驱动, NIC(网卡), 及光纤等硬件范畴


  -- 返回结果的HTTP状态码
          类别                        原因短语
    1XX - Informational(信息状态码)      接收请求正在处理
    2XX - Success(成功状态码)            请求处理完毕
    3XX - Redirection(重定向状态码)       需完成附加操作以完成请求
    4XX - Client Error(客户端错误状态码)   服务器无法处理请求
    5XX - Server Error(服务器错误状态码)   服务器处理请求出错

    详细code标识

      200 - OK - 正常处理
      204 - No Content - 成功无资源返回
      206 - Partial Content - 范围请求

      301 - Moved Permanently - 永久重定向
      302 - Found - 临时重定向
      303 - See Other - 请求资源存在另一个URL, 使用GET方法定向获取请求资源
      *304(重定向无关) - Not Modified - 说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），例如GET 或HEAD 或在请求中附带了头部信息： If-None-Match 或If-Modified-Since。
      307 - Temporary Redirect - 临时重定向302相同(按浏览器标准POST不会变GET)

      400 - Bad Request - 请求报文语法错误
      401 - Unauthorized - 发送请求需通过HTTP认证的认证信息
      403 - Forbidden - 请求资源被服务器拒绝
      404 - Not Found - 服务器无法请求资源

      500 - Internal Server Error - 服务器本身发生错误
      503 - Service Unavailable - 服务器超负荷或正在停机维护


*/