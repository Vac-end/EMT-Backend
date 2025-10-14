import { User, UserCreationAttributes } from './model/user.model';

export const userRepository = {
  findAll: () =>
    User.findAll({
      attributes: { exclude: ['password'] },
    }),

  findById: (id: string) =>
    User.findByPk(id, {
      attributes: { exclude: ['password'] },
    }),

  findByEmail: (email: string) =>
    User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    }),

  findByEmailWithPassword: (email: string) =>
    User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'role', 'otpRequired'],
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
