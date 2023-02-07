import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequalize) => {
	const User = sequalize.define(
		'User',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
		}
	);
	User.beforeCreate((user) => (user.id = uuidv4()));

	return User;
};