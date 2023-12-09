const { Service } = require("egg")
const { Op } = require("sequelize")

class PermissionService extends Service {
  /* 创建权限
   * @param {Object} - {permission_name, permission_sign, permission_remark} 权限名称 权限标识 权限描述
   * @returns {Object} 创建信息
   */
  async createPermission({
    permission_name,
    permission_sign,
    permission_remark,
  }) {
    return await this.ctx.model.Permission.create({
      permission_name,
      permission_sign,
      permission_remark,
    })
  }
  /* 编辑权限
   * @param {Object} - {permission_id, permission_name, permission_remark} 权限唯一id 权限名称 权限描述
   * @returns {Object} 创建信息
   */
  async updatePermission({
    permission_id,
    permission_name,
    permission_remark,
  }) {
    return await this.ctx.model.Permission.update(
      {
        permission_name,
        permission_remark,
      },
      {
        where: {
          id: permission_id,
        },
      }
    )
  }

  /* 获取权限列表
   * @param {Object} - {permission_id, permission_name, is_delete, page_no = 1, page_size = 20} 权限唯一id 权限名称, 权限是否删除, 当前页，每页大小
   * @returns {Object} 权限列表
   */
  async getPermissionList({
    page_no = 1,
    page_size = 10,
    permission_id,
    permission_name,
    is_delete = "",
  }) {
    const where = {}
    if (is_delete !== "") {
      // 确定返回数据的范围，包不包含删除的权限
      where.is_delete = is_delete
    }
    if (permission_name) {
      // Op.substring 匹配字符串中包含某些字符
      where.permission_name = {
        [Op.substring]: permission_name,
      }
    }
    if (permission_id) {
      where.id = permission_id
    }
    return await this.ctx.model.Permission.findAndCountAll({
      where,
      offset: (page_no - 1) * page_size,
      limit: page_size,
      order: [["create_time", "DESC"]],
    })
  }
  /* 获取权限详情
   * @param {Object} - {permission_id} 权限唯一id
   * @returns {Object} 权限详情
   */
  async getPermissionDetail({ permission_id }) {
    return await this.ctx.model.Permission.findOne({
      where: {
        id: permission_id,
      },
    })
  }
}

module.exports = PermissionService
