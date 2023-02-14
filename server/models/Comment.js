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
			text: {
				type: DataTypes.STRING(512),
				allowNull: false,
			},
			file_link: DataTypes.STRING(128),
			homepage: DataTypes.STRING(128),
		},
		{
			hierarchy: { as: 'replyTo', childrenAs: 'replies' },
			tableName: 'comments',
			updatedAt: false,
		}
	);
	Comment.beforeCreate((comment) => (comment.id = uuidv4()));

	return Comment;
};
