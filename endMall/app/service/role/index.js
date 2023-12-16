const { Service } = require("egg")
const { Op } = require("sequelize")

class RoleService extends Service {
  /* 创建角色 - 同步角色表
   * @param {Object} - {role_name, role_sign, role_remark} 角色名称 角色标识 角色描述
   * @returns {Object} 创建信息
   */
  async createRole({ role_name, role_sign, role_remark }, transaction) {
    return await this.ctx.model.Role.create(
      {
        role_name,
        role_sign,
        role_remark,
      },
      {
        transaction,
      }
    )
  }

  /* 删除角色
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 删除信息
   */
  async deleteRole({ role_id }, transaction) {
    return await this.ctx.model.Role.destroy({
      where: {
        id: role_id,
      },
      transaction,
    })
  }

  /* 编辑角色
   * @param {Object} - {role_id, role_name, role_remark} 角色ID, 角色名称，角色描述
   * @returns {Object} 编辑信息
   */
  async updateRole({ role_id, role_name, role_remark }, transaction) {
    return await this.ctx.model.Role.update(
      {
        role_name,
        role_remark,
      },
      {
        where: {
          id: role_id,
        },
        transaction, // 踩坑-.-, update等操作回滚放第二个参数中，看官网
      }
    )
  }

  /* 获取角色列表
   * @param {Object} - {role_id, role_name, role_sign, page_no, page_size, create_time} 角色ID, 角色名称，角色标识，分页，创建时间
   * @returns {Object} 角色列表
   */
  async getRoleList({
    role_id,
    role_sign,
    role_name,
    create_time,
    page_no = 1,
    page_size = 10,
  }) {
    const where = {}
    if (role_id) {
      where.id = role_id
    }
    if (role_sign) {
      where.role_sign = role_sign
    }
    if (role_name) {
      where.role_name = {
        // 模糊匹配角色名称
        [Op.substring]: role_name,
      }
    }
    if (create_time) {
      const parseCreateTime = JSON.parse(create_time)
      where.create_time = {
        [Op.between]: [parseCreateTime[0], parseCreateTime[1]],
      }
    }
    return await this.ctx.model.Role.findAndCountAll({
      where,
      offset: (page_no - 1) * page_size,
      limit: Number(page_size),
      order: [["create_time", "DESC"]],
    })
  }

  /* 只获取角色详情
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 角色详情信息
   */
  async getRoleDetailInfoOnly(role_id) {
    return await this.ctx.model.Role.findOne({
      where: {
        id: role_id,
      },
    })
  }

  /* 获取角色详情
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 角色详情信息
   */
  async getRoleDetail({ role_id }) {
    return await this.ctx.model.Role.findOne({
      where: {
        id: role_id,
      },
      include: [
        {
          model: this.ctx.model.MenuRole,
          as: "role_menu",
        },
        {
          model: this.ctx.model.PermissionRole,
          as: "permission_role",
        },
      ],
    })
  }
}

module.exports = RoleService
