import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595842832430_9420';

  // add your egg config in here
  config.middleware = ['graphql'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };


  // add config of graphql
  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    apolloServerOptions: {
      tracing: true, // 设置为true时，以Apollo跟踪格式收集和公开跟踪数据
      debug: true, // 一个布尔值，如果发生执行错误，它将打印其他调试日志记录
    },
  };
  config.sequelize = {
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    host: "127.0.0.1",
    port: 3306,
    database: "egg-sequelize-doc-unittest", // /数据库名
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  // 使用 graphql 或 rest 端点时，实际上不必担心使用 CSRF 保护。对服务的请求应该是无状态的，并且不真正依赖Cookie或会话数据。
  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
