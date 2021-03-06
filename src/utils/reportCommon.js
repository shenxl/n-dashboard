/*global _*/

const converId = (title) => {
  switch (title) {
    case '外网安装':
      return { server_id: 2, type: 'install' }
    case '外网报活':
      return { server_id: 2, type: 'active' }
    case '外网09安装':
      return { server_id: 3, type: 'install' }
    case '外网09报活':
      return { server_id: 3, type: 'active' }
    case '内网安装':
      return { server_id: 99, type: 'install' }
    case '内网报活':
      return { server_id: 99, type: 'active' }
    default:
  }
  return '暂无';
}

const converServer = (title, type) => {
  switch (title) {
    case 2:
      if (type === 'install') return '外网安装';
      if (type === 'active') return '外网报活';
      break;
    case 3:
      if (type === 'install') return '外网09安装';
      if (type === 'active') return '外网09报活';
      break;
    case 99:
      if (type === 'install') return '内网安装';
      if (type === 'active') return '内网报活';
      break;
    default:
  }
  return '暂无';
}

const conver = (list) => {
  const install = _.map(list, (item) => { return converServer(item, 'install') })
  const active = _.map(list, (item) => { return converServer(item, 'active') })
  return _.concat(install, active);
}

const reportCommon = {
  converId,
  converServer,
  conver,
}
export default reportCommon;//
