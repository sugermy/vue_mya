// current use server
const ACTIVE_SERVER = 'localhost'//当前使用的服务器
// all servers
const ALL_SERVERS = {
    // 1-1. 正式服务器
    official: {
        apiServer: 'http://serviceweb.hebitsoft.com',
    },
    // 1-2. 测试服务器
    localhost: {
        apiServer: 'http://testserapi.vip.hebitsoft.com',
    }
}

window.SYSTEM_CONFIG = {
    webServer: ALL_SERVERS[ACTIVE_SERVER]['apiServer'],//启用服务器地址
    MerchantCode: 'S190304762'//商户号
}