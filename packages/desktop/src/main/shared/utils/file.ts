import { fse } from '@main/shared/deps'
import { logger } from './log'

export const isExecutable = async (_path: string): Promise<boolean> => {
  if (!_path) {
    return false
  }

  try {
    const stats = await fse.stat(_path)
    if (!stats.isFile()) {
      logger.info('不是一个文件', 'isExecutable')
      return false
    }

    // 检查文件是否具有可执行权限
    const filePermissions = stats.mode & fse.constants.S_IXUSR

    return filePermissions ? true : false
  } catch (error) {
    logger.info(error, 'isExecutable')
    return false
  }
}
