import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
export default (sequalize) => {
	const Comment = sequalize.define(
		'Comment',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			text: DataTypes.STRING,
			file_link: DataTypes.STRING,
			home_page: DataTypes.STRING,
		},
		{
			tableName: 'comments',
		}
	);
	Comment.beforeCreate((comment) => (comment.id = uuidv4()));

	return Comment;
};
