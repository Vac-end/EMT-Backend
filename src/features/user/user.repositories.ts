import { User, UserCreationAttributes } from '@interfaces/models';

export const userRepository = {
  findAll: () =>
    User.findAll({
      attributes: { exclude: ['password'] },
    }),

  findById: (id: string) =>
    User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'otpRequired', 'updatedAt'] },
    }),

  findByEmail: (email: string) =>
    User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    }),

  findByEmailWithPassword: (email: string) =>
    User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'role', 'otpRequired', 'academicLevelId'],
    }),

  findByRole: (role: 'estudiante' | 'docente' | 'administrador') =>
    User.findAll({
      where: { role },
      attributes: { exclude: ['password'] },
    }),

  create: (data: UserCreationAttributes) =>
    User.create(data),

  update: (id: string, data: Partial<UserCreationAttributes>) =>
    User.update(data, {
      where: { id },
      returning: true,
    }),

  delete: (id: string) =>
    User.destroy({ where: { id } }),
};
